import { useEffect, useState } from "react";
import { doctorAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaTrash, FaEdit } from "react-icons/fa";

export default function ViewDoctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const res = await doctorAPI.getAll();
      setDoctors(res.data.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  const handleDelete = async () => {
    if (!selectedDoctor) return;
    try {
      await doctorAPI.delete(selectedDoctor.doctorId);
      setSelectedDoctor(null);
      loadDoctors();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  const filteredDoctors = doctors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-white min-h-screen text-slate-800">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-light text-slate-900">Doctors</h2>
        <button
          className="px-4 py-2 border border-slate-800 text-slate-800 rounded-lg hover:bg-slate-800 hover:text-white transition"
          onClick={() => navigate("/doctor/add")}
        >
          + Add Doctor
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center border border-slate-300 rounded-lg px-3 py-2 w-80 mb-6 bg-white">
        <FaSearch className="text-slate-500" />
        <input
          type="text"
          placeholder="Search by name..."
          className="ml-2 w-full outline-none text-slate-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-slate-300 rounded-lg">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-slate-100 border-b border-slate-300">
            <tr className="text-slate-700">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Specialization</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((d) => (
                <tr key={d.doctorId} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="p-3">{d.name}</td>
                  <td className="p-3">{d.specialization}</td>
                  <td className="p-3">{d.contact}</td>
                  <td className="p-3">{d.email}</td>
                  <td className="p-3 flex gap-4 text-lg">
                    <FaEdit
                      className="text-slate-700 cursor-pointer hover:text-black transition"
                      onClick={() => navigate(`/dashboard/adminDashboard/doctors/edit/${d.doctorId}`)}
                    />
                    <FaTrash
                      className="text-red-600 cursor-pointer hover:text-red-700 transition"
                      onClick={() => setSelectedDoctor(d)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-center text-slate-500" colSpan="5">
                  No Doctors Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirm Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-80 text-center">
            <h3 className="text-lg font-medium text-slate-900 mb-4">
              Delete “{selectedDoctor.name}” ?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 border border-slate-500 text-slate-700 rounded hover:bg-slate-100 transition"
                onClick={() => setSelectedDoctor(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
