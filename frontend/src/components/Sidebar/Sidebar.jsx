import React from "react";
import { NavLink } from "react-router-dom";
import { 
  HiChartBar, 
  HiOutlineUserCircle, 
  HiOutlineBell, 
  HiOutlineRefresh, 
  HiOutlineHome, 
  HiOutlineCog, 
  HiOutlineChatAlt2, 
  HiOutlineUsers 
} from "react-icons/hi";

const Sidebar = () => {
  return (
    <aside className="fixed bottom-0 left-0 w-full h-[75px] md:top-0 md:h-screen md:w-[290px] bg-white border-t md:border-r border-gray-100 z-50 md:rounded-r-[35px] flex md:flex-col py-2 md:py-8">
      
      {/* Profil qismi - Faqat Desktop */}
      <div className="hidden md:flex items-center gap-3 px-8 mb-8">
        <img
          src="https://i.pravatar.cc/150?u=kamal"
          alt="avatar"
          className="w-11 h-11 rounded-full object-cover"
        />
        <div>
          <h3 className="font-bold text-[#334155] text-[14px]">Kamalkhujaev N.</h3>
          <p className="text-[12px] text-[#cbd5e1] font-medium">Andijan</p>
        </div>
      </div>

      <nav className="flex w-full justify-around md:justify-start md:flex-col md:px-5">
        
        {/* 1. DASHBOARD - Desktopda birinchi, Mobilda ko'rinmaydi (yoki tartibda oxirroq) */}
        <div className="hidden md:block md:order-1 mb-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `
              flex items-center gap-4 px-6 py-[14px] rounded-[14px] transition-all duration-200
              ${isActive 
                ? "bg-[#163853] text-white shadow-md" 
                : "text-[#cbd5e1] hover:bg-gray-50 hover:text-[#94a3b8]"
              }
            `}
          >
            <HiChartBar size={22} />
            <span className="font-bold text-[16px] tracking-wide">Dashboard</span>
          </NavLink>
        </div>

        {/* 2. HOME - Mobilda 1-o'rin, Desktopda 5-o'rin */}
        <div className="md:order-5 w-full">
          <MenuItem to="/" icon={<HiOutlineHome />} label="Home" />
        </div>
        
        {/* 3. JOB MATCHES - Mobilda 2-o'rin, Desktopda 4-o'rin */}
        <div className="md:order-4 w-full">
          <MenuItem to="/matches" icon={<HiOutlineRefresh />} label="Job matches" />
        </div>

        {/* 4. JOB ALERTS - Mobilda 3-o'rin, Desktopda 3-o'rin */}
        <div className="md:order-3 w-full">
          <MenuItem to="/alerts" icon={<HiOutlineBell />} label="Job alerts" badge="13" />
        </div>

        {/* 5. MY PROFILE - Mobilda 5-o'rin, Desktopda 2-o'rin */}
        <div className="md:order-2 w-full">
          <MenuItem to="/profile" icon={<HiOutlineUserCircle />} label="My profile" />
        </div>

        {/* 6. SETTINGS - Mobilda 4-o'rin, Desktopda 6-o'rin */}
        <div className="md:order-6 w-full">
          <MenuItem to="/settings" icon={<HiOutlineCog />} label="Settings" />
        </div>
        
        {/* 7. FAQ - Faqat Desktop */}
        <div className="hidden md:block md:order-7 w-full">
          <MenuItem to="/faq" icon={<HiOutlineChatAlt2 />} label="FAQ" />
        </div>
        
        {/* 8. CONTACTS - Faqat Desktop */}
        <div className="hidden md:block md:order-8 w-full">
          <MenuItem to="/contacts" icon={<HiOutlineUsers />} label="Contacts" />
        </div>

      </nav>
    </aside>
  );
};

/* Bir xil uslubdagi menyu komponenti */
const MenuItem = ({ to, icon, label, badge }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex flex-col md:flex-row items-center gap-1 md:gap-5
        px-3 md:px-6 py-2 md:py-4
        rounded-xl transition-all duration-200
        text-[10px] md:text-[17px] font-medium
        relative group w-full
        ${
          isActive
            ? "text-[#8B5CF6] md:text-[#cbd5e1]" 
            : "text-[#cbd5e1] hover:text-[#94a3b8]"
        }
      `}
    >
      <span className="text-[24px] md:text-[26px]">
        {icon}
      </span>
      <span className="whitespace-nowrap font-normal text-[#94a3b8] group-hover:text-gray-600">
        {label}
      </span>
      
      {badge && (
        <span className="
          absolute top-1 right-2 md:right-4 md:top-1/2 md:-translate-y-1/2 
          bg-[#5cc992] text-white text-[9px] md:text-[11px] 
          w-4 h-4 md:w-5 md:h-5 
          flex items-center justify-center rounded-full font-bold
        ">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

export default Sidebar;