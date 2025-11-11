import { useEffect, useState } from "react";
import { doctorAPI, appointmentAPI, medicalAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("appointments");

  const email = localStorage.getItem("email");
  const patientId = localStorage.getItem("patientId");

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    if (!token || role !== "PATIENT") {
      navigate("/login");
      return;
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const docRes = await doctorAPI.getAll();
      setDoctors(docRes.data.data || []);

      const appRes = await appointmentAPI.getForPatient(email);
      setAppointments(appRes.data.data || []);

      if (patientId) {
        const medRes = await medicalAPI.getByPatient(patientId);
        setMedicalRecords(medRes.data.data || []);
      }
    } catch (e) {
      console.error("Data Load Error:", e);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const formatTime = (d) => new Date(d).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  const getStatusColor = (s) => ({
    SCHEDULED: "text-sky-600 bg-sky-50",
    CANCELLED: "text-slate-500 bg-slate-100",
    COMPLETED: "text-slate-600 bg-slate-50",
    PENDING: "text-sky-500 bg-sky-50"
  }[s] || "text-slate-600 bg-slate-50");

  return (
    <div className="min-h-screen bg-slate-50">

      {/* TOP HEADER */}
      <header className="border-b bg-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-medium text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-sky-100 text-sky-600">
            👤
          </span>
          Patient Dashboard
        </h1>

        <button
          onClick={() => { localStorage.clear(); navigate("/login"); }}
          className="px-4 py-2 border border-slate-800 text-slate-800 rounded-md hover:bg-slate-800 hover:text-white transition"
        >
          Logout
        </button>
      </header>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* DOCTOR LIST */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-lg font-medium text-slate-900 mb-1">Available Doctors</h2>
          <p className="text-sm text-slate-500 mb-6">Choose a doctor to book an appointment</p>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin h-8 w-8 border-4 border-slate-200 border-t-sky-500 rounded-full"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doc) => (
                <div key={doc.doctorId} className="border border-slate-200 p-5 rounded-lg hover:border-sky-400 hover:shadow-md transition cursor-pointer bg-white">
                  <h3 className="text-lg font-medium text-slate-900">{doc.name}</h3>
                  <p className="text-sm text-sky-600 font-medium">{doc.specialization}</p>
                  {doc.contact && <p className="text-sm text-slate-600 mt-2">{doc.contact}</p>}
                  <button
                    onClick={() => navigate(`/appointments/book/${doc.doctorId}`)}
                    className="mt-4 w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg transition"
                  >
                    Book Appointment
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* TABS */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition">

          {/* TAB BUTTONS */}
          <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-2">
            <button
              className={`px-6 py-2 rounded-lg ${activeTab === "appointments" ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-700"}`}
              onClick={() => setActiveTab("appointments")}
            >
              My Appointments
            </button>
            <button
              className={`px-6 py-2 rounded-lg ${activeTab === "records" ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-700"}`}
              onClick={() => setActiveTab("records")}
            >
              Medical Records
            </button>
          </div>

          {/* TAB CONTENT */}
          <div className="p-6">

            {/* Appointments */}
            {activeTab === "appointments" && (
              appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((a) => (
                    <div key={a.appointmentId} className="border border-slate-200 p-5 rounded-lg hover:border-sky-300 hover:shadow transition bg-white">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-slate-900 font-medium">{a.doctor?.name}</h3>
                          <p className="text-sky-600 text-sm">{a.doctor?.specialization}</p>
                        </div>
                        <span className={`px-2 py-2 text-sm mt-1 rounded-full ${getStatusColor(a.status)}`}>{a.status}</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-2">{formatDate(a.appointmentTime)} • {formatTime(a.appointmentTime)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-slate-600 py-6">No appointments yet</p>
              )
            )}

            {/* Records */}
            {activeTab === "records" && (
              medicalRecords.length > 0 ? (
                <div className="space-y-4">
                  {medicalRecords.map((r) => (
                    <div key={r.recordId} className="border border-slate-200 p-5 rounded-lg hover:border-sky-300 hover:shadow transition bg-white">
                      <div className="flex justify-between mb-3">
                        <h3 className="text-slate-900 font-medium">{r.appointment?.doctor?.name}</h3>
                        <span className="px-3 py-1 text-xs bg-sky-100 text-sky-700 rounded-full">Record #{r.recordId}</span>
                      </div>
                      <p className="text-slate-700"><strong>Diagnosis:</strong> {r.diagnosis}</p>
                      <p className="text-slate-700 mt-1"><strong>Prescription:</strong> {r.prescription}</p>
                      {r.notes && <p className="text-slate-700 mt-1"><strong>Notes:</strong> {r.notes}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-slate-600 py-6">No medical records yet</p>
              )
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
