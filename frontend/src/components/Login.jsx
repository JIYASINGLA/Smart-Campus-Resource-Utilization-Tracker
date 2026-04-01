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

  const users = [
    // Example Students
    { email: "student1@campus.com", password: "pass123", role: "student", name: "Student One", pic: "https://i.pravatar.cc/150?img=1" },
    { email: "student2@campus.com", password: "pass123", role: "student", name: "Student Two", pic: "https://i.pravatar.cc/150?img=2" },
    // Example Faculties
    { email: "faculty1@campus.com", password: "pass123", role: "faculty", name: "Faculty One", pic: "https://i.pravatar.cc/150?img=10" },
    { email: "sita@campus.com", password: "sita123", role: "faculty", name: "Sita Rana", pic: "https://i.pravatar.cc/150?img=10"},
    { email: "faculty2@campus.com", password: "pass123", role: "faculty", name: "Faculty Two", pic: "https://i.pravatar.cc/150?img=11" },
    // Admin
    { email: "admin@campus.com", password: "admin123", role: "admin", name: "Admin", pic: "https://i.pravatar.cc/150?img=20" },
  ];

  const handleLogin = () => {
    const user = users.find(u => u.email === form.email);

    if (!user) {
      setError("⚠️ No account found. Contact admin.");
      return;
    }

    if (user.password !== form.password) {
      setError("⚠️ Wrong password!");
      return;
    }

    if (user.role !== role) {
      setError(`⚠️ Registered as ${user.role}. Select correct role.`);
      return;
    }

    // Store full user
localStorage.setItem("currentUser", JSON.stringify(user));

// Store role separately
localStorage.setItem("role", user.role);

// Store teacher ID (use email as ID for now)
if (user.role === "faculty") {
  localStorage.setItem("teacherID", user.email);
}
    setError("");
    alert(`✅ Welcome ${user.name}! Redirecting...`);
    navigate(roleConfig[role].redirect);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[400px] bg-white rounded-lg shadow-lg p-6">
        <div className={`bg-gradient-to-r ${roleConfig[role].gradient} text-white p-4 rounded-t-lg text-center`}>
          <h2 className="text-lg font-semibold">Login to Portal</h2>
          <p className="text-sm opacity-80">Select role to continue</p>
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

        {/* Email & Password */}
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

        <button
          onClick={handleLogin}
          className={`w-full py-2 text-white rounded bg-gradient-to-r ${roleConfig[role].gradient} hover:opacity-90 transition`}
        >
          Login as {roleConfig[role].label}
        </button>

        <div className="mt-4 text-xs text-center text-gray-500">
         Accounts are provided by admin. Contact admin if you don’t have credentials.
        </div>
      </div>
    </div>
  );
}