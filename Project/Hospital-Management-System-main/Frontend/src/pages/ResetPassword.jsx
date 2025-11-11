import { useState } from "react";
import { authAPI } from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const email = query.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authAPI.resetPassword({ email, newPassword });
      setMsg("✅ Password changed! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMsg("❌ Failed to reset password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded w-80">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>

        <p className="text-sm mb-3 text-gray-500">Email: {email}</p>

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border w-full p-2 mb-3"
        />

        <button className="bg-green-600 text-white w-full py-2 rounded">
          Update Password
        </button>

        {msg && <p className="text-center text-sm mt-3">{msg}</p>}
      </form>
    </div>
  );
}
