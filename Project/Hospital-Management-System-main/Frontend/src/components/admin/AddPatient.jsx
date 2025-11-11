import { useState } from "react";
import { patientAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function AddPatient() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "",
    email: "",
    password: "",
    contact: "",
    address: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await patientAPI.add(form);
      navigate("/dashboard/adminDashboard");
    } catch (err) {
      console.error("Add Failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 text-slate-800">
      <div className="bg-white shadow border border-slate-300 rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">
          Add New Patient
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            className="w-full border border-slate-400 rounded-lg p-3 focus:ring-2 focus:ring-slate-600 outline-none transition"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            className="w-full border border-slate-400 rounded-lg p-3 focus:ring-2 focus:ring-slate-600 outline-none transition"
            type="date"
            value={form.dob}
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
            required
          />

          <select
            className="w-full border border-slate-400 rounded-lg p-3 focus:ring-2 focus:ring-slate-600 outline-none transition"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
            required
          >
            <option value="" disabled>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            className="w-full border border-slate-400 rounded-lg p-3 focus:ring-2 focus:ring-slate-600 outline-none transition"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            className="w-full border border-slate-400 rounded-lg p-3 focus:ring-2 focus:ring-slate-600 outline-none transition"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <input
            className="w-full border border-slate-400 rounded-lg p-3 focus:ring-2 focus:ring-slate-600 outline-none transition"
            placeholder="Contact Number"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            required
          />

          <textarea
            className="w-full border border-slate-400 rounded-lg p-3 h-24 resize-none focus:ring-2 focus:ring-slate-600 outline-none transition"
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            required
          />

          <button
            className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-slate-800 transition"
          >
            Save Patient
          </button>
        </form>

      </div>
    </div>
  );
}
