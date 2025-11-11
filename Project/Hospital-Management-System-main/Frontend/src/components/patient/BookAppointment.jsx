import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doctorAPI, appointmentAPI } from "../../services/api";

export default function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    date: "",
    time: "",
  });

  // Generate time slots from 9 AM to 5 PM with 15-minute gaps
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9;  // 9 AM
    const endHour = 17;   // 5 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = formatTime(hour, minute);
        slots.push({ value: timeString, display: displayTime });
      }
    }
    return slots;
  };

  // Format time to 12-hour format with AM/PM
  const formatTime = (hour, minute) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  // Extract time from datetime string
  const extractTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    try {
      const date = new Date(dateTimeString);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    } catch (e) {
      console.error("Error extracting time:", e);
      return "";
    }
  };

  // Extract date from datetime string
  const extractDate = (dateTimeString) => {
    if (!dateTimeString) return "";
    try {
      const date = new Date(dateTimeString);
      return date.toISOString().split('T')[0];
    } catch (e) {
      console.error("Error extracting date:", e);
      return "";
    }
  };

  useEffect(() => {
    loadDoctor();
    setTimeSlots(generateTimeSlots());
  }, [doctorId]);

  // Load booked slots when date changes
  useEffect(() => {
    if (formData.date && doctorId) {
      loadBookedSlots();
    }
  }, [formData.date, doctorId]);

  const loadDoctor = async () => {
    try {
      setLoading(true);
      const res = await doctorAPI.getById(Number(doctorId));
      console.log("Doctor response:", res.data);
      setDoctor(res.data.data || res.data);
    } catch (error) {
      console.error("Error loading doctor:", error);
      alert("❌ Failed to load doctor information!");
    } finally {
      setLoading(false);
    }
  };

  const loadBookedSlots = async () => {
    try {
      console.log("Loading booked slots for doctor:", doctorId, "on date:", formData.date);
      
      const res = await appointmentAPI.getForDoctor(Number(doctorId));
      console.log("All appointments for doctor:", res.data);
      
      const appointments = res.data.data || res.data || [];
      
      // Filter appointments for selected date and get booked times
      const booked = appointments
        .filter(app => {
          const appDate = extractDate(app.appointmentTime);
          const isMatchingDate = appDate === formData.date;
          const isNotCancelled = app.status !== 'CANCELLED';
          console.log("Appointment:", app, "Match:", isMatchingDate, "Not Cancelled:", isNotCancelled);
          return isMatchingDate && isNotCancelled;
        })
        .map(app => extractTime(app.appointmentTime));
      
      console.log("Booked slots for", formData.date, ":", booked);
      setBookedSlots(booked);
      
    } catch (error) {
      console.error("Error loading booked slots:", error);
      setBookedSlots([]);
    }
  };

  const isSlotBooked = (timeValue) => {
    return bookedSlots.includes(timeValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if slot is already booked
    if (isSlotBooked(formData.time)) {
      alert("❌ This time slot is already booked. Please select another time.");
      return;
    }
    
    try {
      setLoading(true);
      const patientEmail = localStorage.getItem("email") || localStorage.getItem("username");

      if (!patientEmail) {
        alert("❌ Please login first!");
        navigate("/login");
        return;
      }

      const data = {
        doctorId: Number(doctorId),
        patientEmail: patientEmail,
        appointmentDate: formData.date,
        appointmentTime: formData.time,
      };

      console.log("Submitting appointment:", data);
      
      const response = await appointmentAPI.create(data);
      console.log("Appointment response:", response.data);

      alert("✅ Appointment Booked Successfully!");
      navigate("/dashboard/patientDashboard");
      
    } catch (error) {
      console.error("Booking Error:", error);
      console.error("Error response:", error.response?.data);
      
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong!";
      alert("❌ " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md">
        <button
          onClick={() => navigate("/dashboard/patientDashboard")}
          className="mb-4 text-blue-600 hover:text-blue-800 flex items-center"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-2xl font-bold mb-4 text-gray-800">Book Appointment</h1>

        {loading && !doctor ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="ml-3 text-gray-600">Loading doctor info...</p>
          </div>
        ) : doctor ? (
          <>
            <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
              <p className="text-lg font-semibold text-gray-800">{doctor.name}</p>
              <p className="text-blue-600 font-medium">{doctor.specialization}</p>
              {doctor.contact && (
                <p className="text-gray-600 text-sm mt-1">Contact: {doctor.contact}</p>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <label className="block mb-4">
                <span className="text-gray-700 font-medium">Select Date *</span>
                <input
                  type="date"
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  min={getTodayDate()}
                  value={formData.date}
                  onChange={(e) => {
                    setFormData({ ...formData, date: e.target.value, time: "" });
                  }}
                />
              </label>

              {formData.date && (
                <>
                  <label className="block mb-2">
                    <span className="text-gray-700 font-medium">Select Time Slot *</span>
                  </label>
                  
                  <div className="mb-6 max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-gray-50">
                    {timeSlots.map((slot) => {
                      const isBooked = isSlotBooked(slot.value);
                      const isSelected = formData.time === slot.value;
                      
                      return (
                        <div
                          key={slot.value}
                          onClick={() => {
                            if (!isBooked) {
                              setFormData({ ...formData, time: slot.value });
                            }
                          }}
                          className={`
                            p-3 mb-2 rounded-lg cursor-pointer transition-all
                            ${isBooked 
                              ? 'bg-red-100 text-red-400 cursor-not-allowed line-through' 
                              : isSelected
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white hover:bg-blue-50 hover:border-blue-300'
                            }
                            border-2 ${isSelected ? 'border-blue-600' : 'border-gray-200'}
                          `}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{slot.display}</span>
                            {isBooked && (
                              <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded">
                                Booked
                              </span>
                            )}
                            {isSelected && !isBooked && (
                              <span className="text-xs bg-white text-blue-600 px-2 py-1 rounded">
                                Selected
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-xs text-yellow-800">
                      <strong>Note:</strong> Red slots are already booked. Please select an available slot.
                    </p>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading || !formData.time || !formData.date}
                className={`w-full py-3 rounded-lg font-semibold transition duration-200 shadow-md ${
                  loading || !formData.time || !formData.date
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg text-white"
                }`}
              >
                {loading ? "Booking..." : "Confirm Appointment"}
              </button>
            </form>
          </>
        ) : (
          <p className="text-center text-red-600">Failed to load doctor information</p>
        )}
      </div>
    </div>
  );
}