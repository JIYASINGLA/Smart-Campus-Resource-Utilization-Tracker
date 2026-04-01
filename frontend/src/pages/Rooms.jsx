import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SidebarStudent from "../components/SidebarStudent";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [capacityFilter, setCapacityFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [equipmentFilter, setEquipmentFilter] = useState("All");
  const [expressOnly, setExpressOnly] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/rooms")
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(err => console.error(err));
  }, []);

  const filteredRooms = rooms.filter((room) => {
    const isAvailable = room.current_occupancy < room.capacity;

    return (
      room.room_number.toLowerCase().includes(search.toLowerCase()) &&
      (capacityFilter === "All" || room.capacity >= Number(capacityFilter)) &&
      (departmentFilter === "All" || room.department_name === departmentFilter) &&
      (!expressOnly || isAvailable)
    );
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-green-100">

      <SidebarStudent />

      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-700">Room Listing</h1>
            <p className="text-gray-500">
              Manage and explore all campus facilities
            </p>
          </div>

          <div className="flex gap-3">
            <input
              type="date"
              className="px-4 py-2 border rounded-lg"
              onChange={(e) => setSelectedDate(e.target.value)}
            />

            <button
              onClick={() => setExpressOnly(!expressOnly)}
              className="px-4 py-2 text-white rounded-lg bg-gradient-to-r from-blue-500 to-green-400"
            >
              Express Booking
            </button>
          </div>
        </div>

        {/* FILTER BOX */}
        <div className="p-4 mb-6 shadow bg-white/70 backdrop-blur-lg rounded-xl">
          <h2 className="mb-3 font-semibold text-blue-700">Directory Filters</h2>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search room no."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48 p-2 border rounded"
            />

            <select
              className="p-2 border rounded"
              onChange={(e) => setCapacityFilter(e.target.value)}
            >
              <option value="All">All Capacities</option>
              <option value="40">40+</option>
              <option value="60">60+</option>
              <option value="80">80+</option>
            </select>

            <select
              className="p-2 border rounded"
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="All">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
            </select>

            <select
              className="p-2 border rounded"
              onChange={(e) => setEquipmentFilter(e.target.value)}
            >
              <option value="All">Equipment</option>
              <option value="Projector">Projector</option>
              <option value="AC">AC</option>
            </select>
          </div>
        </div>

        {/* ROOMS GRID */}
        <div className="grid grid-cols-3 gap-6">
          {filteredRooms.map((room, index) => {

            const occupancyPercent = Math.floor(
              (room.current_occupancy / room.capacity) * 100
            );

            const isAvailable = room.current_occupancy < room.capacity;

            return (
              <motion.div
                key={room.room_id}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border shadow-lg bg-white/70 backdrop-blur-lg rounded-2xl border-white/40"
              >
                <img
                  src="https://cdn.pixabay.com/photo/2016/12/15/20/28/classroom-1910011_1280.jpg"
                  className="object-cover w-full h-32 mb-3 rounded-lg"
                />

                <h2 className="text-xl font-bold">
                  Room {room.room_number}
                </h2>

                <p className={isAvailable ? "text-green-600" : "text-red-500"}>
                  {isAvailable ? "Available" : "Full"}
                </p>

                <p className="text-sm text-gray-500">
                  {room.department_name}
                </p>

                <div className="mt-2 text-sm">
                  {room.capacity} Capacity
                </div>

                {/* Occupancy */}
                <div className="w-full h-2 mt-1 bg-gray-200 rounded">
                  <div
                    className="h-2 rounded bg-gradient-to-r from-blue-500 to-green-400"
                    style={{ width: `${occupancyPercent}%` }}
                  ></div>
                </div>

                <p className="text-xs text-gray-500">
                  {occupancyPercent}% Occupied
                </p>

                <div className="flex gap-2 mt-3 text-xs">
                  <span className="px-2 py-1 bg-gray-200 rounded">
                    {room.room_type}
                  </span>
                </div>

                <div className="flex gap-1 mt-3">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded ${
                        i < Math.floor(occupancyPercent / 12)
                          ? "bg-red-300"
                          : "bg-gray-200"
                      }`}
                    ></div>
                  ))}
                </div>

                <div className="mt-2 text-xs text-gray-500">
                  Next: 2:00 PM - Advanced A
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* LOAD MORE */}
        <div className="mt-8 text-center">
          <p className="mb-3 text-gray-600">
            Showing {filteredRooms.length} rooms available
          </p>

          <button className="px-6 py-2 bg-white border rounded shadow">
            Load More Rooms
          </button>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="p-4 bg-white border-l w-72">
        <h2 className="mb-3 font-bold text-blue-700">Live Highlights</h2>

        <div className="flex justify-between mb-3">
          <div className="w-20 p-2 text-center bg-gray-100 rounded">
            <p className="font-bold">
              {rooms.filter(r => r.current_occupancy < r.capacity).length}
            </p>
            <p className="text-xs">Available</p>
          </div>

          <div className="w-20 p-2 text-center bg-gray-100 rounded">
            <p className="font-bold">{rooms.length}</p>
            <p className="text-xs">Total Rooms</p>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <p>Room booked</p>
          <p>2:00 PM</p>
        </div>

        <div className="p-3 mt-4 text-sm text-blue-800 rounded bg-gradient-to-r from-blue-100 to-green-100">
          Booking for interactive labs requires approval
        </div>
      </div>
    </div>
  );
}