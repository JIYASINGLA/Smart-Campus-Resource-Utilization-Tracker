import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SidebarStudent from "../components/SidebarStudent";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
  LineChart, Line, CartesianGrid
} from "recharts";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

/* ---------- Card Component ---------- */
const Card = ({ children, className }) => (
  <div className={`bg-white/60 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);

/* ---------- Data ---------- */
const usageData = [
  { name: "Mon", usage: 65 },
  { name: "Tue", usage: 59 },
  { name: "Wed", usage: 80 },
  { name: "Thu", usage: 81 },
  { name: "Fri", usage: 56 },
  { name: "Sat", usage: 40 },
];

const pieData = [
  { name: "Occupied", value: 70 },
  { name: "Free", value: 30 },
];

const trendData = [
  { day: "Mon", students: 300 },
  { day: "Tue", students: 450 },
  { day: "Wed", students: 500 },
  { day: "Thu", students: 650 },
  { day: "Fri", students: 550 },
];

const COLORS = ["#4F46E5", "#22C55E"];

const notifications = [
  "Your lecture has been shifted to Room 204.",
  "Today's lab is merged with Section B.",
  "Library will be closed after 5 PM.",
  "New AI Workshop available – Register soon.",
];

/* ---------- Main Component ---------- */
export default function StudentDashboard() {
  const [user, setUser] = useState({ name: "Student" });

  useEffect(() => {
    // Fetch the logged-in user from localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) setUser(currentUser);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Sidebar */}
      <SidebarStudent />

      {/* Animated Background Glow */}
      <div className="absolute bg-purple-400 rounded-full w-96 h-96 blur-3xl opacity-30 animate-pulse top-10 left-10"></div>
      <div className="absolute bg-indigo-400 rounded-full w-96 h-96 blur-3xl opacity-30 animate-pulse bottom-10 right-10"></div>

      {/* Main */}
      <div className="z-10 flex flex-col flex-1">

        {/* Header */}
        <div className="flex items-center justify-between p-4 shadow bg-white/70 backdrop-blur-md">
          <h1 className="text-2xl font-bold text-indigo-700">Student Dashboard</h1>

          <div className="flex items-center gap-3">
            <Link to="/notifications">
              <Bell className="transition cursor-pointer hover:text-indigo-600" />
            </Link>

            {/* User info */}
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-indigo-700">{user.name}</span>
              <img
                src="https://i.pravatar.cc/40"
                alt="profile"
                className="border-2 border-indigo-500 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">

          {/* Hero Section */}
          <div className="p-6 mb-6 text-white shadow-lg bg-gradient-to-r from-indigo-600 via-dark-blue-600 to-green-500 rounded-2xl">
            <h2 className="mb-2 text-2xl font-bold">Smart Monitoring & Optimization</h2>
            <p>Track and optimize campus resources in real time.</p>

            <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-4">
              {[
                ["50", "Rooms", "78% Utilized"],
                ["40", "Labs", "65% Weekly"],
                ["135", "Teachers", "82% Active"],
                ["15K+", "Students", "Active Users"],
              ].map((item, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }} className="relative p-4 overflow-hidden text-center text-black bg-white shadow-xl rounded-xl">
                  <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-indigo-400 to-purple-400 blur-xl"></div>
                  <h3 className="text-2xl font-bold">{item[0]}</h3>
                  <p>{item[1]}</p>
                  <p className="text-sm text-green-600">{item[2]}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Resource Cards */}
          <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
            {[
              {
                name: "Library",
                status: "Available",
                occupancy: "70%",
                img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
              },
              {
                name: "Computer Lab",
                status: "Occupied",
                occupancy: "90%",
                img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
              },
              {
                name: "Study Room",
                status: "Available",
                occupancy: "40%",
                img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
              },
            ].map((resource, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }}>
                <Card className="overflow-hidden">
                  <div className="relative">
                    <img src={resource.img} className="object-cover w-full h-36" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60"></div>
                    <h2 className="absolute font-bold text-white bottom-2 left-3">{resource.name}</h2>
                  </div>
                  <CardContent className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      resource.status === "Available"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}>
                      {resource.status}
                    </span>

                    <div className="mt-3">
                      <div className="flex justify-between text-sm">
                        <span>Occupancy</span>
                        <span>{resource.occupancy}</span>
                      </div>

                      <div className="w-full h-2 mt-1 bg-gray-200 rounded-full">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: resource.occupancy }}
                          className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Notifications + Pie */}
          <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold text-indigo-700">Notifications</h2>
                {notifications.map((n, i) => (
                  <div key={i} className="p-3 mb-2 border-l-4 border-indigo-500 rounded bg-indigo-50">
                    ⚡ {n}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h2 className="mb-4 text-xl font-semibold text-indigo-700">Occupancy</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value">
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-indigo-700">Campus Resource Statistics</h2>
            <p className="text-sm text-gray-500">Visual representation of usage, trends, and AI predictions</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={usageData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="usage" fill="#6366F1" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="students" stroke="#22C55E" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-indigo-700">AI Prediction</h2>
                <p className="mt-2">Best Time:</p>
                <p className="text-2xl font-bold text-indigo-600">2 PM – 4 PM</p>
                <p className="mt-2 text-green-600">Expected Occupancy: 40%</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 text-center bg-white shadow">
          🚀 Smart Campus • React + Tailwind Dashboard
        </div>
      </div>
    </div>
  );
}