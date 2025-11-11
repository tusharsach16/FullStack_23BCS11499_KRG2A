import { useEffect, useState } from "react";
import { doctorAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function ManageDoctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => { loadDoctors(); }, []);

  const loadDoctors = async () => {
    try {
      const res = await doctorAPI.getAll();
      setDoctors(res.data);
    } catch (err) {
      console.error("Error Loading Doctors:", err);
    }
  };

  const deleteDoctor = async (id) => {
    if (!window.confirm("Delete this doctor?")) return;
    try {
      await doctorAPI.delete(id);
      loadDoctors();
    } catch (err) {
      console.error("Delete Failed:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Manage Doctors</h2>

      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => navigate("/admin/doctors/add")}
      >
        + Add Doctor
      </button>

      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Specialization</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((d) => (
            <tr key={d.id} className="border-b">
              <td className="p-3">{d.name}</td>
              <td className="p-3">{d.specialization}</td>
              <td className="p-3 text-center">
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded mr-2"
                  onClick={() => navigate(`/admin/doctors/edit/${d.id}`)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded"
                  onClick={() => deleteDoctor(d.id)}
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
