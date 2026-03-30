import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Bell, LogOut, Calendar, Users, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

/* ---------------- DATA ---------------- */
const attendanceData = [
  { day: "Mon", classes: 2, students: 120 },
  { day: "Tue", classes: 3, students: 180 },
  { day: "Wed", classes: 1, students: 60 },
  { day: "Thu", classes: 2, students: 120 },
  { day: "Fri", classes: 3, students: 180 },
];

const performanceData = [
  { month: "Jan", score: 60 },
  { month: "Feb", score: 75 },
  { month: "Mar", score: 85 },
  { month: "Apr", score: 70 },
];

const resourceUsage = [
  { name: "Library", value: 70 },
  { name: "Lab", value: 90 },
  { name: "Study", value: 40 },
];

const classesData = [
  { week: "Week 1", classes: 8 },
  { week: "Week 2", classes: 10 },
  { week: "Week 3", classes: 6 },
  { week: "Week 4", classes: 12 },
];

const todaySchedule = [
  { time: "08:00 AM", subject: "Mathematics", room: "101" },
  { time: "09:30 AM", subject: "Physics", room: "Lab 1" },
  { time: "11:00 AM", subject: "Chemistry", room: "Lab 2" },
  { time: "01:00 PM", subject: "English", room: "103" },
];

const COLORS = ["#ec4899", "#f472b6", "#a78bfa"];

/* ---------------- HEADER ---------------- */
const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <div className="flex items-center justify-between p-3 mb-4 border shadow-md bg-white/70 backdrop-blur-lg border-white/30 rounded-xl">
      
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Teacher Dashboard
          </h1>
          <p className="text-gray-500 text-l">
            Welcome back, {user?.name}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center">
          <img
            src={user?.pic}
            className="border-2 border-pink-500 rounded-full w-15 h-15"
            alt="Teacher Avatar"
          />
          <span className="text-[10px] text-gray-700">
            {user?.name}
          </span>
        </div>
      </div>

    </div>
  );
};
/* ---------------- DETAIL CARD ---------------- */
const DetailCard = ({ title, count, subtitle, image }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative overflow-hidden text-white shadow-xl rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500"
    >
      {image && <img src={image} className="absolute inset-0 object-cover w-full h-full opacity-30" />}
      <div className="relative p-6">
        <h2 className="text-3xl font-bold">{count}</h2>
        <p className="mb-2">{title}</p>
        {subtitle && <p className="text-sm italic text-white/80">{subtitle}</p>}
      </div>
    </motion.div>
  );
};

/* ---------------- SCHEDULE CARD ---------------- */
const ScheduleCard = ({ time, subject, room }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="flex items-center justify-between p-3 mb-2 border rounded-lg shadow-md bg-white/70 backdrop-blur-md border-white/30"
  >
    <div className="flex items-center gap-2">
      <Calendar className="w-5 h-5 text-pink-500" />
      <span className="font-semibold text-gray-800">{time}</span>
    </div>
    <span className="font-medium text-gray-700">{subject}</span>
    <span className="text-gray-500">{room}</span>
  </motion.div>
);

/* ---------------- DASHBOARD ---------------- */
const TeacherDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="relative flex-1 min-h-screen p-8 overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50">

        {/* Animated Background Blobs */}
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bg-pink-300 rounded-full w-72 h-72 opacity-30 blur-3xl top-10 left-10"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bg-purple-300 rounded-full w-72 h-72 opacity-30 blur-3xl bottom-10 right-10"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen p-6 border shadow-2xl bg-white/60 backdrop-blur-xl border-white/40 rounded-3xl"
        >
          <Header />

          {/* KPI Cards - Pink & Purple Gradient */}
<div className="p-6 mb-6 text-white shadow-lg bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl">
  <h2 className="mb-2 text-2xl font-bold">Smart Monitoring & Optimization</h2>
  <p>Track and optimize campus resources in real time.</p>

  <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-4">
    {[
      ["50", "Rooms", "78% Utilized"],
      ["20", "Labs", "65% Weekly"],
      ["35", "Teachers", "82% Active"],
      ["1200", "Students", "Active Users"],
    ].map((item, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.05, y: -5 }}
        className="relative p-4 overflow-hidden text-center shadow-xl bg-white/70 rounded-xl backdrop-blur-lg"
      >
        {/* Background Image with blur */}
        {item[3] && (
          <img
            src={item[3]}
            className="absolute inset-0 object-cover w-full h-full opacity-30 rounded-xl"
            alt={item[1]}
          />
        )}

        {/* Overlay gradient for glass effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-200/30 via-purple-200/20 to-pink-100/20 rounded-xl"></div>

        <h3 className="relative text-2xl font-bold text-gray-800">{item[0]}</h3>
        <p className="relative text-gray-700">{item[1]}</p>
        <p className="relative text-sm text-purple-600">{item[2]}</p>
      </motion.div>
    ))}
  </div>
</div>

    

          {/* Graphs Section */}
<div className="grid gap-6 mb-6 md:grid-cols-2">

  {/* Weekly Students Histogram */}
  <div className="p-4 transition border shadow-xl bg-white/60 backdrop-blur-lg border-white/40 rounded-2xl hover:shadow-2xl">
    <div className="flex items-center gap-2 mb-2">
      <Users className="w-5 h-5 text-pink-500" />
      <h3 className="font-semibold text-gray-800">Weekly Student Attendance</h3>
    </div>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={attendanceData}>
        <XAxis dataKey="day" tick={{ fill: "#6b7280", fontSize: 13 }} />
        <YAxis tick={{ fill: "#6b7280", fontSize: 13 }} />
        <Tooltip 
          contentStyle={{ backgroundColor: "#f3f4f6", borderRadius: 10, border: "none" }}
          itemStyle={{ color: "#ec4899" }}
        />
        <Bar dataKey="students" fill="url(#gradStudents)" barSize={30} radius={[10,10,0,0]} />
        <defs>
          <linearGradient id="gradStudents" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f472b6" stopOpacity={0.8}/>
            <stop offset="100%" stopColor="#ec4899" stopOpacity={0.8}/>
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* Resource Usage */}
  <div className="p-4 transition border shadow-xl bg-white/60 backdrop-blur-lg border-white/40 rounded-2xl hover:shadow-2xl">
    <div className="flex items-center gap-2 mb-2">
      <BookOpen className="w-5 h-5 text-purple-500" />
      <h3 className="font-semibold text-gray-800">Resource Utilization</h3>
    </div>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={resourceUsage}
          dataKey="value"
          nameKey="name"
          outerRadius={80}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {resourceUsage.map((_, i) => (
            <Cell key={i} fill={COLORS[i]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ backgroundColor: "#f3f4f6", borderRadius: 10, border: "none" }}
          itemStyle={{ color: "#a78bfa" }}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>

  {/* Monthly Performance */}
  <div className="p-4 transition border shadow-xl bg-white/60 backdrop-blur-lg border-white/40 rounded-2xl hover:shadow-2xl">
    <div className="flex items-center gap-2 mb-2">
      <Calendar className="w-5 h-5 text-green-500" />
      <h3 className="font-semibold text-gray-800">Monthly Performance</h3>
    </div>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={performanceData}>
        <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 13 }} />
        <YAxis tick={{ fill: "#6b7280", fontSize: 13 }} />
        <Tooltip 
          contentStyle={{ backgroundColor: "#f3f4f6", borderRadius: 10, border: "none" }}
          itemStyle={{ color: "#a855f7" }}
        />
        <Line 
          dataKey="score" 
          stroke="url(#gradPerformance)" 
          strokeWidth={3} 
          dot={{ r: 5, strokeWidth: 2, fill: '#a855f7' }}
        />
        <defs>
          <linearGradient id="gradPerformance" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a855f7"/>
            <stop offset="100%" stopColor="#f472b6"/>
          </linearGradient>
        </defs>
      </LineChart>
    </ResponsiveContainer>
  </div>

  {/* Weekly Classes */}
  <div className="p-4 transition border shadow-xl bg-white/60 backdrop-blur-lg border-white/40 rounded-2xl hover:shadow-2xl">
    <div className="flex items-center gap-2 mb-2">
      <Calendar className="w-5 h-5 text-blue-500" />
      <h3 className="font-semibold text-gray-800">Weekly Classes Scheduled</h3>
    </div>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={classesData}>
        <XAxis dataKey="week" tick={{ fill: "#6b7280", fontSize: 13 }} />
        <YAxis tick={{ fill: "#6b7280", fontSize: 13 }} />
        <Tooltip 
          contentStyle={{ backgroundColor: "#f3f4f6", borderRadius: 10, border: "none" }}
          itemStyle={{ color: "#f472b6" }}
        />
        <Line 
          dataKey="classes" 
          stroke="url(#gradClasses)" 
          strokeWidth={3} 
          dot={{ r: 5, strokeWidth: 2, fill: '#f472b6' }}
        />
        <defs>
          <linearGradient id="gradClasses" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f472b6"/>
            <stop offset="100%" stopColor="#ec4899"/>
          </linearGradient>
        </defs>
      </LineChart>
    </ResponsiveContainer>
  </div>

</div>

          {/* Footer */}
          <footer className="relative p-6 mt-10 overflow-hidden text-white shadow-inner bg-gradient-to-r from-pink-500 to-purple-500 rounded-t-3xl">
            <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
              <div>
                <h2 className="text-lg font-bold">📚 Teacher Dashboard • 2026</h2>
                <p className="mt-1 text-sm italic">“Educate, Inspire, and Empower.”</p>
              </div>
              <div className="text-sm italic text-white/80 md:mt-0 drop-shadow-md">
                🚀 Monitoring Classes • Attendance • Resource Usage
              </div>
            </div>
            <div className="pt-4 mt-4 text-xs text-center border-t border-white/30 text-white/80">
              © 2026 Smart Campus • Designed for Teachers
            </div>
          </footer>
        </motion.div>
      </div>
    </div>
  );
};

export default TeacherDashboard;