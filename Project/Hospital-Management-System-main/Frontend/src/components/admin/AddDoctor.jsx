import { useState } from "react";
import { doctorAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function AddDoctor() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    contact: "",
    email: ""
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await doctorAPI.add(form);
      setMessage("✅ Doctor added successfully. Login credentials sent to email.");

      setForm({ name: "", specialization: "", contact: "", email: "" });

      setTimeout(() => navigate("/dashboard/adminDashboard"), 1200);

    } catch (error) {
      setMessage("❌ " + (error.response?.data?.message || "Failed to add doctor"));
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 text-slate-800">
      <div className="bg-white shadow border border-slate-300 rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">
          Add New Doctor
        </h2>

        {message && (
          <p className={`mb-4 text-center font-medium ${
            message.startsWith("✅") ? "text-emerald-600" : "text-red-600"
          }`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            className="w-full border border-slate-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-600 transition"
            placeholder="Doctor Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            className="w-full border border-slate-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-600 transition"
            placeholder="Specialization"
            value={form.specialization}
            onChange={(e) => setForm({ ...form, specialization: e.target.value })}
            required
          />

          <input
            className="w-full border border-slate-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-600 transition"
            placeholder="Contact Number"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            required
          />

          <input
            className="w-full border border-slate-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-600 transition"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <button
            className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-slate-800 transition shadow-sm"
          >
            Save Doctor
          </button>

        </form>

      </div>
    </div>
  );
}
