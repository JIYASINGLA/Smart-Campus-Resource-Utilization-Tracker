import React from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import { motion } from "framer-motion";
import { Users, Building, BookOpen, Bell } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar } from "recharts";

// Existing stats & requests
const stats = [
  { title: "Total Departments", value: 14, icon: <Building size={28} />, color: "from-indigo-500 to-purple-600" },
  { title: "Total Rooms", value: 142, icon: <Building size={28} />, color: "from-green-400 to-green-600" },
  { title: "Total Labs", value: 38, icon: <BookOpen size={28} />, color: "from-yellow-400 to-yellow-500" },
  { title: "Total Teachers", value: 412, icon: <Users size={28} />, color: "from-pink-400 to-pink-600" },
  { title: "Pending Requests", value: 24, icon: <Bell size={28} />, color: "from-red-400 to-red-600" },
];

const requests = [
  { avatar: "https://i.pravatar.cc/40?img=1", name: "Dr. Alan Turing", resource: "Lab 302", schedule: "Oct 24, 10:00 AM", reason: "Advanced Robotics Workshop", status: "Urgent" },
  { avatar: "https://i.pravatar.cc/40?img=2", name: "Prof. Ada Lovelace", resource: "Room 105", schedule: "Oct 24, 02:00 PM", reason: "Algorithm Design Seminar", status: "Pending" },
  { avatar: "https://i.pravatar.cc/40?img=3", name: "Dr. Grace Hopper", resource: "Lab 110", schedule: "Oct 25, 09:00 AM", reason: "Compiler Construction Lab", status: "Pending" },
  { avatar: "https://i.pravatar.cc/40?img=4", name: "Steve Wozniak", resource: "Room 402", schedule: "Oct 25, 04:30 PM", reason: "Hardware Hacking Club", status: "Pending" },
  { avatar: "https://i.pravatar.cc/40?img=5", name: "Margaret Hamilton", resource: "Lab 205", schedule: "Oct 26, 11:15 AM", reason: "Software Engineering Project", status: "Urgent" },
  { avatar: "https://i.pravatar.cc/40?img=1", name: "Dr. Alan Turing", resource: "Lab 302", schedule: "Oct 24, 10:00 AM", reason: "Advanced Robotics Workshop", status: "Urgent" },
  { avatar: "https://i.pravatar.cc/40?img=2", name: "Prof. Ada Lovelace", resource: "Room 105", schedule: "Oct 24, 02:00 PM", reason: "Algorithm Design Seminar", status: "Pending" },
  { avatar: "https://i.pravatar.cc/40?img=3", name: "Dr. Grace Hopper", resource: "Lab 110", schedule: "Oct 25, 09:00 AM", reason: "Compiler Construction Lab", status: "Pending" },
  { avatar: "https://i.pravatar.cc/40?img=4", name: "Steve Wozniak", resource: "Room 402", schedule: "Oct 25, 04:30 PM", reason: "Hardware Hacking Club", status: "Pending" },
  { avatar: "https://i.pravatar.cc/40?img=5", name: "Margaret Hamilton", resource: "Lab 205", schedule: "Oct 26, 11:15 AM", reason: "Software Engineering Project", status: "Urgent" },
  { avatar: "https://i.pravatar.cc/40?img=3", name: "Dr. Grace Hopper", resource: "Lab 110", schedule: "Oct 25, 09:00 AM", reason: "Compiler Construction Lab", status: "Pending" },
  { avatar: "https://i.pravatar.cc/40?img=4", name: "Steve Wozniak", resource: "Room 402", schedule: "Oct 25, 04:30 PM", reason: "Hardware Hacking Club", status: "Pending" },
  { avatar: "https://i.pravatar.cc/40?img=5", name: "Margaret Hamilton", resource: "Lab 205", schedule: "Oct 26, 11:15 AM", reason: "Software Engineering Project", status: "Urgent" },
];

// Existing Line chart data
const utilizationData = [
  { day: "Mon", rooms: 120 },
  { day: "Tue", rooms: 150 },
  { day: "Wed", rooms: 90 },
  { day: "Thu", rooms: 170 },
  { day: "Fri", rooms: 140 },
];

// Additional charts
const deptDistribution = [
  { name: "CS", value: 6 },
  { name: "ECE", value: 4 },
  { name: "ME", value: 2 },
  { name: "CE", value: 2 },
];

const teacherBarData = [
  { dept: "CS", teachers: 120 },
  { dept: "ECE", teachers: 80 },
  { dept: "ME", teachers: 60 },
  { dept: "CE", teachers: 50 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarAdmin />
      

      <div className="flex-1 px-8 py-6 overflow-y-auto bg-gray-50">
        {/* Header */}
        <div className="flex flex-col flex-5">
          <header className="sticky top-0 z-20 flex items-center justify-between px-8 py-4 bg-white shadow-md">
            <h1 className="text-2xl font-bold text-indigo-600">CampusConnect</h1>
            <div className="flex items-center gap-3">
              <p className="font-medium text-gray-700">Admin</p>
              <img
                src="https://i.pravatar.cc/40?img=12"
                alt="User Avatar"
                className="w-10 h-10 border-2 border-indigo-500 rounded-full"
              />
            </div>
          </header>
        </div>

        {/* Existing Dashboard Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
                Admin Dashboard</h1>
            <p className="text-gray-500">System oversight and resource orchestration for Fall 2026 Semester</p>
          </div>
         
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-5">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`flex flex-col justify-between p-5 bg-gradient-to-br ${item.color} text-white shadow-md rounded-2xl`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{item.value}</h2>
                  <p className="text-sm">{item.title}</p>
                </div>
                <div className="p-3 rounded-lg bg-white/20">{item.icon}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Pending Requests */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="p-6 bg-white shadow-md lg:col-span-2 rounded-2xl">
            <h2 className="mb-4 text-xl font-semibold">Pending Booking Requests</h2>
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 rounded-t-lg">
                <tr>
                  <th className="p-3">Requestor</th>
                  <th className="p-3">Resource</th>
                  <th className="p-3">Schedule</th>
                  <th className="p-3">Reason</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r, i) => (
                  <tr key={i} className="transition border-b hover:bg-orange-50">
                    <td className="flex items-center gap-2 p-3">
                      <img src={r.avatar} alt={r.name} className="w-8 h-8 rounded-full" />
                      {r.name}
                    </td>
                    <td className="p-3">{r.resource}</td>
                    <td className="p-3">{r.schedule}</td>
                    <td className="p-3">{r.reason}</td>
                    <td className={`p-3 font-semibold ${r.status === "Urgent" ? "text-red-600" : "text-gray-500"}`}>{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Live Utilization + Charts */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="p-6 space-y-6 bg-white shadow-md rounded-2xl">
            <h2 className="mb-4 text-xl font-semibold">Live Utilization</h2>
            <div className="w-full h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={utilizationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="rooms" stroke="#8884d8" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Additional Pie Chart */}
            <h2 className="text-xl font-semibold">Department Distribution</h2>
            <div className="w-full h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={deptDistribution} dataKey="value" nameKey="name" outerRadius={50} label>
                    {deptDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Additional Bar Chart */}
            <h2 className="text-xl font-semibold">Teachers per Department</h2>
            <div className="w-full h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teacherBarData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dept" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="teachers" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Activity */}
            <h2 className="mt-6 mb-2 text-xl font-semibold">Recent Activity</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>James Wilson checked into Room 201</p>
              <p>Dr. Sarah Jenkins approved Merge Request #42</p>
              <p>System reported over-capacity in Lab 302</p>
              <p>Prof. Miller booked Auditorium A</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Info Cards */}
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
          <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-blue-100 shadow-md rounded-2xl">
            <h2 className="text-lg font-semibold">Optimization Engine</h2>
            <p className="mt-2 text-sm text-gray-600">The system found 4 alternative rooms that could save 12% energy based on student location.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-teal-100 shadow-md rounded-2xl">
            <h2 className="text-lg font-semibold">Merge Opportunity</h2>
            <p className="mt-2 text-sm text-gray-600">Bio-Chem 101 and Molecular Lab have 80% overlapping curriculum today.</p>
          </motion.div>
        </div>

        {/* Footer + Banner + Effects */}
<div className="mt-12">
  {/* Optional Banner / Announcement */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative flex items-center justify-between p-6 mb-8 text-white shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl"
  >
    <div>
      <h3 className="text-xl font-bold">Campus Tip of the Day</h3>
      <p className="mt-1 text-sm">Remember to submit room requests at least 24 hours in advance to ensure availability.</p>
    </div>
    <img src="https://i.ibb.co/4pDNDk1/campus-banner.png" alt="Campus" className="object-cover w-24 h-24 rounded-full" />
  </motion.div>

  {/* Footer */}
  <footer className="p-6 mt-12 text-gray-200 bg-gray-800 shadow-inner rounded-2xl">
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <p className="text-sm">&copy; 2026 CampusConnect. All rights reserved.</p>
      <div className="flex gap-4 text-sm">
        <a href="#" className="transition hover:text-white">Privacy Policy</a>
        <a href="#" className="transition hover:text-white">Terms of Service</a>
        <a href="#" className="transition hover:text-white">Help Center</a>
      </div>
    </div>
  </footer>
</div>
      </div>
    </div>
  );
}