import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SidebarAdmin from "../components/SidebarAdmin";

export default function LabAdmin() {
  const [labs, setLabs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [capacityFilter, setCapacityFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [equipmentFilter, setEquipmentFilter] = useState("All");
  const [expressOnly, setExpressOnly] = useState(false);

  // Dummy lab data
  useEffect(() => {
    setLabs([
      { id: 1, name: "Computer Lab 1", capacity: 60, available: true, type: "Computer", equipment: "PC" },
      { id: 2, name: "AI Lab", capacity: 40, available: false, type: "Computer", equipment: "PC" },
      { id: 3, name: "Electronics Lab", capacity: 35, available: true, type: "Electronics", equipment: "Oscilloscope" },
      { id: 4, name: "Networking Lab", capacity: 50, available: true, type: "IT", equipment: "Cisco Kit" },
      { id: 5, name: "Programming Lab", capacity: 70, available: true, type: "Computer", equipment: "PC" },
      { id: 6, name: "Microprocessor Lab", capacity: 30, available: false, type: "Electronics", equipment: "Lab Kit" },
    ]);
  }, []);

  // Filter logic
  const filteredLabs = labs.filter((lab) => {
    return (
      lab.name.toLowerCase().includes(search.toLowerCase()) &&
      (capacityFilter === "All" || lab.capacity >= capacityFilter) &&
      (typeFilter === "All" || lab.type === typeFilter) &&
      (equipmentFilter === "All" || lab.equipment === equipmentFilter) &&
      (!expressOnly || lab.available === true)
    );
  });

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SidebarAdmin />

        {/* Main content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Lab Listing</h1>
              <p className="text-gray-500">Manage and explore all campus labs</p>
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

          {/* Filters */}
          <div className="p-4 mb-6 bg-white shadow rounded-xl">
            <h2 className="mb-3 font-semibold">Lab Filters</h2>
            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                placeholder="Search Lab Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-48 p-2 border rounded"
              />

              <select
                className="p-2 border rounded"
                onChange={(e) => setCapacityFilter(e.target.value)}
              >
                <option value="All">All Capacities</option>
                <option value="30">30+</option>
                <option value="40">40+</option>
                <option value="50">50+</option>
                <option value="60">60+</option>
                <option value="70">70+</option>
              </select>

              <select
                className="p-2 border rounded"
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Computer">Computer</option>
                <option value="Electronics">Electronics</option>
                <option value="IT">IT</option>
              </select>

              <select
                className="p-2 border rounded"
                onChange={(e) => setEquipmentFilter(e.target.value)}
              >
                <option value="All">Equipment</option>
                <option value="PC">PC</option>
                <option value="Oscilloscope">Oscilloscope</option>
                <option value="Lab Kit">Lab Kit</option>
                <option value="Cisco Kit">Cisco Kit</option>
              </select>
            </div>
          </div>

          {/* Labs Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLabs.map((lab, index) => {
              const occupancy = Math.floor(Math.random() * 90) + 10;

              return (
                <motion.div
                  key={lab.id}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white shadow rounded-2xl"
                >
                  <img
                src="https://img.freepik.com/premium-photo/bright-computer-lab-with-modern-equipment-technology_889056-39214.jpg"
                className="object-cover w-full h-32 mb-3 rounded-lg"
              />
                  <h2 className="text-xl font-bold">{lab.name}</h2>

                  <p className={lab.available ? "text-green-500" : "text-red-500"}>
                    {lab.available ? "Available" : "Occupied"}
                  </p>

                  <p className="text-sm text-gray-500">{lab.type} Lab</p>

                  <div className="mt-2 text-sm">Capacity: {lab.capacity}</div>

                  <div className="w-full h-2 mt-1 bg-gray-200 rounded">
                    <div
                      className="h-2 rounded bg-gradient-to-r from-orange-400 to-red-500"
                      style={{ width: `${occupancy}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">{occupancy}% Occupied</p>

                  <div className="flex gap-2 mt-3 text-xs">
                    <span className="px-2 py-1 bg-gray-200 rounded">{lab.equipment}</span>
                  </div>

                  <button
                    onClick={() => alert(`Lab ${lab.name} Booked!`)}
                    className="w-full py-2 mt-3 text-white rounded-lg bg-gradient-to-r from-orange-400 to-red-500"
                  >
                    Book Lab →
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      
    </div>
  );
}