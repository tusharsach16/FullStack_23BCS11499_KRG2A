import { useEffect, useState } from "react";
import { appointmentAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const role = localStorage.getItem("role");
  const doctorId = localStorage.getItem("doctorId");

  useEffect(() => {
    if (role !== "DOCTOR") {
      navigate("/login");
      return;
    }
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const res = await appointmentAPI.getForDoctor(doctorId);
      setAppointments(res.data.data || []);
    } catch (error) {
      console.error("Error loading appointments:", error);
    }
  };

  const handleStatusChange = async (id) => {
    await appointmentAPI.cancel(id);
    loadAppointments();
  };

  const handleAddRecord = (patientId, appointmentId) => {
    navigate(`/doctor/add-medical-record/${patientId}/${appointmentId}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "CONFIRMED":
        return "text-slate-800 bg-slate-100";
      case "CANCELLED":
        return "text-slate-500 bg-slate-100";
      case "COMPLETED":
        return "text-slate-700 bg-slate-50";
      default:
        return "text-slate-600 bg-slate-100";
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-medium tracking-wide text-slate-900">Doctor Dashboard</h1>

        <div className="flex gap-4">

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-slate-800 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="border border-slate-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">

          {/* Section Header */}
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="text-lg font-medium text-slate-900">Upcoming Appointments</h2>
            <p className="text-sm text-slate-500 mt-1">{appointments.length} scheduled</p>
          </div>

          {/* Appointments */}
          <div className="divide-y divide-slate-200">
            {appointments.length > 0 ? (
              appointments.map((app) => (
                <div
                  key={app.appointmentId}
                  className="px-6 py-5 hover:bg-slate-50 transition cursor-pointer border-l-4 border-transparent hover:border-black"
                >
                  <div className="flex items-center justify-between">

                    {/* Patient Info */}
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-slate-900 mb-1 hover:text-black transition">
                        {app.patient.name}
                      </h3>

                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span>
                          {new Date(app.appointmentTime).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })}
                        </span>
                        <span>
                          {new Date(app.appointmentTime).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit"
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Status + Actions */}
                    <div className="flex items-center gap-3">

                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>

                      <div className="flex gap-2">

                        <button
                          className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-slate-800 transition"
                          onClick={() => handleAddRecord(app.patient.id, app.appointmentId)}
                        >
                          Add Record
                        </button>

                        {app.status !== "CANCELLED" && (
                          <button
                            className="px-4 py-2 border border-slate-400 text-slate-700 text-sm rounded-md hover:bg-slate-100 transition"
                            onClick={() => handleStatusChange(app.appointmentId)}
                          >
                            Cancel
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-slate-600 font-medium">No upcoming appointments</p>
                <p className="text-slate-500 text-sm mt-1">Your scheduled patients will appear here</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
