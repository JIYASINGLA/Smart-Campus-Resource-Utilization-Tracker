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
  const [user, setUser] = useState({ name: "Student", profilePic: "" });

  useEffect(() => {
    // Fetch the logged-in user from localStorage
    const currentUser = JSON.parse(localStorage.getItem("loggedInUser")) || { name: "Student" };

    // If profilePic not set, generate a consistent avatar and store in localStorage
    if (!currentUser.profilePic) {
      // Use ?u=name so pravatar generates same image per user
      currentUser.profilePic = `https://i.pravatar.cc/150?u=${currentUser.name}`;
      localStorage.setItem("loggedInUser", JSON.stringify(currentUser));
    }

    setUser(currentUser);
  }, []);

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
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
                src={user.profilePic}
                alt="profile"
                className="w-10 h-10 border-2 border-indigo-500 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">

          {/* Hero Section */}
          <div className="p-6 mb-6 text-white shadow-lg bg-gradient-to-r from-indigo-600 to-green-500 rounded-2xl">
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

          {/* Motivational Cards */}
<div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
  {[
    {
      title: "Keep Learning!",
      quote: "Education is the most powerful weapon which you can use to change the world.",
      icon: "📚",
      bg: "from-indigo-500 to-purple-500",
    },
    {
      title: "Stay Motivated!",
      quote: "Don't watch the clock; do what it does. Keep going.",
      icon: "⏰",
      bg: "from-green-400 to-teal-500",
    },
    {
      title: "Believe in Yourself!",
      quote: "Believe you can and you're halfway there.",
      icon: "💪",
      bg: "from-yellow-400 to-orange-500",
    },
  ].map((card, index) => (
    <motion.div key={index} whileHover={{ scale: 1.05 }}>
      <Card className={`overflow-hidden bg-gradient-to-r ${card.bg} text-white`}>
        <CardContent className="flex flex-col items-start justify-between h-56 p-6">
          <span className="mb-4 text-4xl">{card.icon}</span>
          <h2 className="mb-2 text-xl font-bold">{card.title}</h2>
          <p className="text-sm">{card.quote}</p>
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
  <CardContent className="p-4">
    <h2 className="mb-4 text-xl font-semibold text-indigo-700">Occupancy</h2>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          innerRadius={60}    // makes it a donut chart
          outerRadius={80}
          startAngle={90}     // animation starting angle
          endAngle={450}      // full circle animation
          paddingAngle={3}    // space between slices
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} // custom label
        >
          {pieData.map((entry, i) => (
            <Cell
              key={i}
              fill={COLORS[i]}
              stroke="#fff"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [`${value}%`, name]}
          contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '8px', border: 'none' }}
        />
      </PieChart>
    </ResponsiveContainer>

    {/* Legend */}
    <div className="flex justify-center gap-6 mt-4">
      {pieData.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index] }}></span>
          <span className="text-sm font-medium">{item.name}</span>
        </div>
      ))}
    </div>
  </CardContent>
</Card>
          </div>

          {/* Charts Section */}
<div className="mb-4">
  <h2 className="text-2xl font-bold text-indigo-700">Campus Resource Statistics</h2>
  <p className="text-sm text-gray-500">
    Visual representation of usage and trends
  </p>
</div>

<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
  {/* Bar Chart */}
  <Card>
    <CardContent className="p-4">
      <h2 className="mb-2 text-lg font-semibold text-indigo-700">Resource Usage</h2>
      
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={usageData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="usage" fill="#6366F1" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>

  {/* Line Chart */}
  <Card>
    <CardContent className="p-4">
      <h2 className="mb-2 text-lg font-semibold text-indigo-700">Student Trends</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={trendData}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="day" /> 
          <YAxis />
          <Tooltip />
          <Line dataKey="students" stroke="#22C55E" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
</div>

  </div>
       {/* Footer */}
<footer className="relative p-8 mt-6 overflow-hidden text-white shadow-inner bg-gradient-to-r from-blue-700 to-green-700 rounded-t-3xl">
  {/* Decorative Blurs */}
  <div className="absolute top-0 rounded-full left-1/4 w-28 h-28 bg-white/20 blur-3xl animate-pulse"></div>
  <div className="absolute bottom-0 rounded-full right-1/4 w-36 h-36 bg-white/10 blur-3xl animate-pulse"></div>

  <div className="relative flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
    
    {/* Footer Title & Quote */}
    <div className="flex flex-col items-center gap-2 md:items-start">
      <h2 className="text-lg font-extrabold text-white drop-shadow-md">🎓 Smart Campus Dashboard • 2026</h2>
      <p className="mt-1 text-sm italic text-white/90">“Keep learning, keep growing!”</p> 
    </div>
    {/* Motivational Tagline */}
    <div className="mt-4 text-sm italic font-medium text-yellow-200 md:mt-0 drop-shadow-md">
      🚀 Empowering Students • Learn • Optimize • Achieve
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="pt-4 mt-6 text-center border-t text-s border-white/30 text-white/80">
    © 2026 Smart Campus • Designed for Students
  </div>
</footer>
      </div>
    </div>
  );
}