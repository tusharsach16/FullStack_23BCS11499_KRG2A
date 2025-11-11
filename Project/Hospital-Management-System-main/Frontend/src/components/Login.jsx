import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../services/api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const email = formData.email.trim().toLowerCase();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let response;

      if (email.endsWith("@admin")) {
        response = await authAPI.loginAdmin({ username: email, password: formData.password });
      } else if (email.endsWith("@hospital.com")) {
        response = await authAPI.doctorLogin({ username: email, password: formData.password });
      } else {
        response = await authAPI.patientLogin({ username: email, password: formData.password });
      }

      const result = response.data.data;

      localStorage.setItem("token", result.token);
      localStorage.setItem("role", result.role);

      if (result.role === "PATIENT") {
        localStorage.setItem("email", result.email);
        localStorage.setItem("patientId", result.userId);
        navigate("/dashboard/patientDashboard");
      } else if (result.role === "DOCTOR") {
        localStorage.setItem("email", result.email);
        localStorage.setItem("doctorId", result.userId);
        navigate("/dashboard/doctorDashboard");
      } else if (result.role === "ADMIN") {
        localStorage.setItem("username", result.username);
        navigate("/dashboard/adminDashboard");
      }

    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">

      <div className="w-full max-w-md border border-slate-300 rounded-xl shadow-sm p-10 bg-white">

        <h1 className="text-2xl font-semibold text-center text-slate-900 mb-6">
          Sign In
        </h1>

        {error && (
          <div className="text-sm text-red-600 bg-red-100 border border-red-300 px-3 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-slate-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-800"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-slate-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-800"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-black text-white font-medium hover:bg-slate-800 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-slate-900 underline hover:opacity-60">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
