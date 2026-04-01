import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SidebarStudent from "../components/SidebarStudent";
import { Cpu, FlaskConical, CheckCircle, XCircle } from "lucide-react";

export default function Labs() {
  const [labs, setLabs] = useState([]);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [systemFilter, setSystemFilter] = useState("All");
  const [softwareFilter, setSoftwareFilter] = useState("All");
  const [expressOnly, setExpressOnly] = useState(false);

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:5000/api/labs")
      .then(res => res.json())
      .then(data => setLabs(data))
      .catch(err => console.error(err));
  }, []);

  // 🔥 FILTER FIXED
  const filteredLabs = labs.filter((lab) => {
    const isAvailable = lab.current_occupancy < lab.systems;

    return (
      lab.lab_name.toLowerCase().includes(search.toLowerCase()) &&
      (departmentFilter === "All" || lab.department_name === departmentFilter) &&
      (systemFilter === "All" || lab.systems >= Number(systemFilter)) &&
      (softwareFilter === "All" || lab.software === softwareFilter) &&
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
            <h1 className="text-3xl font-bold text-blue-700">Lab Availability</h1>
            <p className="text-gray-500">Check & book labs instantly</p>
          </div>

          <button
            onClick={() => setExpressOnly(!expressOnly)}
            className={`px-4 py-2 rounded-lg text-white shadow ${
              expressOnly
                ? "bg-gradient-to-r from-blue-500 to-green-400"
                : "bg-gray-400"
            }`}
          >
            ⚡ Express Booking
          </button>
        </div>

        {/* FILTERS */}
        <div className="p-4 mb-6 shadow-md bg-white/70 backdrop-blur-lg rounded-2xl">
          <h2 className="mb-3 font-semibold text-blue-700">Filters</h2>

          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Search Lab..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 border rounded-lg w-52"
            />

            <select
              className="p-2 border rounded-lg"
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="All">Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Information Technology">Information Technology</option>
            </select>

            <select
              className="p-2 border rounded-lg"
              onChange={(e) => setSystemFilter(e.target.value)}
            >
              <option value="All">Systems</option>
              <option value="30">30+</option>
              <option value="50">50+</option>
              <option value="70">70+</option>
            </select>

            <select
              className="p-2 border rounded-lg"
              onChange={(e) => setSoftwareFilter(e.target.value)}
            >
              <option value="All">Software</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
              <option value="MATLAB">MATLAB</option>
              <option value="Cisco">Cisco</option>
              <option value="C++">C++</option>
            </select>
          </div>
        </div>

        {/* GRID */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredLabs.map((lab, index) => {

            const isAvailable = lab.current_occupancy < lab.systems;

            return (
              <motion.div key={lab.lab_id} >

                <img src="https://img.freepik.com/premium-photo/bright-computer-lab-with-modern-equipment-technology_889056-39214.jpg" className="object-cover w-full h-32 mb-3 rounded-xl"/>

                <h2 className="text-lg font-bold">{lab.lab_name}</h2>

                <div className="flex items-center gap-2 mt-1 text-sm">
                  {isAvailable ? (
                    <CheckCircle className="text-green-500" size={16} />
                  ) : (
                    <XCircle className="text-red-500" size={16} />
                  )}
                  <span className={isAvailable ? "text-green-500" : "text-red-500"}>
                    {isAvailable ? "Available" : "Occupied"}
                  </span>
                </div>

                <p className="mt-1 text-xs text-gray-500">{lab.department_name}</p>

                <div className="flex justify-between mt-3 text-sm">
                  <span className="flex items-center gap-1">
                    <Cpu size={14} /> {lab.systems}
                  </span>
                  <span className="flex items-center gap-1">
                    <FlaskConical size={14} /> {lab.software}
                  </span>
                </div>

                <button className="w-full py-2 mt-3 text-white rounded-lg bg-gradient-to-r from-blue-500 to-green-400">
                  Book Lab →
                </button>

              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-gray-500">
          Showing {filteredLabs.length} labs
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="p-4 bg-white border-l shadow-lg w-72">
        <h2 className="mb-4 font-bold text-blue-700">Live Status</h2>

        <div className="space-y-3">
          <StatBox label="Available" value={labs.filter(l => l.current_occupancy < l.systems).length} />
          <StatBox label="Total Labs" value={labs.length} />
        </div>
      </div>
    </div>
  );
}

const StatBox = ({ label, value }) => (
  <div className="p-3 text-center bg-gray-100 rounded-xl">
    <p className="text-lg font-bold">{value}</p>
    <p className="text-xs text-gray-500">{label}</p>
  </div>
);