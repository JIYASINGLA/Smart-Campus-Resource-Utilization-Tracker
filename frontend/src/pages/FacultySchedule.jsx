import React from "react";
import Sidebar from "../components/Sidebar";
import { Bell, BookOpen, ClipboardList, Clock } from "lucide-react";
import { motion } from "framer-motion";

/* ---------------- TODAY TIMELINE ---------------- */
const todaySchedule = [
  {
    time: "09:00 AM",
    subject: "Advanced Software Engineering",
    room: "Room 402 - Main Block",
    students: 45,
    status: "Completed",
  },
  {
    time: "11:30 AM",
    subject: "Discrete Mathematics",
    room: "Lab 12 - Tech Center",
    students: 38,
    status: "Ongoing",
  },
  {
    time: "02:00 PM",
    subject: "Research Seminar",
    room: "Conference Hall B",
    students: 12,
    status: "Upcoming",
  },
  {
    time: "04:30 PM",
    subject: "Faculty Meeting",
    room: "Dean Office",
    students: 8,
    status: "Upcoming",
  },
];

/* ---------------- APPROVALS ---------------- */
const approvals = [
  { title: "Student Union", desc: "Auditorium booking for Tech Fest" },
  { title: "Dr. Sarah Jenkins", desc: "Merge lecture request" },
  { title: "Robotics Club", desc: "Lab booking request" },
];

/* ---------------- NOTIFICATIONS ---------------- */
const notifications = [
  "Room 203 maintenance completed",
  "Lecture merge approved",
  "Exam schedule updated",
  "New message from Admin",
];

const FacultySchedule = () => {
  const [filter, setFilter] = React.useState("All");
  const [notes, setNotes] = React.useState("");
  const [facultyName, setFacultyName] = React.useState("Faculty");

React.useEffect(() => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user) {
    setFacultyName(user.name);
  }

  const savedNotes = localStorage.getItem("teacherNotes");
  if (savedNotes) setNotes(savedNotes);
}, []);

  /* Save Notes */
  const saveNotes = () => {
    localStorage.setItem("teacherNotes", notes);
    alert("Notes Saved Successfully!");
  };

  /* Greeting Function */
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  /* Current Date */
  const todayDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  /* Filter Logic */
  const filteredSchedule = todaySchedule.filter((cls) => {
    if (filter === "All") return true;
    if (filter === "Next") return cls.status === "Ongoing";
    return cls.status === filter;
  });

  return (
    <div className="flex">


      {/* BACKGROUND */}
      <div
        className="flex-1 min-h-screen p-8"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(99,102,241,0.2), rgba(255,255,255,0.9)), url('https://images.unsplash.com/photo-1520763185298-1b434c919102')",
          backgroundSize: "cover",
        }}
      >
        <div className="min-h-screen p-6 bg-white/80 backdrop-blur-md rounded-3xl">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h1 className="text-2xl font-bold">
                {getGreeting()}, {facultyName} 👋
              </h1>
              <p className="text-gray-500">{todayDate}</p>
            </div>
          </motion.div>

          {/* KPI CARDS */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="p-5 bg-white shadow rounded-2xl">
              <div className="flex justify-between">
                <h3 className="text-gray-500">Classes Today</h3>
                <BookOpen className="text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold">4</h2>
            </div>

            <div className="p-5 bg-white shadow rounded-2xl">
              <div className="flex justify-between">
                <h3 className="text-gray-500">Approvals</h3>
                <ClipboardList className="text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold">3</h2>
            </div>

            <div className="p-5 bg-white shadow rounded-2xl">
              <div className="flex justify-between">
                <h3 className="text-gray-500">Notifications</h3>
                <Bell className="text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold">12</h2>
            </div>

            <div className="p-5 bg-white shadow rounded-2xl">
              <div className="flex justify-between">
                <h3 className="text-gray-500">Weekly Load</h3>
                <Clock className="text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold">18 hrs</h2>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="grid items-start gap-6 lg:grid-cols-3">

            {/* LEFT SIDE */}
            <div className="space-y-6 lg:col-span-2">

              {/* TODAY TIMETABLE */}
              <div className="p-6 bg-white shadow rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Today’s Timetable</h2>

                  <div className="flex gap-2">
                    {["All", "Completed", "Ongoing", "Upcoming", "Next"].map((btn) => (
                      <button
                        key={btn}
                        onClick={() => setFilter(btn)}
                        className={`px-3 py-1 text-xs rounded-full border ${
                          filter === btn
                            ? "bg-indigo-600 text-white"
                            : "bg-white text-gray-600"
                        }`}
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  {filteredSchedule.map((cls) => (
                    <motion.div
                      key={cls.time}
                      whileHover={{ scale: 1.02 }}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                        <div className="w-[2px] h-16 bg-gray-300"></div>
                      </div>

                      <div className="flex-1 p-4 border rounded-xl">
                        <p className="text-sm text-indigo-500">{cls.time}</p>
                        <h3 className="font-semibold">{cls.subject}</h3>
                        <p className="text-sm text-gray-500">
                          {cls.room} • {cls.students} Students
                        </p>

                        <span className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                          cls.status === "Completed"
                            ? "bg-green-100 text-green-600"
                            : cls.status === "Ongoing"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-orange-100 text-orange-500"
                        }`}>
                          {cls.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* TEACHER NOTES */}
              <div className="p-6 bg-white shadow rounded-2xl">
                <h2 className="mb-3 text-lg font-semibold">Teacher Notes</h2>

                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write your notes, reminders, lecture points here..."
                  className="w-full p-3 border rounded-xl"
                  rows="4"
                ></textarea>

                <button
                  onClick={saveNotes}
                  className="px-4 py-2 mt-3 text-white bg-indigo-600 rounded-lg"
                >
                  Save Notes
                </button>
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">

              <div className="p-5 text-white bg-indigo-600 shadow rounded-2xl">
                <h3 className="font-semibold">Next Class</h3>
                <p className="text-lg">Discrete Mathematics</p>
                <p className="text-sm opacity-80">11:30 AM • Lab 12</p>
              </div>

              <div className="p-5 bg-white shadow rounded-2xl">
                <h3 className="mb-2 font-semibold">Weekly Progress</h3>
                <div className="w-full h-3 bg-gray-200 rounded-full">
                  <div className="w-3/4 h-3 bg-indigo-500 rounded-full"></div>
                </div>
              </div>

              {/* Approvals */}
              <div className="p-5 bg-white shadow rounded-2xl">
                <h2 className="mb-3 font-semibold">Approvals</h2>
                {approvals.map((item, i) => (
                  <div key={i} className="p-3 mb-3 border rounded-lg">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Notifications */}
              <div className="p-5 bg-white shadow rounded-2xl">
                <h2 className="mb-3 font-semibold">Notifications</h2>
                {notifications.map((note, i) => (
                  <div key={i} className="py-2 text-sm border-b">
                    {note}
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-10 text-center text-gray-500">
            © 2026 Smart Campus ERP • Faculty Dashboard
          </div>

        </div>
      </div>
    </div>
  );
};

export default FacultySchedule;