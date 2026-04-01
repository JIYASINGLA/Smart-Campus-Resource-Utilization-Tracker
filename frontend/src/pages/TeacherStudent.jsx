import React, { useState, useEffect } from "react";
import SidebarStudent from "../components/SidebarStudent";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function TeacherStudent() {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:5000/api/teachers")
      .then(res => res.json())
      .then(data => {
        console.log("Teachers:", data); // debug
        setTeachers(data);
      })
      .catch(err => console.error(err));
  }, []);

  // 🔥 FILTER LOGIC
  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || teacher.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // 🔥 FIX Tailwind dynamic class bug
  const colorMap = {
    "Available": "bg-green-600",
    "In Class": "bg-blue-600",
    "On Leave": "bg-red-600",
    "All": "bg-gray-600",
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarStudent />

      <div className="flex-1 p-8 overflow-auto bg-gradient-to-br from-blue-50 via-white to-green-50">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 mb-6 border shadow-2xl bg-white/60 backdrop-blur-xl rounded-2xl border-white/40"
        >
          <h1 className="text-3xl font-bold text-blue-700">👨‍🏫 Teacher Management</h1>
          <p className="text-gray-500">Track availability, subjects & live status</p>
        </motion.div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col gap-4 p-4 mb-6 border shadow-xl bg-white/60 backdrop-blur-lg rounded-xl border-white/40 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center w-full gap-3">
            <Search className="text-gray-400" />
            <input
              type="text"
              placeholder="Search teacher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </div>

          <div className="flex gap-2">
            {["All", "Available", "In Class", "On Leave"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-white ${
                  statusFilter === status
                    ? colorMap[status]
                    : "bg-gray-400"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden border shadow-2xl bg-white/60 backdrop-blur-xl rounded-2xl border-white/40">
          <table className="w-full text-sm text-center">
            <thead className="text-white bg-gradient-to-r from-blue-500 to-green-400">
              <tr>
                <th className="p-4">Teacher</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Room</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredTeachers.map((teacher, i) => (
                <motion.tr
                  key={teacher.teacher_id}
                  whileHover={{ scale: 1.02 }}
                  className="transition border-b hover:bg-white/50"
                >
                  <td className="flex items-center justify-center gap-3 p-4">
                    <motion.img
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      src={`https://i.pravatar.cc/40?img=${i + 10}`}
                      className="border-2 border-blue-400 rounded-full shadow-md"
                    />
                    <span className="font-semibold">{teacher.name}</span>
                  </td>

                  <td className="p-4">{teacher.subject}</td>

                  {/* 🔥 IMPORTANT: backend field */}
                  <td className="p-4">{teacher.assigned_room}</td>

                  <td
                    className={`p-4 font-bold ${
                      teacher.status === "Available"
                        ? "text-green-600"
                        : teacher.status === "In Class"
                        ? "text-blue-600"
                        : "text-red-500"
                    }`}
                  >
                    {teacher.status}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-4">
          {[
            {
              title: "Total Teachers",
              value: teachers.length,
              color: "from-blue-500 to-green-400",
            },
            {
              title: "Available",
              value: teachers.filter((t) => t.status === "Available").length,
              color: "from-green-500 to-emerald-400",
            },
            {
              title: "In Class",
              value: teachers.filter((t) => t.status === "In Class").length,
              color: "from-blue-500 to-cyan-400",
            },
            {
              title: "On Leave",
              value: teachers.filter((t) => t.status === "On Leave").length,
              color: "from-red-500 to-orange-400",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08 }}
              className={`p-6 text-white shadow-2xl rounded-2xl bg-gradient-to-r ${card.color} relative overflow-hidden`}
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute w-24 h-24 bg-white rounded-full opacity-20 -top-5 -right-5 blur-xl"
              />
              <h2 className="text-4xl font-bold">{card.value}</h2>
              <p className="mt-2">{card.title}</p>
            </motion.div>
          ))}
        </div>

        {/* FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 mt-10 text-center text-gray-600 shadow-lg bg-white/60 backdrop-blur-lg rounded-xl"
        >
          <p>© 2026 Smart Campus Dashboard | Developed by Student Project Team</p>
          <p className="text-sm">Teacher Availability Management System</p>
        </motion.div>
      </div>
    </div>
  );
}