import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarAdmin from "../components/SidebarAdmin";
import { Bell } from "lucide-react";

// Toast notification component
const Toast = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="fixed z-50 px-4 py-2 text-white bg-orange-500 rounded-lg shadow-lg top-5 right-5"
  >
    {message}
  </motion.div>
);

export default function RequestAdmin() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All Requests");
  const [toast, setToast] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const dummyRequests = [
      { id: 1, teacher: "Dr. Smith", type: "Lab Booking", item: "Computer Lab 1", status: "Pending", date: "2026-03-30" },
      { id: 2, teacher: "Prof. John", type: "Room Booking", item: "Room L-402", status: "Approved", date: "2026-03-29" },
      { id: 3, teacher: "Dr. Alice", type: "Equipment Request", item: "Oscilloscope", status: "Pending", date: "2026-03-28" },
      { id: 4, teacher: "Prof. Bob", type: "Lab Booking", item: "AI Lab", status: "Rejected", date: "2026-03-27" },
      { id: 5, teacher: "Dr. Clara", type: "Room Booking", item: "Room L-403", status: "Pending", date: "2026-03-26" },
      { id: 6, teacher: "Dr. Alan", type: "Lab Booking", item: "Physics Lab", status: "Approved", date: "2026-03-25" },
      { id: 7, teacher: "Prof. Marie", type: "Equipment Request", item: "Microscope", status: "Rejected", date: "2026-03-24" },
      { id: 8, teacher: "Dr. Kevin", type: "Room Booking", item: "Room L-404", status: "Pending", date: "2026-03-23" },
      { id: 9, teacher: "Prof. Laura", type: "Lab Booking", item: "Chemistry Lab", status: "Approved", date: "2026-03-22" },
      { id: 10, teacher: "Dr. Nancy", type: "Equipment Request", item: "3D Printer", status: "Rejected", date: "2026-03-21" },
    ];
    setRequests(dummyRequests);

    // Initial notifications
    setNotifications(dummyRequests.map(req => ({
      id: req.id,
      message: `Request ${req.status} - ${req.item} by ${req.teacher}`,
      status: req.status,
      date: req.date,
      type: req.type,
      item: req.item,
      teacher: req.teacher
    })));
  }, []);

  // Update request status
  const handleStatusUpdate = (id, newStatus) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));
    const req = requests.find(r => r.id === id);
    const notif = {
      id: Date.now(),
      message: `Request ${newStatus} - ${req.item} by ${req.teacher}`,
      status: newStatus,
      date: new Date().toISOString().split("T")[0],
      type: req.type,
      item: req.item,
      teacher: req.teacher
    };
    setNotifications(prev => [notif, ...prev]);
    setToast(`Request ${newStatus.toLowerCase()} successfully!`);
    setTimeout(() => setToast(""), 2000);
  };

  // Filter requests for search and tabs
  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.teacher.toLowerCase().includes(search.toLowerCase());
    if (activeTab === "All Requests") return matchesSearch;
    if (activeTab === "Pending") return matchesSearch && req.status === "Pending";
    if (activeTab === "Approved") return matchesSearch && req.status === "Approved";
    if (activeTab === "Rejected") return matchesSearch && req.status === "Rejected";
    return true;
  });

  const tabs = ["All Requests", "Pending", "Approved", "Rejected", "Notifications"];

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarAdmin />

      <div className="flex flex-col flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-red-600">Request & Notification Center</h1>
            <p className="text-gray-500">Manage teacher requests and view full history of notifications</p>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search Teacher"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 transition border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-300">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium transition rounded-t-lg ${
                activeTab === tab
                  ? "bg-orange-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-orange-500"
              }`}
            >
              {tab} {tab === "Notifications" && notifications.length > 0 && <span className="ml-1 text-sm text-red-600">●</span>}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left: Requests */}
          {activeTab !== "Notifications" && (
            <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((req, index) => (
                    <motion.div
                      key={req.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                      className="flex flex-col justify-between p-5 bg-white shadow-md rounded-2xl"
                    >
                      <div>
                        <h2 className="text-xl font-bold">{req.teacher}</h2>
                        <p className="text-gray-500">{req.type}</p>
                        <p className="mt-1 text-sm">Item: {req.item}</p>
                        <p className="mt-1 text-sm">Requested on: {req.date}</p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <span
                          className={`px-3 py-1 text-sm font-semibold rounded-full bg-gradient-to-r ${
                            req.status === "Pending"
                              ? "from-orange-400 to-red-500 text-white"
                              : req.status === "Approved"
                              ? "from-green-400 to-green-600 text-white"
                              : "from-gray-400 to-gray-600 text-white"
                          }`}
                        >
                          {req.status}
                        </span>

                        {req.status === "Pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleStatusUpdate(req.id, "Approved")}
                              className="px-3 py-1 text-white transition rounded-lg bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(req.id, "Rejected")}
                              className="px-3 py-1 text-white transition bg-gray-400 rounded-lg hover:bg-gray-500"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-full">No requests found.</p>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Right: Notifications */}
          {activeTab === "Notifications" && (
            <div className={`flex flex-col gap-3 max-h-[70vh] overflow-y-auto p-2
  ${activeTab === "Notifications" ? "w-full" : "lg:w-1/3"}`}
>
              <h2 className="flex items-center gap-2 mb-2 text-xl font-semibold text-gray-700">
                <Bell size={20} /> Notifications History
              </h2>

              {["Today", "Yesterday", "Earlier"].map(group => {
                const now = new Date();
                const groupNotifications = notifications.filter(note => {
                  const noteDate = new Date(note.date);
                  if (group === "Today") return noteDate.toDateString() === now.toDateString();
                  if (group === "Yesterday") {
                    const yesterday = new Date();
                    yesterday.setDate(now.getDate() - 1);
                    return noteDate.toDateString() === yesterday.toDateString();
                  }
                  // Earlier
                  const yesterday = new Date();
                  yesterday.setDate(now.getDate() - 1);
                  return noteDate < yesterday;
                });

                if (groupNotifications.length === 0) return null;

                return (
                  <div key={group} className="mb-4">
                    <p className="mb-1 font-semibold text-gray-400 text-s">{group}</p>
                    <AnimatePresence>
                      {groupNotifications.map(note => (
                        <motion.div
                          key={note.id}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 50 }}
                          whileHover={{ scale: 1.02, boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
                          className="flex flex-col justify-between p-3 transition bg-white rounded-lg shadow cursor-pointer"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex flex-col">
                              <p className="text-sm font-medium">{note.message}</p>
                              <p className="mt-1 text-xs text-gray-400">{note.date}</p>
                            </div>
                            <span
                              className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                                note.status === "Pending"
                                  ? "bg-gradient-to-r from-orange-400 to-red-500 text-white"
                                  : note.status === "Approved"
                                  ? "bg-gradient-to-r from-green-400 to-teal-500 text-white"
                                  : "bg-gradient-to-r from-gray-400 to-red-400 text-white"
                              }`}
                            >
                              {note.status}
                            </span>
                          </div>

                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            className="mt-2 text-xs text-gray-600"
                          >
                            <p>Request Type: {note.type || "-"}</p>
                            <p>Item: {note.item || "-"}</p>
                            <p>Teacher: {note.teacher || "-"}</p>
                          </motion.div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="w-full p-4 mt-8 text-center bg-white shadow-inner rounded-2xl">
          <p className="text-sm text-gray-500">
            Showing {filteredRequests.length} request{filteredRequests.length > 1 ? "s" : ""}
          </p>
        </footer>

        {/* Toast Notification */}
        <AnimatePresence>{toast && <Toast message={toast} />}</AnimatePresence>
      </div>
    </div>
  );
}