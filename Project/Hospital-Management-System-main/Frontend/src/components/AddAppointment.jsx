import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { appointmentAPI, patientAPI, doctorAPI } from '../services/api';

const AddAppointment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState('');
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    appointment_time: '',
    status: 'Scheduled',
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoadingData(true);
      
      // Fetch patients
      const patientsResponse = await patientAPI.getAllPatients();
      setPatients(patientsResponse.data || []);

      // Fetch doctors
      try {
        const doctorsResponse = await doctorAPI.getAllDoctors();
        setDoctors(doctorsResponse.data || []);
      } catch (err) {
        console.log('Doctors API not available');
        setDoctors([]);
      }

      setError('');
    } catch (err) {
      setError('Failed to load data. Please try again.');
      console.error('Error fetching data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.patient_id || !formData.doctor_id || !formData.appointment_time) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    // Validate appointment time is in the future
    const appointmentDate = new Date(formData.appointment_time);
    const now = new Date();
    if (appointmentDate < now) {
      setError('Appointment time must be in the future');
      setLoading(false);
      return;
    }

    try {
      await appointmentAPI.createAppointment(formData);
      navigate('/appointments');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to schedule appointment. Please try again.');
      console.error('Error scheduling appointment:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading form data...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Schedule Appointment</h1>
            <p className="text-gray-600 mt-2">Book a new appointment for a patient</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {patients.length === 0 && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
              No patients found. Please add patients first before scheduling appointments.
            </div>
          )}

          {doctors.length === 0 && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
              No doctors found in the system. Please contact your administrator.
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Patient Selection */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patient_id">
                    Select Patient <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="patient_id"
                    name="patient_id"
                    value={formData.patient_id}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={patients.length === 0}
                  >
                    <option value="">-- Select a Patient --</option>
                    {patients.map((patient) => (
                      <option key={patient.patient_id} value={patient.patient_id}>
                        {patient.name} (ID: {patient.patient_id}) - {patient.contact}
                      </option>
                    ))}
                  </select>
                  {patients.length === 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      No patients available. <a href="/patients/add" className="text-blue-600 hover:text-blue-700">Add a patient first</a>
                    </p>
                  )}
                </div>

                {/* Doctor Selection */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctor_id">
                    Select Doctor <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="doctor_id"
                    name="doctor_id"
                    value={formData.doctor_id}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={doctors.length === 0}
                  >
                    <option value="">-- Select a Doctor --</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.doctor_id} value={doctor.doctor_id}>
                        Dr. {doctor.name} - {doctor.specialization || 'General'}
                      </option>
                    ))}
                  </select>
                  {doctors.length === 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      No doctors available in the system.
                    </p>
                  )}
                </div>

                {/* Appointment Date & Time */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="appointment_time">
                    Appointment Date & Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    id="appointment_time"
                    name="appointment_time"
                    value={formData.appointment_time}
                    onChange={handleChange}
                    min={new Date().toISOString().slice(0, 16)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Select a future date and time for the appointment
                  </p>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => navigate('/appointments')}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || patients.length === 0 || doctors.length === 0}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                >
                  {loading ? 'Scheduling...' : 'Schedule Appointment'}
                </button>
              </div>
            </form>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Quick Actions</h3>
            <div className="flex space-x-4">
              <a href="/patients/add" className="text-blue-600 hover:text-blue-700 text-sm">
                + Add New Patient
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAppointment;