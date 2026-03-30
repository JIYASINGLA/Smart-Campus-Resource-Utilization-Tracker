import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SidebarAdmin from "../components/SidebarAdmin";

export default function RoomAdmin() {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [capacityFilter, setCapacityFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [equipmentFilter, setEquipmentFilter] = useState("All");
  const [expressOnly, setExpressOnly] = useState(false);

  // Initial dummy data
  useEffect(() => {
    setRooms([
      { id: 1, name: "L-402", capacity: 45, available: true, department: "CSE", equipment: "Projector" },
      { id: 2, name: "L-403", capacity: 60, available: false, department: "IT", equipment: "AC" },
      { id: 3, name: "L-404", capacity: 50, available: true, department: "ECE", equipment: "Projector" },
      { id: 4, name: "L-405", capacity: 70, available: true, department: "CSE", equipment: "AC" },
      { id: 5, name: "L-406", capacity: 80, available: true, department: "IT", equipment: "Projector" },
      { id: 6, name: "L-407", capacity: 40, available: true, department: "ECE", equipment: "AC" },
    ]);
  }, []);

  // Filter Logic
  const filteredRooms = rooms.filter((room) => {
    return (
      room.name.toLowerCase().includes(search.toLowerCase()) &&
      (capacityFilter === "All" || room.capacity >= capacityFilter) &&
      (departmentFilter === "All" || room.department === departmentFilter) &&
      (equipmentFilter === "All" || room.equipment === equipmentFilter) &&
      (!expressOnly || room.available === true)
    );
  });

  // Load more rooms function
  const loadMoreRooms = () => {
    const nextId = rooms.length + 1;
    const newRooms = [
      { id: nextId, name: `L-${400 + nextId}`, capacity: 45 + nextId, available: true, department: "CSE", equipment: "Projector" },
      { id: nextId + 1, name: `L-${400 + nextId + 1}`, capacity: 50 + nextId, available: false, department: "IT", equipment: "AC" },
      { id: nextId + 2, name: `L-${400 + nextId + 2}`, capacity: 55 + nextId, available: true, department: "ECE", equipment: "Projector" },
    ];
    setRooms([...rooms, ...newRooms]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT CONTENT */}
        <SidebarAdmin />

        {/* MAIN CONTENT */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Room Listing</h1>
              <p className="text-gray-500">Manage and explore all campus facilities</p>
            </div>

            <div className="flex gap-3">
              <input
                type="date"
                className="px-4 py-2 border rounded-lg"
                onChange={(e) => setSelectedDate(e.target.value)}
              />

              <button
                onClick={() => setExpressOnly(!expressOnly)}
                className="px-4 py-2 text-white rounded-lg bg-gradient-to-r from-orange-400 to-red-500"
              >
                Express Booking
              </button>
            </div>
          </div>

          {/* FILTER BOX */}
          <div className="p-4 mb-6 bg-white shadow rounded-xl">
            <h2 className="mb-3 font-semibold">Directory Filters</h2>
            <div className="flex flex-wrap gap-3">
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRooms.map((room, index) => {
              const occupancy = Math.floor(Math.random() * 90) + 10;

              return (
                <motion.div
                  key={room.id}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white shadow rounded-2xl"
                >
                  <img
                    src="https://cdn.pixabay.com/photo/2016/12/15/20/28/classroom-1910011_1280.jpg"
                    className="object-cover w-full h-32 mb-3 rounded-lg"
                  />

                  <h2 className="text-xl font-bold">Room {room.name}</h2>

                  <p className={room.available ? "text-green-500" : "text-red-500"}>
                    {room.available ? "Available" : "Busy"}
                  </p>

                  <p className="text-sm text-gray-500">{room.department} Department</p>

                  <div className="mt-2 text-sm">{room.capacity} Capacity</div>

                  <div className="w-full h-2 mt-1 bg-gray-200 rounded">
                    <div
                      className="h-2 rounded bg-gradient-to-r from-orange-400 to-red-500"
                      style={{ width: `${occupancy}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">{occupancy}% Occupied</p>

                  <div className="flex gap-2 mt-3 text-xs">
                    <span className="px-2 py-1 bg-gray-200 rounded">{room.equipment}</span>
                  </div>

                  <button
                    onClick={() => alert(`Room ${room.name} Booked!`)}
                    className="w-full py-2 mt-3 text-white rounded-lg bg-gradient-to-r from-orange-400 to-red-500"
                  >
                    Book This Room →
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* LOAD MORE BUTTON */}
          <div className="mt-8 text-center">
            <button
              onClick={loadMoreRooms}
              className="px-6 py-2 transition bg-white border rounded shadow hover:bg-gray-100"
            >
              Load More Rooms
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}