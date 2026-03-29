// ../components/SidebarAdmin.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Building,
  Bell,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SidebarAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard />, path: "/admindashboard" },
    { name: "Teachers", icon: <Users />, path: "/teachers" },
    { name: "Departments", icon: <Settings />, path: "/departments" },
    { name: "Rooms", icon: <Building />, path: "/roomadmin" },
    { name: "Labs", icon: <BookOpen />, path: "/labadmin" },
    { name: "Requests", icon: <Bell />, path: "/requestadmin" }, 
    { name: "Analytics", icon: <BarChart3 />, path: "/analyticsadmin" },
  ];

  return (
    <div className="flex flex-col justify-between w-64 h-screen text-white shadow-2xl bg-gradient-to-b from-red-600 to-orange-400">

      {/* Logo / Top */}
      <div>
        <div className="p-6 text-center border-b border-white/30">
          <h1 className="text-2xl font-bold">CampusConnect</h1>
          <p className="text-xs opacity-80">Smart Campus Resource Tracker</p>
        </div>

        {/* Menu */}
        <div className="mt-6 space-y-2">
          {menuItems.map((item, i) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, x: 5 }}
                onClick={() => navigate(item.path)}
                className={`flex items-center justify-between gap-3 px-6 py-3 transition rounded-lg cursor-pointer ${
                  isActive ? "bg-white/20 font-semibold" : "hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold text-red-600 bg-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Logout */}
      <div className="p-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-3 px-4 py-3 cursor-pointer bg-white/20 rounded-xl hover:bg-white/30"
        >
          <LogOut />
          <span>Logout</span>
        </motion.div>
      </div>
    </div>
  );
}