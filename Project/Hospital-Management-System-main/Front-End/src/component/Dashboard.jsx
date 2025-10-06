import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
    const [patients, setPatients] = useState([]);
    const [editingPatient, setEditingPatient] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        contact: "",
        medicalHistory: "",
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await axios.get("http://localhost:6060/api/v1/patients");
            setPatients(response.data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (editingPatient) {
                await axios.put(`http://localhost:6060/api/v1/patients/${editingPatient.id}`, formData);
                alert("Patient updated successfully");
            } else {
                await axios.post("http://localhost:6060/api/v1/patients", formData);
                alert("Patient added successfully");
            }
            resetForm();
            fetchPatients();
        } catch (error) {
            console.error("Error saving patient:", error);
        }
    };

    const resetForm = () => {
        setFormData({ name: "", age: "", gender: "", contact: "", medicalHistory: "" });
        setEditingPatient(null);
        setShowForm(false);
    };

    const handleEdit = (patient) => {
        setEditingPatient(patient);
        setFormData({
            name: patient.name,
            age: patient.age,
            gender: patient.gender,
            contact: patient.contact,
            medicalHistory: patient.medicalHistory,
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:6060/api/v1/patients/${id}`);
            alert("Patient deleted successfully");
            fetchPatients();
        } catch (error) {
            console.error("Error deleting patient:", error);
        }
    };

    const handleAddNew = () => {
        setEditingPatient(null);
        resetForm();
        setShowForm(true);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
                    <button 
                        onClick={handleAddNew}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
                    >
                        Add New Patient
                    </button>
                </div>

                {showForm && (
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                            {editingPatient ? "Update Patient" : "Add New Patient"}
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <input name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Age" required className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" required className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <input name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" required className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <input name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} placeholder="Medical History" required className="md:col-span-2 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={resetForm} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                                    Save Patient
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                
                <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                    <table className="min-w-full">
                        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <tr>
                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-left">Age</th>
                                <th className="py-3 px-6 text-left">Gender</th>
                                <th className="py-3 px-6 text-left">Contact</th>
                                <th className="py-3 px-6 text-left">Medical History</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {patients.map((patient) => (
                                <tr key={patient.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">{patient.name}</td>
                                    <td className="py-3 px-6 text-left">{patient.age}</td>
                                    <td className="py-3 px-6 text-left">{patient.gender}</td>
                                    <td className="py-3 px-6 text-left">{patient.contact}</td>
                                    <td className="py-3 px-6 text-left">{patient.medicalHistory}</td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-center gap-2">
                                            <button onClick={() => handleEdit(patient)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-full text-xs transition duration-300">
                                                Update
                                            </button>
                                            <button onClick={() => handleDelete(patient.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-full text-xs transition duration-300">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;