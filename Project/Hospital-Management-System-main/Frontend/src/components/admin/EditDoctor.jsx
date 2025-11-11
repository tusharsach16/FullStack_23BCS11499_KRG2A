import { useEffect, useState } from "react";
import { doctorAPI } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditDoctor() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    doctorId: doctorId,
    name: "",
    specialization: "",
    contact: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    loadDoctor();
  }, [doctorId]);

  const loadDoctor = async () => {
    try {
      const res = await doctorAPI.getById(doctorId);
      const d = res.data.data;

      setForm({
        doctorId: d.doctorId,
        name: d.name || "",
        specialization: d.specialization || "",
        contact: d.contact || "",
        email: d.email || "",
        password: "" // we don't fetch passwords for security
      });
    } catch (err) {
      console.error("Error loading doctor:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await doctorAPI.update(doctorId, form);
      navigate("/dashboard/adminDashboard/doctors");
    } catch (err) {
      console.error("Error updating doctor:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 text-slate-800">
      <div className="bg-white shadow border border-slate-300 rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">
          Edit Doctor
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            className="w-full border border-slate-400 rounded-lg p-3 focus:ring-2 focus:ring-slate-600 outline-none transition"
            placeholder="Doctor Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            className="w-full border border-slate-400 rounded-lg p-3 focus:ring-2 focus:ring-slate-600 outline-none transition"
            placeholder="Specialization"
            value={form.specialization}
            onChange={(e) => setForm({ ...form, specialization: e.target.value })}
            required
          />

          <input
            className="w-full border border-slate-400 rounded-lg p-3 focus:ring-2 focus:ring-slate-600 outline-none transition"
            placeholder="Contact Number"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            required
          />

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
            placeholder="New Password (optional)"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-slate-800 transition"
          >
            Update Doctor
          </button>

        </form>

      </div>
    </div>
  );
}
