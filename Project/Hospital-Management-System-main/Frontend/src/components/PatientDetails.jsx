import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { patientAPI } from '../services/api';

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPatient();
  }, [id]);

  const fetchPatient = async () => {
    try {
      setLoading(true);
      const response = await patientAPI.getPatientById(id);
      setPatient(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch patient details. Please try again.');
      console.error('Error fetching patient:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading patient details...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !patient) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || 'Patient not found'}
          </div>
          <button
            onClick={() => navigate('/patients')}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            ← Back to Patients
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <button
                onClick={() => navigate('/patients')}
                className="text-blue-600 hover:text-blue-700 mb-2 flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Patients
              </button>
              <h1 className="text-3xl font-bold text-gray-800">Patient Details</h1>
            </div>
            <Link
              to={`/patients/edit/${id}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              <span>Edit Patient</span>
            </Link>
          </div>

          {/* Patient Information Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 rounded-full p-4">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{patient.name}</h2>
                  <p className="text-blue-100">Patient ID: {patient.patient_id}</p>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Personal Information
                  </h3>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-gray-600 text-sm">Date of Birth:</div>
                      <div className="col-span-2 font-medium text-gray-900">{patient.dob || 'N/A'}</div>
                      
                      <div className="text-gray-600 text-sm">Age:</div>
                      <div className="col-span-2 font-medium text-gray-900">{calculateAge(patient.dob)} years</div>
                      
                      <div className="text-gray-600 text-sm">Gender:</div>
                      <div className="col-span-2 font-medium text-gray-900">{patient.gender || 'N/A'}</div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Contact Information
                  </h3>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-3">
                      <div>
                        <div className="text-gray-600 text-sm mb-1">Phone Number:</div>
                        <div className="font-medium text-gray-900">{patient.contact || 'N/A'}</div>
                      </div>
                      
                      <div>
                        <div className="text-gray-600 text-sm mb-1">Address:</div>
                        <div className="font-medium text-gray-900">{patient.address || 'N/A'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Records Section (Placeholder) */}
              <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  Medical Records
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                  No medical records available yet
                </div>
              </div>

              {/* Appointments Section (Placeholder) */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Appointments
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                  No appointments scheduled
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientDetails;