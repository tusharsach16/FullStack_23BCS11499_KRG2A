import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import { patientAPI } from '../../services/api';

const EditPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    contact: '',
    address: '',
  });

  useEffect(() => {
    fetchPatient();
  }, [id]);

  const fetchPatient = async () => {
    try {
      setLoading(true);
      const response = await patientAPI.getById(id);
      const p = response.data.data;
      setFormData({
        name: p.name || '',
        dob: p.dob || '',
        gender: p.gender || '',
        contact: p.contact || '',
        address: p.address || '',
      });
      setError('');
    } catch (err) {
      setError('Failed to load patient details.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    if (!formData.name || !formData.dob || !formData.gender || !formData.contact) {
      setError('Please fill all required fields.');
      setSaving(false);
      return;
    }

    try {
      await patientAPI.update(id, formData);
      navigate('/dashboard/adminDashboard/patients');
    } catch (err) {
      setError('Failed to update patient.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen text-slate-700">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          <span className="ml-4 text-slate-600">Loading...</span>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex justify-center px-4 py-12 text-slate-800">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-light text-slate-900 mb-2">Edit Patient</h1>
          <p className="text-slate-500 mb-6">Update patient details</p>

          {error && (
            <div className="border border-red-400 text-red-600 rounded-lg px-4 py-2 mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="border border-slate-300 rounded-xl p-6">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Full Name */}
              <div>
                <label className="block text-sm text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-slate-400 rounded-lg p-3 focus:ring-2 focus:ring-slate-700 outline-none transition"
                />
              </div>

              {/* DOB + Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm text-slate-700 mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full border border-slate-400 rounded-lg p-3 focus:ring-2 focus:ring-slate-700 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-1">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border border-slate-400 rounded-lg p-3 focus:ring-2 focus:ring-slate-700 outline-none transition"
                  >
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm text-slate-700 mb-1">Contact *</label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full border border-slate-400 rounded-lg p-3 focus:ring-2 focus:ring-slate-700 outline-none transition"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm text-slate-700 mb-1">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-slate-400 rounded-lg p-3 focus:ring-2 focus:ring-slate-700 outline-none transition resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard/adminDashboard/patients')}
                  className="px-6 py-2 border border-slate-500 rounded-lg hover:bg-slate-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-slate-800 transition disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPatient;
