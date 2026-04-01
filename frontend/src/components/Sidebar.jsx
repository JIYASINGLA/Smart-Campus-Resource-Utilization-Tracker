import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Layers,
  Building,
  FlaskConicalIcon,
  UserCheck,
  ClipboardList,
  LogOut
} from "lucide-react";

const Sidebar = () => {
  const menu = [
    { name: "Dashboard", path: "/teacherdashboard", icon: <LayoutDashboard size={18} /> },
    { name: "My Timetable", path: "/schedule", icon: <Calendar size={18} /> },
    { name: "Request Booking", path: "/request-booking", icon: <ClipboardList size={18} /> },
    { name: "Merge Sections", path: "/merge", icon: <Layers size={18} /> },
    { name: "Room Availability", path: "/roomsavailability", icon: <Building size={18} /> },
    { name: "Labs Availability", path: "/labsavailability", icon: <FlaskConicalIcon size={18} /> },
    { name: "Teacher Availability", path: "/teacher", icon: <UserCheck size={18} /> },
  ];

  return (
    <div className="flex flex-col justify-between w-64 min-h-screen p-6 text-white shadow-xl bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-600">

      {/* TOP */}
      <div>
        <h2 className="mb-1 text-2xl font-extrabold tracking-wide">
          CampusConnect
        </h2>
        <p className="mb-8 text-xs text-white/80">
          Smart Campus Resource Tracker
        </p>

        <ul className="space-y-2">
          {menu.map((item, i) => (
            <li key={i}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200
                  ${isActive
                    ? "bg-white text-purple-600 shadow-md font-semibold"
                    : "text-white/90 hover:bg-white/20 hover:translate-x-1"
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* BOTTOM */}
      <button
        className="flex items-center gap-2 px-4 py-2 mt-6 text-sm text-white transition rounded-lg hover:bg-white/20"
        onClick={() => {
          if (window.confirm("Logout?")) {
            localStorage.clear();
            window.location.href = "/login";
          }
        }}
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;