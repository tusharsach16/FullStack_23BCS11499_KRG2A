import { useState } from "react";
import { authAPI } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authAPI.sendResetLink({ email });
      setMsg("✅ Reset link sent to your email.");
    } catch (err) {
      setMsg("❌ Unable to send reset email.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded w-80">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-2 mb-3"
        />

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Send Reset Link
        </button>

        {msg && <p className="text-center text-sm mt-3">{msg}</p>}

        <button
          onClick={() => navigate("/login")}
          type="button"
          className="mt-4 w-full text-blue-600 underline"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}
