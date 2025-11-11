import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { medicalAPI } from "../../services/api";

export default function AddMedicalRecord() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const [record, setRecord] = useState({
    diagnosis: "",
    prescription: "",
    notes: ""
  });

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await medicalAPI.create({
        appointmentId: Number(appointmentId),
        diagnosis: record.diagnosis,
        prescription: record.prescription,
        notes: record.notes,
      });

      navigate("/dashboard/doctorDashboard");
    } catch (error) {
      console.error("Error adding medical record:", error);
      alert("Failed to add record ❌");
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-medium tracking-wide text-slate-900">Add Medical Record</h1>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/dashboard/doctorDashboard")}
            className="px-4 py-2 border border-slate-800 text-slate-800 rounded-md hover:bg-slate-800 hover:text-white transition"
          >
            Back
          </button>
        </div>
      </header>

      {/* FORM */}
      <div className="max-w-2xl mx-auto px-6 py-10">
        <form onSubmit={handleSubmit} className="space-y-6 border border-slate-300 rounded-xl p-6 shadow-sm">

          {/* Diagnosis */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Diagnosis *
            </label>
            <input
              type="text"
              name="diagnosis"
              value={record.diagnosis}
              onChange={handleChange}
              className="w-full border border-slate-400 rounded-lg p-3 focus:ring-2 focus:ring-slate-600 outline-none transition"
              placeholder="Enter diagnosis"
              required
            />
          </div>

          {/* Prescription */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Prescription *
            </label>
            <textarea
              name="prescription"
              value={record.prescription}
              onChange={handleChange}
              className="w-full border border-slate-400 rounded-lg p-3 focus:ring-2 focus:ring-slate-600 outline-none transition"
              rows="4"
              placeholder="Enter prescription details"
              required
            ></textarea>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={record.notes}
              onChange={handleChange}
              className="w-full border border-slate-400 rounded-lg p-3 focus:ring-2 focus:ring-slate-600 outline-none transition"
              rows="3"
              placeholder="Additional remarks about the patient's condition"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-slate-800 transition"
          >
            Save Record
          </button>

        </form>
      </div>
    </div>
  );
}
