import React, { useState } from "react";
import SidebarStudent from "../components/SidebarStudent";
import { motion } from "framer-motion";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  Clock,
} from "lucide-react";

/* -------- DATA WITH GROUPS -------- */
const notificationsData = [
  // TODAY
  {
    id: 1,
    type: "shifted",
    message: "DBMS lecture shifted to Room 204",
    from: "Admin",
    time: "10 mins ago",
    read: false,
    img: "https://i.pravatar.cc/100?img=12",
    group: "today",
  },
  {
    id: 2,
    type: "merged",
    message: "OS class merged with Section B in Lab 3",
    from: "Dr. Mehta",
    time: "30 mins ago",
    read: false,
    img: "https://i.pravatar.cc/100?img=15",
    group: "today",
  },
  {
    id: 3,
    type: "general",
    message: "AI Workshop registrations open",
    from: "Admin",
    time: "1 hour ago",
    read: true,
    img: "https://i.pravatar.cc/100?img=20",
    group: "today",
  },

  // YESTERDAY
  {
    id: 4,
    type: "shifted",
    message: "Maths class shifted to Room 105",
    from: "Admin",
    time: "Yesterday",
    read: false,
    img: "https://i.pravatar.cc/100?img=22",
    group: "yesterday",
  },
  {
    id: 5,
    type: "merged",
    message: "CN lecture merged with Section A",
    from: "Prof. Singh",
    time: "Yesterday",
    read: true,
    img: "https://i.pravatar.cc/100?img=25",
    group: "yesterday",
  },

  // EARLIER
  {
    id: 6,
    type: "general",
    message: "Hackathon registrations closing soon",
    from: "Admin",
    time: "2 days ago",
    read: true,
    img: "https://i.pravatar.cc/100?img=28",
    group: "earlier",
  },
  {
    id: 7,
    type: "shifted",
    message: "AI Lab moved to Lab 5",
    from: "Faculty",
    time: "3 days ago",
    read: true,
    img: "https://i.pravatar.cc/100?img=30",
    group: "earlier",
  },
  {
    id: 8,
    type: "merged",
    message: "Software Engg merged with Section C",
    from: "Dr. Gupta",
    time: "4 days ago",
    read: true,
    img: "https://i.pravatar.cc/100?img=32",
    group: "earlier",
  },
];

/* -------- MAIN COMPONENT -------- */
export default function Notifications() {
  const [notifications, setNotifications] = useState(notificationsData);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const getIcon = (type) => {
    if (type === "shifted")
      return <AlertTriangle className="text-yellow-500" />;
    if (type === "merged")
      return <CheckCircle className="text-blue-500" />;
    return <Info className="text-green-500" />;
  };

  const getBadge = (type) => {
    if (type === "shifted")
      return "bg-yellow-100 text-yellow-700";
    if (type === "merged")
      return "bg-blue-100 text-blue-700";
    return "bg-green-100 text-green-700";
  };

  const groups = {
    today: notifications.filter((n) => n.group === "today"),
    yesterday: notifications.filter((n) => n.group === "yesterday"),
    earlier: notifications.filter((n) => n.group === "earlier"),
  };

  /* -------- UI -------- */
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <SidebarStudent />

      <div className="flex-1 p-8">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-800">
              <Bell className="text-blue-600" /> Notifications
            </h1>
            <p className="text-gray-500">
              Your class updates & alerts
            </p>
          </div>

          <button
            onClick={() =>
              setNotifications((prev) =>
                prev.map((n) => ({ ...n, read: true }))
              )
            }
            className="px-5 py-2 text-white rounded-xl bg-gradient-to-r from-blue-500 to-green-400"
          >
            Mark all as read
          </button>
        </div>

        {/* GROUPED SECTIONS */}
        {Object.entries(groups).map(([key, items]) => (
          items.length > 0 && (
            <div key={key} className="mb-8">

              {/* SECTION TITLE */}
              <h2 className="mb-4 text-lg font-semibold text-gray-600 capitalize">
                {key === "today"
                  ? "Today"
                  : key === "yesterday"
                  ? "Yesterday"
                  : "Earlier"}
              </h2>

              <div className="space-y-4">
                {items.map((n, index) => (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex gap-4 p-4 rounded-xl border shadow-sm backdrop-blur
                    ${
                      n.read
                        ? "bg-white/70"
                        : "bg-white border-blue-400"
                    }`}
                  >
                    {/* LEFT BAR */}
                    <div className={`w-1.5 rounded-full ${
                      n.type === "shifted"
                        ? "bg-yellow-400"
                        : n.type === "merged"
                        ? "bg-blue-500"
                        : "bg-green-400"
                    }`} />

                    {/* AVATAR */}
                    <img
                      src={n.img}
                      className="w-12 h-12 border-2 border-blue-400 rounded-full"
                    />

                    {/* CONTENT */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getIcon(n.type)}
                          <span className={`text-xs px-2 py-1 rounded ${getBadge(n.type)}`}>
                            {n.type}
                          </span>
                        </div>

                        {!n.read && (
                          <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
                        )}
                      </div>

                      <p className="mt-1 font-semibold">{n.message}</p>

                      <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>{n.from}</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {n.time}
                        </span>
                      </div>

                      {!n.read && (
                        <button
                          onClick={() => markAsRead(n.id)}
                          className="px-3 py-1 mt-2 text-xs text-white rounded bg-gradient-to-r from-blue-500 to-green-400"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        ))}

        {/* EMPTY */}
        {notifications.length === 0 && (
          <div className="mt-20 text-center text-gray-400">
            <Bell size={40} className="mx-auto mb-3" />
            No notifications
          </div>
        )}
      </div>
    </div>
  );
}