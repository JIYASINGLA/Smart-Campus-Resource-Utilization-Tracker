import React from "react";
import Sidebar from "../components/Sidebar";
import { Bell, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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

const COLORS = ["#ef4444", "#f97316", "#facc15"];

/* ---------------- HEADER ---------------- */
const Header = () => (
  <div className="flex items-center justify-between p-5 mb-6 transition-all duration-300 border shadow-xl bg-white/60 backdrop-blur-xl border-white/40 rounded-2xl hover:shadow-2xl">
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Teacher Dashboard</h1>
      <p className="text-sm text-gray-500">Welcome back, Manage your class</p>
    </div>

    <div className="flex items-center gap-4">
      <Bell className="transition cursor-pointer hover:scale-110" />
      <img
        src="https://i.pravatar.cc/40"
        className="border-2 border-red-500 rounded-full"
      />
      <LogOut className="text-red-500 transition cursor-pointer hover:scale-110" />
    </div>
  </div>
);

/* ---------------- DETAIL CARD ---------------- */
const DetailCard = ({ title, count, page }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-6 text-white shadow-xl rounded-2xl bg-gradient-to-r from-red-500 to-orange-400 hover:shadow-[0_20px_50px_rgba(255,0,0,0.4)] transition-all duration-300"
    >
      <h2 className="text-3xl font-bold">{count}</h2>
      <p className="mb-4">{title}</p>

      <button
        onClick={() => navigate(page)}
        className="px-4 py-2 text-red-500 transition bg-white rounded-lg hover:bg-gray-100"
      >
        View Details
      </button>
    </motion.div>
  );
};

/* ---------------- DASHBOARD ---------------- */
const TeacherDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="relative flex-1 min-h-screen p-8 overflow-hidden bg-gradient-to-br from-pink-50 via-white to-orange-50">

        {/* Animated Blobs */}
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bg-pink-300 rounded-full w-72 h-72 opacity-30 blur-3xl top-10 left-10"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bg-orange-300 rounded-full w-72 h-72 opacity-30 blur-3xl bottom-10 right-10"
        />

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen p-6 border shadow-2xl bg-white/60 backdrop-blur-xl border-white/40 rounded-3xl"
        >
          <Header />

          {/* Welcome */}
          <div className="p-6 mb-6 text-white shadow-xl rounded-2xl bg-gradient-to-r from-red-500 to-orange-400">
            <h2 className="text-xl font-bold">Welcome Teacher 👋</h2>
            <p>Here is your today’s analytics and campus report</p>
          </div>

          {/* KPI */}
          <div className="grid grid-cols-2 gap-6 mb-6 md:grid-cols-4">
            {["Rooms", "Labs", "Teachers", "Students"].map((item, i) => (
              <div
                key={i}
                className="p-5 text-white transition shadow-xl rounded-2xl bg-gradient-to-r from-red-500 to-orange-400 hover:scale-105 hover:shadow-[0_20px_50px_rgba(255,0,0,0.4)] duration-300"
              >
                <h2 className="text-2xl font-bold">50</h2>
                <p>{item}</p>
              </div>
            ))}
          </div>

          {/* Quote */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="p-6 mb-6 text-white shadow-xl rounded-2xl bg-gradient-to-r from-pink-500 to-red-400"
          >
            <h2 className="text-lg font-semibold">Teacher Inspiration</h2>
            <p className="italic">
              "Great teachers inspire, guide, and shape the future."
            </p>
          </motion.div>

          {/* Graphs */}
          <div className="grid gap-6 mb-6 md:grid-cols-4">
            {[
              {
                title: "Weekly Students",
                chart: (
                  <BarChart data={attendanceData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="students" fill="#ef4444" />
                  </BarChart>
                ),
              },
              {
                title: "Performance",
                chart: (
                  <LineChart data={performanceData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line dataKey="score" stroke="#dc2626" />
                  </LineChart>
                ),
              },
              {
                title: "Resources",
                chart: (
                  <PieChart>
                    <Pie data={resourceUsage} dataKey="value">
                      {resourceUsage.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                  </PieChart>
                ),
              },
              {
                title: "Weekly Classes",
                chart: (
                  <LineChart data={classesData}>
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line dataKey="classes" stroke="#ef4444" />
                  </LineChart>
                ),
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 transition border shadow-xl bg-white/60 backdrop-blur-lg border-white/40 rounded-2xl hover:shadow-2xl"
              >
                <h3 className="mb-2">{item.title}</h3>
                <ResponsiveContainer width="100%" height={200}>
                  {item.chart}
                </ResponsiveContainer>
              </div>
            ))}
          </div>

          {/* Resource Cards (Library, Lab, Study Room) */}
          <div className="grid gap-6 mb-6 md:grid-cols-3">
            {[
              {
                name: "Library",
                status: "Available",
                usage: 70,
                image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
              },
              {
                name: "Computer Lab",
                status: "Occupied",
                usage: 90,
                image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
              },
              {
                name: "Study Room",
                status: "Available",
                usage: 40,
                image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
              },
            ].map((res, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="overflow-hidden transition border shadow-xl bg-white/70 backdrop-blur-lg border-white/40 rounded-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1 duration-300"
              >
                <div className="relative h-40">
                  <img src={res.image} className="object-cover w-full h-full" />
                  <div className="absolute text-lg font-semibold text-white bottom-2 left-3">
                    {res.name}
                  </div>
                </div>

                <div className="p-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      res.status === "Available"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {res.status}
                  </span>

                  <p className="mt-2 text-sm text-gray-500">Usage</p>

                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-red-500 to-orange-400"
                      style={{ width: `${res.usage}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-sm">{res.usage}%</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Rooms, Labs, Teachers Cards with View Details */}
          <div className="grid gap-6 mb-6 md:grid-cols-3">
            <DetailCard title="Total Rooms" count="50" page="/roomavailability" />
            <DetailCard title="Total Labs" count="20" page="/labavailability" />
            <DetailCard title="Total Teachers" count="35" page="/teacheravailability" />
          </div>

          {/* Tables Section */}
          <div className="grid gap-6 md:grid-cols-2">

            {/* Recent Classes */}
            <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-lg border-white/40 rounded-2xl">
              <h2 className="mb-4 text-lg font-semibold">Recent Classes</h2>

              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3">Room</th>
                    <th className="p-3">Subject</th>
                    <th className="p-3">Time</th>
                    <th className="p-3">Students</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {[
                    ["Room 101", "Data Structures", "09:00 AM", "60", "Completed"],
                    ["Room 170", "Operating System", "11:00 AM", "55", "Ongoing"],
                    ["Lab 3", "DBMS Lab", "02:00 PM", "45", "Upcoming"],
                  ].map((row, i) => (
                    <motion.tr
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      className="text-center transition duration-200 border-b hover:bg-gray-50 hover:shadow-md"
                    >
                      <td className="p-3">{row[0]}</td>
                      <td className="p-3">{row[1]}</td>
                      <td className="p-3">{row[2]}</td>
                      <td className="p-3">{row[3]}</td>
                      <td
                        className={`p-3 font-medium ${
                          row[4] === "Completed"
                            ? "text-green-600"
                            : row[4] === "Ongoing"
                            ? "text-blue-600"
                            : "text-orange-500"
                        }`}
                      >
                        {row[4]}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Timetable */}
            <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-lg border-white/40 rounded-2xl">
              <h2 className="mb-4 text-lg font-semibold">Today's Timetable</h2>

              <ul className="space-y-3">
                {[
                  "Math — 10:00 AM — Room 201",
                  "Data Structures — 12:00 PM — Room 170",
                  "DBMS Lab — 2:00 PM — Lab 3",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="p-3 transition border shadow bg-white/70 backdrop-blur-md border-white/40 rounded-xl hover:scale-105"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="relative mt-10 text-center text-gray-500">
            <div className="absolute w-40 h-1 left-1/2 -top-4 bg-gradient-to-r from-red-500 to-orange-400 blur-sm"></div>
            <p>Smart Campus Management System</p>
            <p>Teacher Dashboard © 2026</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
