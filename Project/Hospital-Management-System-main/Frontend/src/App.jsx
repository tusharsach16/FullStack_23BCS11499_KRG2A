import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/page';

import AdminDashboard from './components/admin/AdminDashboard';
import DoctorDashboard from './components/dashboard/doctorDashboard';
import PatientDashboard from './components/dashboard/patientDashboard';

import PatientList from './components/PatientList';
import AddPatient from './components/AddPatient';
import EditPatient from './components/admin/EditPatient';
import EditDoctor from './components/admin/EditDoctor';
import PatientDetails from './components/PatientDetails';
import BookAppointment from './components/patient/BookAppointment';

import AppointmentList from './components/AppointmentList';
import AddAppointment from './components/AddAppointment';
import AddDoctor from './components/admin/AddDoctor';
import ViewPatients from './components/admin/ViewPatients';
import ViewDoctors from './components/admin/VIewDoctors';
import AddMedicalRecord from './components/doctor/AddMedicalRecord';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard by Roles */}
        <Route path="/dashboard/adminDashboard" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/dashboard/doctorDashboard" element={
          <ProtectedRoute allowedRoles={["DOCTOR"]}>
            <DoctorDashboard />
          </ProtectedRoute>
        } />

        <Route path="/dashboard/patientDashboard" element={
          <ProtectedRoute allowedRoles={["PATIENT"]}>
            <PatientDashboard />
          </ProtectedRoute>
        } />

        {/* Patient Management */}
        <Route path="/patients" element={<ProtectedRoute><PatientList /></ProtectedRoute>} />
        <Route path="/dashboard/adminDashboard/patients" element={<ProtectedRoute allowedRoles={["ADMIN"]}><ViewPatients /></ProtectedRoute>}/>
        <Route path="/patients/add" element={<ProtectedRoute><AddPatient /></ProtectedRoute>} />
        <Route path="/dashboard/adminDashboard/doctors" element={<ProtectedRoute allowedRoles={["ADMIN"]}><ViewDoctors /></ProtectedRoute>} />
        <Route path="/doctor/add" element={<ProtectedRoute><AddDoctor /></ProtectedRoute>} />
        <Route path="/dashboard/adminDashboard/doctors/edit/:id" element={<EditDoctor />} />
        <Route path="/patients/edit/:id" element={<ProtectedRoute><EditPatient /></ProtectedRoute>} />
        <Route path="/patients/:id" element={<ProtectedRoute><PatientDetails /></ProtectedRoute>} />
        <Route path="/appointments/book/:doctorId" element={
          <ProtectedRoute allowedRoles={["PATIENT"]}>
            <BookAppointment />
          </ProtectedRoute>
        } />

        {/* Appointments */}
        <Route path="/appointments" element={<ProtectedRoute><AppointmentList /></ProtectedRoute>} />
        <Route path="/appointments/add" element={<ProtectedRoute><AddAppointment /></ProtectedRoute>} />
        <Route path="/doctor/add-medical-record/:patientId/:appointmentId" element={<AddMedicalRecord />} />


        {/* Default */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
