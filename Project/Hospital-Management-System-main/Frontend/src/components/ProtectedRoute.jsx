import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token"); // ✅ Correct key
  const role = (localStorage.getItem("role") || "").trim().toUpperCase(); // ✅ Normalize role

  // ✅ If not logged in → send to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ If route requires specific roles → check them
  if (allowedRoles && !allowedRoles.map(r => r.toUpperCase()).includes(role)) {
    return <Navigate to="/login" replace />; // ✅ Not admin redirect
  }

  return children;
};

export default ProtectedRoute;
