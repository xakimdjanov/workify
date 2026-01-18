import React from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineBriefcase,
  HiOutlineBell,
  HiOutlineCog,
  HiOutlineUserCircle,
} from "react-icons/hi"; // Rasmga yaqinroq chiziqli ikonkalar

const Sidebar = () => {
  return (
    <aside
      className="
        fixed bottom-0 left-0
        w-full h-[80px]
        md:top-0 md:h-screen md:w-[280px]
        bg-white
        border-t md:border-r border-gray-100
        z-50
        md:rounded-r-[24px]
        flex md:flex-col
        items-center md:items-stretch
        px-2 md:px-6
        py-2 md:py-8
      "
    >
      {/* PROFILE (Desktop uchun tepa qism) */}
      <div className="hidden md:flex items-center gap-3 mb-10">
        <img
          src="https://i.pravatar.cc/100"
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-bold text-gray-800 text-sm">Kamalkhujaev N.</h3>
          <p className="text-xs text-gray-400 font-medium">Andijan</p>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex w-full justify-between md:justify-start md:flex-col md:gap-4">
        <MenuItem to="/" icon={<HiOutlineHome size={24} />} label="Home" />
        <MenuItem 
          to="/dashboard/matches" 
          icon={<HiOutlineBriefcase size={24} />} 
          label="Job matches" 
        />
        <MenuItem 
          to="/dashboard/alerts" 
          icon={<HiOutlineBell size={24} />} 
          label="Job alerts" 
        />
        <MenuItem 
          to="/dashboard/settings" 
          icon={<HiOutlineCog size={24} />} 
          label="Settings" 
        />
        <MenuItem 
          to="/dashboard/profile" 
          icon={<HiOutlineUserCircle size={24} />} 
          label="Profile" 
        />
      </nav>
    </aside>
  );
};

/* 🔹 Menu item component */
const MenuItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex flex-col md:flex-row items-center gap-1 md:gap-4
        px-3 md:px-4 py-2
        rounded-xl transition-all duration-200
        text-[10px] md:text-sm font-medium
        ${
          isActive
            ? "text-[#8B5CF6] md:bg-[#F5F3FF]" // Faol bo'lganda binafsha rang
            : "text-gray-400 hover:text-gray-600 md:hover:bg-gray-50"
        }
      `
      }
    >
      <span className="text-xl md:text-2xl">{icon}</span>
      <span className="whitespace-nowrap">{label}</span>
    </NavLink>
  );
};

export default Sidebar;