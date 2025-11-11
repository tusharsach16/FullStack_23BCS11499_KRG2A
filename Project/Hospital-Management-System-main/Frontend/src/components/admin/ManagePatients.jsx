import { useEffect, useState } from "react";
import { patientAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function ManagePatients() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  useEffect(() => { loadPatients(); }, []);

  const loadPatients = async () => {
    try {
      const res = await patientAPI.getAll();
      setPatients(res.data);
    } catch (err) {
      console.error("Error Loading Patients:", err);
    }
  };

  const deletePatient = async (id) => {
    if (!window.confirm("Delete this patient?")) return;
    try {
      await patientAPI.delete(id);
      loadPatients();
    } catch (err) {
      console.error("Delete Failed:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Manage Patients</h2>

      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => navigate("/admin/patients/add")}
      >
        + Add Patient
      </button>

      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Age</th>
            <th className="p-3 text-left">Gender</th>
            <th className="p-3 text-left">Contact</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-3">{p.name}</td>
              <td className="p-3">{p.age}</td>
              <td className="p-3">{p.gender}</td>
              <td className="p-3">{p.contact}</td>
              <td className="p-3 text-center">
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded mr-2"
                  onClick={() => navigate(`/admin/patients/edit/${p.id}`)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded"
                  onClick={() => deletePatient(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
