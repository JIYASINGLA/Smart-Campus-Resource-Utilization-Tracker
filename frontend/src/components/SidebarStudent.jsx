import React from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Bell,
  Calendar,
  BookOpen,
  ClipboardList,
  User,
  LogOut,
  FlaskConical,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SidebarStudent() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard />, path: "/studentdashboard" },
    { name: "Rooms", icon: <Monitor />, path: "/rooms" }, 
    { name: "Labs", icon: <FlaskConical />, path: "/labs" },
    { name: "Teacher", icon: <BookOpen />, path: "/teacherstudent" },
    { name: "Notifications", icon: <Bell />, path: "/student-notifications" },
  ];

  return (
    <div className="relative z-20 flex flex-col justify-between w-64 min-h-screen text-white shadow-2xl bg-gradient-to-b from-blue-600 via-cyan-500 to-green-400">
      
      {/* TOP */}
      <div>
        <div className="p-6 text-center border-b border-white/30">
          <h1 className="text-2xl font-bold">CampusConnect</h1>
          <p className="text-xs opacity-80">Smart Campus Resource Tracker</p>
        </div>

        {/* MENU */}
        <div className="mt-6 space-y-2">
          {menuItems.map((item, i) => {
            const isActive = location.pathname === item.path;

            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, x: 5 }}
                onClick={() => navigate(item.path)}
                className={`flex items-center justify-between gap-3 px-6 py-3 transition rounded-lg cursor-pointer ${
                  isActive
                    ? "bg-white/20 font-semibold"
                    : "hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold text-blue-600 bg-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* LOGOUT */}
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