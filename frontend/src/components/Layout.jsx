import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "/studentdashboard" },
    { name: "Resources", path: "#" },
    { name: "Timetable", path: "#" },
    { name: "Notifications", path: "/notifications" },
    { name: "Profile", path: "#" },
  ];

  const handleLogout = () => {
    // You can replace this with actual logout logic
    if (window.confirm("Are you sure you want to logout?")) {
      // Clear auth tokens / session here
      navigate("/login"); // Redirect to login page
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      
      {/* Sidebar */}
      <div className="flex-col hidden w-64 p-5 text-white bg-gradient-to-b from-indigo-900 via-indigo-700 to-purple-700 md:flex">
        <h2 className="mb-8 text-2xl font-bold">MMDU Campus</h2>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4">
          {navItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className={`p-2 rounded transition flex items-center justify-between ${
                location.pathname === item.path
                  ? "bg-white text-indigo-700 font-semibold"
                  : "hover:bg-indigo-500"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 mt-6 text-sm font-medium text-white transition bg-red-600 rounded-lg hover:bg-red-500"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>

        <div className="mt-auto text-sm">© 2026 MMDU Portal</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}