import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const teachersData = [
  { name: "Dr. Sharma", subject: "Data Structures", room: "Room 101", status: "Available" },
  { name: "Prof. Mehta", subject: "Operating System", room: "Room 170", status: "In Class" },
  { name: "Ms. Verma", subject: "DBMS", room: "Lab 3", status: "Available" },
  { name: "Mr. Singh", subject: "Computer Networks", room: "Room 201", status: "On Leave" },
  { name: "Mrs. Gupta", subject: "Mathematics", room: "Room 105", status: "In Class" },
  { name: "Dr. Aggarwal", subject: "Artificial Intelligence", room: "Lab 5", status: "Available" },
  { name: "Prof. Bansal", subject: "Machine Learning", room: "Room 210", status: "In Class" },
  { name: "Ms. Kaur", subject: "Software Engineering", room: "Room 120", status: "Available" },
  { name: "Mr. Arora", subject: "Cyber Security", room: "Lab 2", status: "On Leave" },
  { name: "Mrs. Iyer", subject: "Cloud Computing", room: "Room 305", status: "Available" },
];

export default function TeacherAvailability() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTeachers = teachersData.filter((teacher) => {
    const matchesSearch = teacher.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || teacher.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex">
  

      <div className="flex-1 min-h-screen p-8 bg-gradient-to-br from-pink-50 via-purple-50 to-gray-100">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 mb-6 border border-purple-100 shadow-md bg-white/80 backdrop-blur-xl rounded-2xl"
        >
          <h1 className="text-3xl font-bold text-gray-800">👨‍🏫 Teacher Management</h1>
          <p className="text-gray-500">Track availability, subjects & live status</p>
        </motion.div>

        {/* Search + Filter */}
        <div className="flex flex-col gap-4 p-4 mb-6 border border-purple-100 shadow-md bg-white/80 backdrop-blur-xl rounded-xl md:flex-row md:items-center md:justify-between">
          <div className="flex items-center w-full gap-3">
            <Search className="text-purple-400" />
            <input
              type="text"
              placeholder="Search teacher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter("All")}
              className={`px-4 py-2 rounded-lg text-white ${
                statusFilter === "All"
                  ? "bg-gradient-to-r from-pink-500 to-purple-500"
                  : "bg-gray-400"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setStatusFilter("Available")}
              className={`px-4 py-2 rounded-lg text-white ${
                statusFilter === "Available"
                  ? "bg-green-500"
                  : "bg-green-300"
              }`}
            >
              Available
            </button>

            <button
              onClick={() => setStatusFilter("In Class")}
              className={`px-4 py-2 rounded-lg text-white ${
                statusFilter === "In Class"
                  ? "bg-blue-500"
                  : "bg-blue-300"
              }`}
            >
              In Class
            </button>

            <button
              onClick={() => setStatusFilter("On Leave")}
              className={`px-4 py-2 rounded-lg text-white ${
                statusFilter === "On Leave"
                  ? "bg-red-500"
                  : "bg-red-300"
              }`}
            >
              On Leave
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden border border-purple-100 shadow-md bg-white/80 backdrop-blur-xl rounded-2xl">
          <table className="w-full text-sm text-center">
            <thead className="text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
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
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="transition border-b hover:bg-purple-50"
                >
                  <td className="flex items-center justify-center gap-3 p-4">
                    <motion.img
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      src={`https://i.pravatar.cc/40?img=${i + 10}`}
                      className="border-2 border-purple-400 rounded-full shadow-md"
                    />
                    <span className="font-semibold">{teacher.name}</span>
                  </td>

                  <td className="p-4">{teacher.subject}</td>
                  <td className="p-4">{teacher.room}</td>

                  <td
                    className={`p-4 font-bold ${
                      teacher.status === "Available"
                        ? "text-green-500"
                        : teacher.status === "In Class"
                        ? "text-blue-500"
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

        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-4">
          {[
            { title: "Total Teachers", value: teachersData.length },
            { title: "Available", value: teachersData.filter(t=>t.status==='Available').length },
            { title: "In Class", value: teachersData.filter(t=>t.status==='In Class').length },
            { title: "On Leave", value: teachersData.filter(t=>t.status==='On Leave').length },
          ].map((card,i)=>(
            <motion.div
              key={i}
              whileHover={{ scale: 1.08 }}
              className="p-6 text-white shadow-lg rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
            >
              <h2 className="text-4xl font-bold">{card.value}</h2>
              <p className="mt-2">{card.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 mt-10 text-center text-gray-600 border border-purple-100 shadow-md bg-white/80 backdrop-blur-lg rounded-xl"
        >
          <p>© 2026 Smart Campus Dashboard</p>
          <p className="text-sm">Teacher Availability System</p>
        </motion.div>

      </div>
    </div>
  );
}