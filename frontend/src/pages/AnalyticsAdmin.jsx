import { useState, useEffect, useRef } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  BarChart, Bar, ResponsiveContainer, CartesianGrid
} from "recharts";
import { Calendar, Download } from "lucide-react";


// DATA
const rooms = [
  { id: "L-101", type: "Lab" },
  { id: "C-204", type: "Classroom" },
  { id: "C-105", type: "Classroom" },
  { id: "C-312", type: "Classroom" },
  { id: "L-501", type: "Lab" },
];

const hours = Array.from({ length: 12 }, (_, i) => 8 + i);

// HEATMAP GENERATOR
const generateHeatmapData = () => {
  return rooms.map((room) => {
    const usage = {};
    hours.forEach((h) => {
      usage[h] = Math.floor(Math.random() * 100);
    });
    return { ...room, usage };
  });
};

// CHART DATA
const lineData = [
  { day: "Mon", value: 70 },
  { day: "Tue", value: 85 },
  { day: "Wed", value: 95 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 60 },
  { day: "Sat", value: 30 },
  { day: "Sun", value: 15 },
];

const barData = [
  { name: "CS", value: 90 },
  { name: "Physics", value: 70 },
  { name: "Arts", value: 45 },
  { name: "Bio", value: 80 },
];

export default function AnalyticsAdmin() {
  const [heatmapData, setHeatmapData] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [department, setDepartment] = useState("Engineering Block");
  const [startDate, setStartDate] = useState("2023-10-12");
  const [endDate, setEndDate] = useState("2023-10-19");



  useEffect(() => {
    setHeatmapData(generateHeatmapData());
  }, [toggle, department]);

  // HEATMAP COLORS
  const getColor = (val) => {
    if (val <= 30) return "bg-gray-100 text-gray-400";
    if (val <= 60) return "bg-blue-100 text-blue-500";
    if (val <= 85) return "bg-blue-400 text-white";
    return "bg-red-400 text-white";
  };

  

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarAdmin />

      {/* MAIN */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div>

          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Heatmap Analytics</h1>
              <p className="text-gray-500">
                Strategic overview of spatial utilization.
              </p>
            </div>

            <div className="flex items-center gap-3">

              {/* DATE */}
              <div className="flex gap-2 p-2 bg-white border rounded-lg">
                <Calendar size={16} />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <span>-</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              {/* DEPARTMENT */}
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="px-3 py-2 bg-white border rounded-lg"
              >
                <option>Engineering Block</option>
                <option>Medical Block</option>
                <option>Pharmacy Block</option>
              </select>

              
            </div>
          </div>

          {/* TOGGLE */}
          <div className="flex items-center gap-4 p-4 mb-4 bg-white shadow-sm rounded-xl">
            <div
              onClick={() => setToggle(!toggle)}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
                toggle ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow transform duration-300 ${
                  toggle ? "translate-x-6" : ""
                }`}
              />
            </div>

            <span className="font-medium">Live Occupancy</span>

            <div className="flex gap-4 ml-6 text-sm">
              <span>0-30%</span>
              <span className="text-blue-400">31-60%</span>
              <span className="text-blue-600">61-85%</span>
              <span className="text-red-400">86-100%</span>
            </div>
          </div>

          {/* HEATMAP */}
          <div className="p-4 overflow-x-auto bg-white shadow-sm rounded-2xl">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="p-2 text-left">Room</th>
                  {hours.map((h) => (
                    <th key={h}>{h}:00</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {heatmapData.map((room) => (
                  <tr key={room.id}>
                    <td className="py-2 font-semibold">
                      {room.id}
                      <div className="text-xs text-gray-400">{room.type}</div>
                    </td>

                    {hours.map((h) => (
                      <td key={h} className="p-1">
                        <div className={`rounded-lg py-2 text-center ${getColor(room.usage[h])}`}>
                          {room.usage[h]}%
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* INSIGHTS */}
          <div className="grid gap-4 mt-6 md:grid-cols-3">
            <Card title="Capacity Risk" value="C-105 (Critical)" color="text-red-500" />
            <Card title="Optimization Win" value="+14%" color="text-green-500" />
            <Card title="Avg. Dwell Time" value="52 mins" color="text-blue-500" />
          </div>

          {/* CHARTS */}
          <div className="grid gap-6 mt-6 md:grid-cols-2">

            <div className="p-5 bg-white shadow-sm rounded-2xl">
              <h3 className="mb-3 font-semibold">Weekly Forecast</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="value" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="p-5 bg-white shadow-sm rounded-2xl">
              <h3 className="mb-3 font-semibold">Efficiency Score</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

// CARD
const Card = ({ title, value, color }) => (
  <motion.div className="p-4 bg-white shadow-sm rounded-2xl">
    <p className="text-gray-400">{title}</p>
    <p className={`text-lg font-semibold ${color}`}>{value}</p>
  </motion.div>
);