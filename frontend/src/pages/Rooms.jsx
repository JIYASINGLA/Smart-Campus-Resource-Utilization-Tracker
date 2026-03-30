import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SidebarStudent from "../components/SidebarStudent";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [displayedRooms, setDisplayedRooms] = useState([]); // Rooms currently displayed
  const [displayCount, setDisplayCount] = useState(6); // Initial number of rooms

  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [capacityFilter, setCapacityFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [equipmentFilter, setEquipmentFilter] = useState("All");
  const [expressOnly, setExpressOnly] = useState(false);

  // Full rooms data
  useEffect(() => {
    const allRooms = [
      { id: 1, name: "L-402", capacity: 45, available: true, department: "CSE", equipment: "Projector" },
      { id: 2, name: "L-403", capacity: 60, available: false, department: "IT", equipment: "AC" },
      { id: 3, name: "L-404", capacity: 50, available: true, department: "ECE", equipment: "Projector" },
      { id: 4, name: "L-405", capacity: 70, available: true, department: "CSE", equipment: "AC" },
      { id: 5, name: "L-406", capacity: 80, available: true, department: "IT", equipment: "Projector" },
      { id: 6, name: "L-407", capacity: 40, available: true, department: "ECE", equipment: "AC" },
      { id: 7, name: "L-408", capacity: 55, available: false, department: "CSE", equipment: "Projector" },
      { id: 8, name: "L-409", capacity: 35, available: true, department: "IT", equipment: "AC" },
      { id: 9, name: "L-410", capacity: 65, available: true, department: "ECE", equipment: "Projector" },
      { id: 10, name: "L-411", capacity: 45, available: true, department: "CSE", equipment: "AC" },
      { id: 11, name: "L-412", capacity: 70, available: false, department: "IT", equipment: "Projector" },
      { id: 12, name: "L-413", capacity: 50, available: true, department: "ECE", equipment: "AC" },
    ];

    setRooms(allRooms);
    setDisplayedRooms(allRooms.slice(0, displayCount));
  }, []);

  // Filtered rooms
  const filteredRooms = displayedRooms.filter((room) => {
    return (
      room.name.toLowerCase().includes(search.toLowerCase()) &&
      (capacityFilter === "All" || room.capacity >= capacityFilter) &&
      (departmentFilter === "All" || room.department === departmentFilter) &&
      (equipmentFilter === "All" || room.equipment === equipmentFilter) &&
      (!expressOnly || room.available === true)
    );
  });

  // Load more rooms
  const loadMoreRooms = () => {
    const nextCount = displayCount + 3; // Load 3 more rooms each click
    setDisplayedRooms(rooms.slice(0, nextCount));
    setDisplayCount(nextCount);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-green-100">
      <SidebarStudent />

      <div className="flex-1 p-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-700">Room Listing</h1>
            <p className="text-gray-500">Manage and explore all campus facilities</p>
          </div>

          <div className="flex gap-3">
            

            
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
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
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
            const occupancy = Math.floor(Math.random() * 90) + 10;
            return (
              <motion.div
                key={room.id}
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

                <h2 className="text-xl font-bold">Room {room.name}</h2>
                <p className={room.available ? "text-green-600" : "text-red-500"}>
                  {room.available ? "Available" : "Busy"}
                </p>
                <p className="text-sm text-gray-500">{room.department} Department</p>
                <div className="mt-2 text-sm">{room.capacity} Capacity</div>

                {/* Occupancy Bar */}
                <div className="w-full h-2 mt-1 bg-gray-200 rounded">
                  <div
                    className="h-2 rounded bg-gradient-to-r from-blue-500 to-green-400"
                    style={{ width: `${occupancy}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">{occupancy}% Occupied</p>

                <div className="flex gap-2 mt-3 text-xs">
                  <span className="px-2 py-1 bg-gray-200 rounded">{room.equipment}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* LOAD MORE BUTTON */}
        {displayedRooms.length < rooms.length && (
          <div className="mt-8 text-center">
            <button
              onClick={loadMoreRooms}
              className="px-6 py-2 bg-white border rounded shadow"
            >
              Load More Rooms
            </button>
          </div>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div className="p-4 bg-white border-l w-72">
        <h2 className="mb-3 font-bold text-blue-700">Live Highlights</h2>

        <div className="flex justify-between mb-3">
          <div className="w-20 p-2 text-center bg-gray-100 rounded">
            <p className="font-bold">{rooms.filter(r => r.available).length}</p>
            <p className="text-xs">Available</p>
          </div>

          <div className="w-20 p-2 text-center bg-gray-100 rounded">
            <p className="font-bold">{rooms.length}</p>
            <p className="text-xs">Total Rooms</p>
          </div>
        </div>

        <div className="p-3 mt-4 text-sm text-blue-800 rounded bg-gradient-to-r from-blue-100 to-green-100">
          Booking for interactive labs requires approval
        </div>
      </div>
    </div>
  );
}