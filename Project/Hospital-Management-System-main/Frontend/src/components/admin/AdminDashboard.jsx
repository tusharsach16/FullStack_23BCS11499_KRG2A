import { useEffect, useState } from "react";
import { patientAPI, doctorAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { FaUserInjured, FaUserMd, FaPlus, FaList } from "react-icons/fa";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "ADMIN") {
      navigate("/login");
      return;
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const patientRes = await patientAPI.getAll();
      const doctorRes = await doctorAPI.getAll();
      setPatients(patientRes.data.data || []);
      setDoctors(doctorRes.data.data || []);
    } catch (error) {
      console.error("Dashboard Load Error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-medium tracking-wide text-slate-900">Hospital Admin</h1>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/dashboard/adminDashboard/patients")}
            className="px-4 py-2 border border-slate-800 text-slate-800 rounded-md hover:bg-slate-800 hover:text-white transition"
          >
            Patients
          </button>

          <button
            onClick={() => navigate("/dashboard/adminDashboard/doctors")}
            className="px-4 py-2 border border-slate-800 text-slate-800 rounded-md hover:bg-slate-800 hover:text-white transition"
          >
            Doctors
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-slate-800 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* BODY */}
      <div className="p-8">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

          <div className="border border-slate-300 rounded-xl p-6 shadow-sm hover:shadow transition flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Patients</p>
              <p className="text-4xl font-semibold text-slate-900 mt-1">{patients.length}</p>
            </div>
            <FaUserInjured className="text-slate-700 text-5xl" />
          </div>

          <div className="border border-slate-300 rounded-xl p-6 shadow-sm hover:shadow transition flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Doctors</p>
              <p className="text-4xl font-semibold text-slate-900 mt-1">{doctors.length}</p>
            </div>
            <FaUserMd className="text-slate-700 text-5xl" />
          </div>

        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Patient Management */}
          <div className="border border-slate-300 rounded-xl p-6 shadow-sm hover:shadow transition">
            <h2 className="text-lg font-medium text-slate-900 mb-4">Patient Management</h2>

            <div className="flex gap-4">
              <button
                onClick={() => navigate("/dashboard/adminDashboard/patients")}
                className="px-4 py-2 flex items-center gap-2 bg-black text-white rounded-lg hover:bg-slate-800 transition"
              >
                <FaList /> View Patients
              </button>

              <button
                onClick={() => navigate("/patients/add")}
                className="px-4 py-2 flex items-center gap-2 border border-slate-800 text-slate-800 rounded-lg hover:bg-slate-800 hover:text-white transition"
              >
                <FaPlus /> Add Patient
              </button>
            </div>
          </div>

          {/* Doctor Management */}
          <div className="border border-slate-300 rounded-xl p-6 shadow-sm hover:shadow transition">
            <h2 className="text-lg font-medium text-slate-900 mb-4">Doctor Management</h2>

            <div className="flex gap-4">
              <button
                onClick={() => navigate("/dashboard/adminDashboard/doctors")}
                className="px-4 py-2 flex items-center gap-2 bg-black text-white rounded-lg hover:bg-slate-800 transition"
              >
                <FaList /> View Doctors
              </button>

              <button
                onClick={() => navigate("/doctor/add")}
                className="px-4 py-2 flex items-center gap-2 border border-slate-800 text-slate-800 rounded-lg hover:bg-slate-800 hover:text-white transition"
              >
                <FaPlus /> Add Doctor
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
