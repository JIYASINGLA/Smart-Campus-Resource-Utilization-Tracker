import { useState } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import {
  Calendar,
  MoreVertical,
  BookOpen,
  FlaskConical,
  Users,
  Monitor,
  ArrowUpRight,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion"; // ✅ Import Framer Motion

// 🔥 FULL DATA PER DEPARTMENT
const departmentData = {
  CSE: { classrooms: 24, labs: 12, faculty: 48, occupancy: 72 },
  Medical: { classrooms: 18, labs: 10, faculty: 35, occupancy: 65 },
  Pharmacy: { classrooms: 15, labs: 8, faculty: 28, occupancy: 58 },
};

// BOOKINGS
const bookings = [
  { room: "Lab-04", name: "Prof. Sato", purpose: "AI Workshop", time: "Tomorrow, 10:00" },
  { room: "Room 102", name: "Dr. Miller", purpose: "Staff Meeting", time: "Tomorrow, 14:00" },
  { room: "Lab-01", name: "Student Org", purpose: "Hackathon Prep", time: "Wed, 09:00" },
  { room: "Room 305", name: "Dr. Chen", purpose: "Guest Lecture", time: "Wed, 11:30" },
];

export default function Department() {
  const [selectedDept, setSelectedDept] = useState("CSE");
  const data = departmentData[selectedDept];

  const pieData = [
    { name: "Used", value: data.occupancy },
    { name: "Free", value: 100 - data.occupancy },
  ];

  const COLORS = ["#3b82f6", "#e5e7eb"];

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarAdmin />

      <div className="flex-1 p-6 overflow-y-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-400">Departments</p>
            <h1 className="text-3xl font-bold">Department Dashboard</h1>
            <p className="text-gray-500">Resource utilization for {selectedDept} Department</p>
          </div>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-4 py-2 bg-white border rounded-lg shadow-sm"
          >
            <option value="CSE">Computer Science</option>
            <option value="Medical">Medical</option>
            <option value="Pharmacy">Pharmacy</option>
          </select>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <StatCard icon={<BookOpen />} title="Total Classrooms" value={data.classrooms} />
          <StatCard icon={<FlaskConical />} title="Total Labs" value={data.labs} />
          <StatCard icon={<Users />} title="Active Faculty" value={data.faculty} />
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-3">

          {/* LEFT SIDE */}
          <div className="space-y-6 lg:col-span-2">

            {/* LIVE OCCUPANCY */}
            <div className="p-5 bg-white shadow-sm rounded-2xl">
              <h3 className="mb-4 font-semibold">Live Occupancy</h3>
              <div className="flex items-center gap-6">
                <div className="w-40 h-40">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={pieData} innerRadius={50} outerRadius={70} dataKey="value">
                        {pieData.map((entry, index) => (
                          <Cell key={index} fill={COLORS[index]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="w-full space-y-2">
                  <Bar label="Classrooms" value={Math.floor(data.classrooms * 0.75)} total={data.classrooms} />
                  <Bar label="Laboratories" value={Math.floor(data.labs * 0.8)} total={data.labs} />
                  <p className="mt-3 text-sm text-gray-400">Peak Hours (10 AM - 2 PM)</p>
                  <p className="text-xl font-bold">{data.occupancy}%</p>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS with Framer Motion */}
            <div className="p-5 bg-white shadow-sm rounded-2xl">
              <h3 className="mb-4 font-semibold">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <ActionCard icon={<Calendar />} title="Book Room" />
                <ActionCard icon={<Users />} title="Faculty Sync" />
                <ActionCard icon={<Monitor />} title="Lab Access" />
                <ActionCard icon={<ArrowUpRight />} title="Usage Report" />
              </div>
            </div>

            {/* BOOKINGS */}
            <div className="p-5 bg-white shadow-sm rounded-2xl">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-semibold">📅 Upcoming Bookings</h3>
                <span className="text-sm text-blue-500 cursor-pointer">View All</span>
              </div>

              <table className="w-full text-left border-collapse table-auto">
                <thead>
                  <tr className="text-gray-600 bg-blue-50">
                    <th className="px-4 py-2 rounded-l-lg">Room 🏢</th>
                    <th className="px-4 py-2">Reserved By 👤</th>
                    <th className="px-4 py-2">Purpose 📌</th>
                    <th className="px-4 py-2">Time 🕒</th>
                    <th className="px-4 py-2 rounded-r-lg">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, i) => (
                    <tr
                      key={i}
                      className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50`}
                    >
                      <td className="px-4 py-2 font-medium">{b.room}</td>
                      <td className="px-4 py-2">{b.name}</td>
                      <td className="px-4 py-2">{b.purpose}</td>
                      <td className="px-4 py-2">{b.time}</td>
                      <td className="px-4 py-2 text-center">
                        <MoreVertical size={18} className="text-gray-400 cursor-pointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            {/* TODAY SCHEDULE */}
            <div className="p-5 bg-white shadow-sm rounded-2xl">
              <h3 className="mb-4 font-semibold">Today's Schedule</h3>
              <ScheduleCard time="09:00" title="Data Structures" status="Ongoing" />
              <ScheduleCard time="11:00" title="Operating Systems" status="Upcoming" />
              <ScheduleCard time="14:00" title="Cloud Computing Lab" status="Upcoming" />
              <ScheduleCard time="16:00" title="Ethics in AI" status="Upcoming" />
            </div>

            {/* ALERTS */}
            <div className="p-5 bg-white shadow-sm rounded-2xl">
              <h3 className="mb-4 font-semibold">Resource Alerts</h3>
              <div className="p-3 mb-3 text-red-600 bg-red-100 rounded-lg">⚠️ Lab-02 Maintenance</div>
              <div className="p-3 text-yellow-600 bg-yellow-100 rounded-lg">⚠️ Over-capacity Warning</div>
            </div>

            {/* QUICK NOTIFICATIONS */}
            <div className="p-5 bg-white shadow-sm rounded-2xl">
              <h3 className="mb-4 font-semibold">🔔 Quick Notifications</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>📩 New feedback submitted by students</li>
                <li>🛠️ Lab-03 cleaning scheduled</li>
                <li>📊 Monthly report ready for review</li>
                <li>💡 New seminar request from Faculty</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */
const StatCard = ({ icon, title, value }) => (
  <div className="flex justify-between p-5 bg-white shadow-sm rounded-2xl">
    <div>
      <p className="text-gray-400">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
    <div className="text-blue-500">{icon}</div>
  </div>
);

// ✅ ActionCard with Framer Motion animation
const ActionCard = ({ icon, title }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex flex-col items-center justify-center p-5 transition-all duration-300 bg-white border border-dashed shadow cursor-pointer rounded-xl hover:shadow-lg"
  >
    <div className="text-blue-500">{icon}</div>
    <p className="mt-2 text-sm font-medium">{title}</p>
  </motion.div>
);

const ScheduleCard = ({ time, title, status }) => (
  <div className="flex justify-between p-3 mb-2 border rounded-lg">
    <div>
      <p className="text-xs text-gray-400">{time}</p>
      <p className="font-medium">{title}</p>
    </div>
    <span
      className={`px-2 py-1 text-xs rounded-full ${
        status === "Ongoing" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
      }`}
    >
      {status}
    </span>
  </div>
);

const Bar = ({ label, value, total }) => (
  <div>
    <div className="flex justify-between text-sm">
      <span>{label}</span>
      <span>{value}/{total}</span>
    </div>
    <div className="w-full h-2 bg-gray-200 rounded-full">
      <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${(value / total) * 100}%` }} />
    </div>
  </div>
);