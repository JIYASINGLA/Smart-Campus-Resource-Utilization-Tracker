import Layout from "../components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, AlertTriangle, Info, CheckCircle, EyeOff, Eye } from "lucide-react";
import { useState } from "react";

const initialNotifications = [
  {
    id: 1,
    title: "Class Shifted",
    desc: "DBMS class moved to Room 204",
    type: "urgent",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    title: "Lab Merged",
    desc: "CN Lab merged with Section B",
    type: "update",
    time: "10 min ago",
    unread: true,
  },
  {
    id: 3,
    title: "Library Alert",
    desc: "Library will close early today",
    type: "info",
    time: "30 min ago",
    unread: false,
  },
  {
    id: 4,
    title: "Workshop Available",
    desc: "AI Workshop registrations open",
    type: "success",
    time: "1 hour ago",
    unread: false,
  },
];

const getIcon = (type) => {
  switch (type) {
    case "urgent": return <AlertTriangle className="text-red-500" />;
    case "update": return <Bell className="text-yellow-500" />;
    case "info": return <Info className="text-blue-500" />;
    case "success": return <CheckCircle className="text-green-500" />;
    default: return <Bell />;
  }
};

const getBadgeColor = (type) => {
  switch (type) {
    case "urgent": return "bg-red-100 text-red-800";
    case "update": return "bg-yellow-100 text-yellow-800";
    case "info": return "bg-blue-100 text-blue-800";
    case "success": return "bg-green-100 text-green-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const toggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, unread: !n.unread } : n
      )
    );
  };

  const unreadNotifications = notifications.filter(n => n.unread);
  const readNotifications = notifications.filter(n => !n.unread);

  const renderNotification = (n) => (
    <motion.div
      key={n.id}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      layout
      className={`flex items-center gap-4 p-4 rounded-xl shadow-sm border border-gray-200 transition bg-white`}
    >
      {/* Icon */}
      <div className="flex items-center justify-center flex-shrink-0 p-2 text-xl bg-gray-100 rounded-full">
        {getIcon(n.type)}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">{n.title}</h2>
          {n.unread && <span className="w-2 h-2 bg-indigo-500 rounded-full" />}
        </div>
        <p className="mt-1 text-sm text-gray-500">{n.desc}</p>
        <p className="mt-1 text-xs text-gray-400">{n.time}</p>
      </div>

      {/* Badge */}
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getBadgeColor(n.type)}`}>
        {n.type.toUpperCase()}
      </span>

      {/* Toggle Read/Unread */}
      <button
        onClick={() => toggleRead(n.id)}
        className="p-2 ml-2 text-gray-500 transition rounded-full hover:text-gray-700"
        title={n.unread ? "Mark as Read" : "Mark as Unread"}
      >
        {n.unread ? <EyeOff /> : <Eye />}
      </button>
    </motion.div>
  );

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col items-center justify-between gap-3 mb-6 md:flex-row">
        <h1 className="flex items-center gap-2 text-3xl font-bold">🔔 Notifications</h1>
        <span className="px-4 py-1 text-sm text-white bg-indigo-500 rounded-full shadow">
          {unreadNotifications.length} New
        </span>
      </div>

      <div className="space-y-8 max-h-[70vh] overflow-y-auto">
        {/* Unread Section */}
        {unreadNotifications.length > 0 && (
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-700">Unread</h2>
            <AnimatePresence>
              {unreadNotifications.map(renderNotification)}
            </AnimatePresence>
          </div>
        )}

        {/* Read Section */}
        {readNotifications.length > 0 && (
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-700">Read</h2>
            <AnimatePresence>
              {readNotifications.map(renderNotification)}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="mt-20 text-center text-gray-400">
            🎉 No notifications
          </div>
        )}
      </div>
    </Layout>
  );
}