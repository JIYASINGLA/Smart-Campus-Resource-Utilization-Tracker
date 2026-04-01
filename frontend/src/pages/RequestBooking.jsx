import React, { useState } from "react";
const departments = [
  "Computer Science",
  "Electronics",
  "Mechanical",
  "Civil",
  "Electrical",
  "Law",
  "Business Administration",
  "Mathematics",
];
const rooms = [
  "Room 101",
  "Room 102",
  "Room 201",
  "Lab A",
  "Lab B",
  "Auditorium",
  "Seminar Hall 1",
  "Seminar Hall 2",
];

const RequestBooking = () => {
  const [formData, setFormData] = useState({
    department: "",
    room: "",
    date: "",
    startTime: "",
    endTime: "",
    purpose: "",
    requesterName: "",
    requesterDept: "",
  });

  // ✅ ADDED error state (NEW)
  const [error, setError] = useState("");

  // ✅ Handle change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // ✅ Clear error when user starts typing
    setError("");
  };

  // ✅ Clear form
  const handleClear = () => {
    setFormData({
      department: "",
      room: "",
      date: "",
      startTime: "",
      endTime: "",
      purpose: "",
      requesterName: "",
      requesterDept: "",
    });

    setError(""); // clear error also
  };

  // ✅ UPDATED Submit form with validation
  const handleSubmit = async () => {
  const {
    department,
    room,
    date,
    startTime,
    endTime,
    purpose,
    requesterName,
    requesterDept,
  } = formData;

  if (
    !department ||
    !room ||
    !date ||
    !startTime ||
    !endTime ||
    !purpose ||
    !requesterName ||
    !requesterDept
  ) {
    setError("Please fill all fields before submitting.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Failed to submit booking");

    const data = await response.json();
    alert(data.message); // "Booking submitted successfully"
    handleClear();
  } catch (err) {
    console.error(err);
    setError("Error submitting booking. Try again later.");
  }
};

  return (
    <div className="flex-1 min-h-screen p-10 bg-gray-50">

      {/* Page Title */}
      <h1 className="mb-2 text-3xl font-bold">
        Request Resource Booking
      </h1>
      <p className="mb-4 text-gray-500">
        Submit a reservation request for classrooms, laboratories, or seminar halls
      </p>

      {/* ✅ ADDED Error Message Display (NEW) */}
      {error && (
        <div className="p-3 mb-6 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg">
          {error}
        </div>
      )}

      {/* ================= Resource Details ================= */}
      <div className="p-6 mb-6 border border-purple-100 shadow-md bg-white/80 backdrop-blur rounded-xl">
        <h2 className="mb-4 text-lg font-semibold">Resource Details</h2>

        <div className="grid grid-cols-3 gap-6">

          {/* Department Dropdown */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
            >
              <option value="">Select Department</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Room Dropdown */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Room Number
            </label>
            <select
              name="room"
              value={formData.room}
              onChange={handleChange}
              className="w-full p-2 bg-gray-100 border rounded-lg"
            >
              <option value="">Select Room</option>
              {rooms.map((room, index) => (
                <option key={index} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </div>

          {/* Check Status Button */}
<div className="flex flex-col justify-end">
  <button
    onClick={async () => {
      if (!formData.department || !formData.room || !formData.date) {
        setError("Please select Department, Room, and Date to check status.");
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:5000/bookings?room=${formData.room}&date=${formData.date}`
        );
        const bookings = await res.json();

        if (bookings.length > 0) {
          alert(`${formData.room} is already booked on ${formData.date}.`);
        } else {
          alert(`${formData.room} is available on ${formData.date}.`);
        }
      } catch (err) {
        console.error(err);
        setError("Error checking status. Try again later.");
      }
    }}
    className="px-4 py-2 border border-purple-200 rounded-lg bg-gradient-to-r from-pink-100 to-purple-100 hover:opacity-90"
  >
    Check Status
  </button>

  {/* Status message below button */}
  {formData.room && formData.date && (
    <p className="mt-1 text-sm text-gray-600">
      Selected Room: <span className="font-medium">{formData.room}</span> on{" "}
      <span className="font-medium">{formData.date}</span>
    </p>
  )}
</div>

        </div>
      </div>

      {/* ================= Schedule & Timing ================= */}
      <div className="p-6 mb-6 bg-white border shadow-sm rounded-xl">
        <h2 className="mb-4 text-lg font-semibold">
          Schedule & Timing
        </h2>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Booking Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 bg-gray-100 border rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full p-2 bg-gray-100 border rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              End Time
            </label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full p-2 bg-gray-100 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* ================= Supporting Information ================= */}
      <div className="p-6 mb-6 bg-white border shadow-sm rounded-xl">
        <h2 className="mb-4 text-lg font-semibold">
          Supporting Information
        </h2>

        <label className="block mb-2 text-sm font-medium">
          Purpose of booking
        </label>
        <input
          type="text"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          placeholder="e.g., guest lecture, research meeting etc."
          className="w-full p-2 mb-6 bg-gray-100 border rounded-lg"
        />

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Requester Name
            </label>
            <input
              type="text"
              name="requesterName"
              value={formData.requesterName}
              onChange={handleChange}
              placeholder="e.g., Prof. ABC"
              className="w-full p-2 bg-gray-100 border rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Department
            </label>
            <input
              type="text"
              name="requesterDept"
              value={formData.requesterDept}
              onChange={handleChange}
              placeholder="e.g., Computer Science"
              className="w-full p-2 bg-gray-100 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* ================= Buttons ================= */}
      <div className="flex justify-end gap-4">
        <button
          onClick={handleClear}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-purple-50"
        >
          Clear Form
        </button>

        <button
          onClick={handleSubmit}
          className="px-6 py-2 text-white transition shadow-lg rounded-xl hover:scale-105 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90"
        >
          Submit Booking Request
        </button>
      </div>

    </div>
  );
};

export default RequestBooking;