import React, { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");

  const roleConfig = {
    student: {
      label: "Student",
      redirect: "/studentdashboard",
      gradient: "from-green-400 to-indigo-500",
    },
    faculty: {
      label: "Faculty",
      redirect: "/teacherdashboard",
      gradient: "from-purple-400 to-pink-500",
    },
    admin: {
      label: "Admin",
      redirect: "/admindashboard",
      gradient: "from-yellow-400 to-red-400",
    },
  };

  const handleSignup = () => {
    // ✅ Check all fields
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("⚠️ Please fill all fields");
      return;
    }

    // ✅ Check password match
    if (form.password !== form.confirm) {
      setError("⚠️ Passwords do not match");
      return;
    }

    // ✅ Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Check if user already exists
    const existingUser = users.find((u) => u.email === form.email);
    if (existingUser) {
      setError("⚠️ User already exists! Please login.");
      return;
    }

    // ✅ Save new user
    const newUser = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: role,
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setError("");
    alert(`✅ ${roleConfig[role].label} account created successfully!`);

    // 🔥 Redirect to login page
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-gray-100 to-pink-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-[950px] bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* HEADER */}
        <div
          className={`py-6 text-center text-white bg-gradient-to-r ${roleConfig[role].gradient}`}
        >
          <h1 className="text-2xl font-semibold">Create Your Account</h1>
          <p className="text-sm opacity-80">Signup as {roleConfig[role].label}</p>
        </div>

        <div className="flex gap-8 p-8">
          {/* LEFT IMAGE */}
          <div className="relative w-1/2 overflow-hidden">
            <motion.img
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              src="https://img.freepik.com/premium-vector/sign-up-page-vector-illustration-flat-2_764382-64286.jpg"
              alt="campus"
              className="object-cover w-full h-full rounded-2xl"
            />
            {/* Glow */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute w-40 h-40 rounded-full bg-pink-300/40 blur-3xl top-10 left-10"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute w-40 h-40 rounded-full bg-gray-300/40 blur-3xl bottom-10 right-10"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
            {/* Text */}
            <div className="absolute text-white bottom-6 left-6">
              <h2 className="text-xl font-bold">Smart Campus</h2>
              <p className="text-sm opacity-80">Manage rooms, labs & schedules easily</p>
            </div>
          </div>

          {/* FORM */}
          <div className="flex flex-col justify-center w-1/2">
            {/* ROLE SWITCH */}
            <div className="flex p-1 mb-5 bg-gray-200 rounded-full">
              {["student", "faculty", "admin"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 text-sm rounded-full transition ${
                    role === r ? "bg-white shadow font-semibold" : "text-gray-600"
                  }`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>

            {/* ERROR */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-2 mb-4 text-sm text-white bg-red-400 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            {/* NAME */}
            <div className="flex items-center mb-5 border-b focus-within:border-pink-400">
              <User className="mr-2 text-pink-400" size={18} />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full py-2 bg-transparent outline-none"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* EMAIL */}
            <div className="flex items-center mb-5 border-b focus-within:border-pink-400">
              <Mail className="mr-2 text-pink-400" size={18} />
              <input
                type="email"
                placeholder="Email"
                className="w-full py-2 bg-transparent outline-none"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            {/* PASSWORD */}
            <div className="flex items-center mb-5 border-b focus-within:border-pink-400">
              <Lock className="mr-2 text-pink-400" size={18} />
              <input
                type="password"
                placeholder="Password"
                className="w-full py-2 bg-transparent outline-none"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            {/* CONFIRM */}
            <div className="flex items-center mb-3 border-b focus-within:border-pink-400">
              <Lock className="mr-2 text-pink-400" size={18} />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full py-2 bg-transparent outline-none"
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              />
            </div>

            {/* BUTTON */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignup}
              className={`py-2 mt-3 text-white rounded-lg shadow-lg bg-gradient-to-r ${roleConfig[role].gradient}`}
            >
              Sign Up as {roleConfig[role].label}
            </motion.button>

            {/* LOGIN LINK */}
            <p className="mt-4 text-sm text-center">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="font-medium text-pink-500 cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}