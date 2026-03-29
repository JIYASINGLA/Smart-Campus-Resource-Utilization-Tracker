import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const roleConfig = {
    student: { label: "Student", redirect: "/studentdashboard", gradient: "from-green-400 to-indigo-500" },
    faculty: { label: "Faculty", redirect: "/teacherdashboard", gradient: "from-purple-400 to-pink-500" },
    admin: { label: "Admin", redirect: "/admindashboard", gradient: "from-yellow-400 to-red-400" },
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email exists
    const user = users.find(u => u.email === form.email);

    if (!user) {
      setError("⚠️ No user found. Please signup first!");
      return;
    }

    // Check password
    if (user.password !== form.password) {
      setError("⚠️ Wrong password!");
      return;
    }

    // Check role
    if (user.role !== role) {
      setError(`⚠️ This user is registered as ${user.role}. Please select the correct role.`);
      return;
    }

    // ✅ Successful login
    setError("");
    alert(`✅ Welcome ${user.name}! Redirecting to ${roleConfig[role].label} Dashboard.`);
    navigate(roleConfig[role].redirect);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[400px] bg-white rounded-lg shadow-lg p-6">
        <div className={`bg-gradient-to-r ${roleConfig[role].gradient} text-white p-4 rounded-t-lg text-center`}>
          <h2 className="text-lg font-semibold">Login to Portal</h2>
          <p className="text-sm opacity-80">Choose your role to continue</p>
        </div>

        {/* Role Switch */}
        <div className="flex justify-between p-1 mt-4 mb-6 bg-gray-200 rounded-full">
          {["student", "faculty", "admin"].map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 text-sm py-2 rounded-full transition-all duration-300 ${role === r ? "bg-white shadow font-medium" : "text-gray-600"}`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-2 mb-4 text-sm text-white bg-red-400 rounded-lg">
            {error}
          </motion.div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className={`w-full py-2 text-white rounded bg-gradient-to-r ${roleConfig[role].gradient} hover:opacity-90 transition`}
        >
          Login as {roleConfig[role].label}
        </button>

        <div className="mt-4 text-xs text-center text-gray-500">
          <p>
            Don't have an account?{" "}
            <span className="font-semibold text-indigo-500 cursor-pointer hover:underline" onClick={() => navigate("/signup")}>
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}