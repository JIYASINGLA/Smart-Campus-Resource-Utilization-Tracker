import React, { useState, useEffect } from "react";
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

// Example timetable data for teachers (expanded for full week)
const timetableData = {
  "Dr. Sharma": [
    { day: "Monday", time: "09:00 - 10:30", class: "CS101-A", subject: "Data Structures", room: "Room 101", type: "Lecture" },
    { day: "Tuesday", time: "11:00 - 12:30", class: "CS101-B", subject: "Data Structures Lab", room: "Lab 1", type: "Lab" },
    { day: "Wednesday", time: "09:00 - 10:30", class: "CS101-A", subject: "Algorithms", room: "Room 101", type: "Lecture" },
    { day: "Thursday", time: "10:00 - 11:30", class: "CS101-C", subject: "Data Structures", room: "Room 102", type: "Lecture" },
    { day: "Friday", time: "01:00 - 02:30", class: "CS101-B", subject: "Lab Practice", room: "Lab 1", type: "Lab" },
  ],
  "Prof. Mehta": [
    { day: "Monday", time: "10:00 - 11:30", class: "CS201-A", subject: "Operating System", room: "Room 170", type: "Lecture" },
    { day: "Wednesday", time: "02:00 - 03:30", class: "CS201-B", subject: "OS Lab", room: "Lab 2", type: "Lab" },
    { day: "Friday", time: "11:00 - 12:30", class: "CS201-A", subject: "Operating System", room: "Room 170", type: "Lecture" },
  ],
  // Add other teachers here
};

// Type color mapping
const typeColors = {
  Lecture: "bg-green-500",
  Lab: "bg-blue-500",
  Tutorial: "bg-purple-500",
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function TeacherStudent() {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedTeacher, setSelectedTeacher] = useState(null);

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
                <th className="p-4">Actions</th>
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
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedTeacher({ name: teacher.name, index: i })}
                      className="px-3 py-1 text-sm font-semibold text-white bg-purple-500 rounded-lg hover:bg-purple-600"
                    >
                      View Timetable
                    </button>
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

        {/* ---------------- Weekly Timetable Modal ---------------- */}
{selectedTeacher && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/60 backdrop-blur-sm"
  >
    <motion.div
      initial={{ scale: 0.8, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-7xl h-[90vh] bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-2xl shadow-2xl flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <img
  src={`https://i.pravatar.cc/60?img=${selectedTeacher.index + 10}`}
  className="border-4 border-purple-400 rounded-full shadow-lg"
/>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedTeacher?.name}
            </h2>
            <p className="text-sm text-gray-500">
              Weekly Teaching Schedule
            </p>
          </div>
        </div>

        <button
          onClick={() => setSelectedTeacher(null)}
          className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
        >
          Close
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Legend */}
        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm">Lecture</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm">Lab</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-sm">Tutorial</span>
          </div>
        </div>

        {/* Timetable */}
        <div className="overflow-x-auto border rounded-xl">
          <table className="w-full text-sm border border-gray-300">
            <thead className="sticky top-0 text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              <tr>
                <th className="p-3 border">Time</th>
                {days.map((day, index) => (
                  <th key={day} className="p-3 border">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {["09:00 - 10:30","10:00 - 11:30","11:00 - 12:30","01:00 - 02:30","02:00 - 03:30"].map((slotTime, idx) => (
                <tr key={idx} className="text-center">
                  <td className="font-semibold border bg-gray-50">{slotTime}</td>
                  {days.map((day) => {
                    const classSlot = timetableData[selectedTeacher?.name]?.find(
                      (s) => s.day === day && s.time === slotTime
                    );
                    return (
                      <td key={day} className="border p-2 h-[90px]">
                        {classSlot ? (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className={`${typeColors[classSlot.type]} text-white p-2 rounded-lg shadow-md`}
                          >
                            <p className="font-semibold">{classSlot.subject}</p>
                            <p className="text-xs">{classSlot.class}</p>
                            <p className="text-xs">{classSlot.room}</p>
                            <p className="italic text-[10px]">{classSlot.type}</p>
                          </motion.div>
                        ) : (
                          <p className="text-xs text-gray-400">Free</p>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="p-4 text-center text-white bg-green-500 rounded-xl">
            <p className="text-xl font-bold">
              {timetableData[selectedTeacher?.name]?.filter(t=>t.type==="Lecture").length || 0}
            </p>
            <p className="text-sm">Lectures</p>
          </div>

          <div className="p-4 text-center text-white bg-blue-500 rounded-xl">
            <p className="text-xl font-bold">
              {timetableData[selectedTeacher?.name]?.filter(t=>t.type==="Lab").length || 0}
            </p>
            <p className="text-sm">Labs</p>
          </div>

          <div className="p-4 text-center text-white bg-purple-500 rounded-xl">
            <p className="text-xl font-bold">
              {timetableData[selectedTeacher?.name]?.length || 0}
            </p>
            <p className="text-sm">Total Classes</p>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
)}
      </div>
    </div>
  );
}