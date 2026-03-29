import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { GitMerge, Calendar, Clock, BookOpen, Users, CheckCircle, AlertCircle } from "lucide-react";

const MergeLectures = () => {
  const [formData, setFormData] = useState({
    subject: "",
    sectionA: "",
    sectionB: "",
    date: "",
    time: "",
    room: "",
    reason: "",
  });

  const [mergeList, setMergeList] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("mergeRequests")) || [];
    setMergeList(data);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      !formData.subject ||
      !formData.sectionA ||
      !formData.sectionB ||
      !formData.date ||
      !formData.time ||
      !formData.room ||
      !formData.reason
    ) {
      alert("Please fill full form first!");
      return;
    }

    const requests =
      JSON.parse(localStorage.getItem("mergeRequests")) || [];

    requests.push(formData);
    localStorage.setItem("mergeRequests", JSON.stringify(requests));
    setMergeList(requests);

    alert("Merge Request Sent to Admin!");

    setFormData({
      subject: "",
      sectionA: "",
      sectionB: "",
      date: "",
      time: "",
      room: "",
      reason: "",
    });
  };

  return (
    <div className="flex">


      {/* Background */}
      <div className="flex-1 min-h-screen p-8 bg-gradient-to-br from-pink-50 via-purple-50 to-gray-100">
        
        <div className="min-h-screen p-6 border border-purple-100 shadow-xl bg-white/80 backdrop-blur-xl rounded-3xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6"
          >
            <div className="flex items-center gap-3">
              <GitMerge className="text-purple-500" size={28} />
              <h1 className="text-2xl font-bold">
                Merge Lectures / Sections
              </h1>
            </div>

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
              className="w-16"
            />
          </motion.div>

          {/* Top Cards */}
          <div className="grid gap-6 mb-6 md:grid-cols-3">
            <motion.div whileHover={{ scale: 1.05 }} className="p-5 bg-white border border-purple-100 shadow-md rounded-2xl">
              <Users className="mb-2 text-purple-500" />
              <p className="text-gray-500">Total Requests</p>
              <h2 className="text-2xl font-bold">{mergeList.length}</h2>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="p-5 bg-white border border-green-100 shadow-md rounded-2xl">
              <CheckCircle className="mb-2 text-green-500" />
              <p className="text-gray-500">Approved</p>
              <h2 className="text-2xl font-bold">2</h2>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="p-5 bg-white border border-pink-100 shadow-md rounded-2xl">
              <AlertCircle className="mb-2 text-pink-500" />
              <p className="text-gray-500">Pending</p>
              <h2 className="text-2xl font-bold">{mergeList.length}</h2>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-6 p-6 mb-8 border border-purple-100 shadow-md bg-white/90 backdrop-blur rounded-2xl md:grid-cols-2"
          >

            <div>
              <label className="block mb-1 font-semibold">Subject</label>
              <div className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-purple-400">
                <BookOpen size={18} className="text-purple-500" />
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                >
                  <option value="">Select Subject</option>
                  <option>Data Structures</option>
                  <option>Operating System</option>
                  <option>DBMS</option>
                  <option>Computer Networks</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Section A</label>
              <select
                name="sectionA"
                value={formData.sectionA}
                onChange={handleChange}
                className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400"
              >
                <option value="">Select Section</option>
                <option>CSE-A</option>
                <option>CSE-B</option>
                <option>CSE-C</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Section B</label>
              <select
                name="sectionB"
                value={formData.sectionB}
                onChange={handleChange}
                className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400"
              >
                <option value="">Select Section</option>
                <option>CSE-A</option>
                <option>CSE-B</option>
                <option>CSE-C</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Date</label>
              <div className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-purple-400">
                <Calendar size={18} className="text-purple-500" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Time</label>
              <div className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-purple-400">
                <Clock size={18} className="text-purple-500" />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Room</label>
              <input
                type="text"
                name="room"
                value={formData.room}
                onChange={handleChange}
                className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 font-semibold">Reason</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400"
                rows="3"
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <button
                onClick={handleSubmit}
                className="w-full py-3 text-white transition shadow-lg rounded-xl hover:scale-105 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90"
              >
                Send Merge Request
              </button>
            </div>
          </motion.div>

          {/* Recent Requests */}
          <div className="p-6 border border-purple-100 shadow-md bg-white/90 backdrop-blur rounded-2xl">
            <h2 className="mb-4 text-lg font-bold">Recent Merge Requests</h2>

            {mergeList.length === 0 ? (
              <p className="text-gray-500">No merge requests yet.</p>
            ) : (
              <div className="space-y-3">
                {mergeList.map((item, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                    <p className="font-semibold">
                      {item.subject} ({item.sectionA} + {item.sectionB})
                    </p>
                    <p className="text-sm text-gray-600">
                      {item.date} | {item.time} | Room {item.room}
                    </p>
                    <p className="text-sm text-pink-500">Pending Approval</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MergeLectures;