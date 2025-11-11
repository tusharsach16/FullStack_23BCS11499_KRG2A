import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authAPI.logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 11a1 1 0 112 0v2a1 1 0 11-2 0v-2zm1-5a1 1 0 011 1v1a1 1 0 11-2 0V7a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <Link to="/dashboard" className="text-xl font-bold">
              Hospital Management System
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link to="/dashboard" className="hover:text-blue-200 transition">
              Dashboard
            </Link>
            <Link to="/patients" className="hover:text-blue-200 transition">
              Patients
            </Link>
            <Link to="/appointments" className="hover:text-blue-200 transition">
              Appointments
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;