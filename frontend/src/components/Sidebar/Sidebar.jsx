import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { talentApi } from "../../services/api"; // API xizmati
import { jwtDecode } from "jwt-decode"; // Tokenni o'qish uchun
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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const decoded = jwtDecode(token);
        const res = await talentApi.getById(decoded.id);
        setUser(res.data);
      } catch (err) {
        console.error("Sidebar ma'lumotlarini yuklashda xatolik:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <aside className="fixed bottom-0 left-0 w-full h-[75px] md:top-0 md:h-screen md:w-[290px] bg-white border-t md:border-r border-gray-100 z-50 md:rounded-r-[35px] flex md:flex-col py-2 md:py-8 transition-all duration-300">
      
      {/* --- AVATAR VA ISM QISMI --- */}
      <div className="hidden md:flex items-center gap-3 px-8 mb-8">
        {loading ? (
          // Yuklanayotgan vaqtdagi ko'rinish (Skeleton)
          <div className="flex items-center gap-3 animate-pulse">
            <div className="w-11 h-11 rounded-full bg-gray-200"></div>
            <div className="space-y-2">
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
              <div className="h-2 w-16 bg-gray-100 rounded"></div>
            </div>
          </div>
        ) : (
          // Ma'lumot kelgandagi ko'rinish
          <>
            <img
              src={user?.image || "https://via.placeholder.com/150"}
              alt="avatar"
              className="w-11 h-11 rounded-full object-cover border border-gray-100 shadow-sm"
            />
            <div className="overflow-hidden">
              <h3 className="font-bold text-[#334155] text-[14px] truncate">
                {user?.first_name} {user?.last_name?.charAt(0)}.
              </h3>
              <p className="text-[12px] text-[#cbd5e1] font-medium truncate">
                {user?.city || user?.location || "O'zbekiston"}
              </p>
            </div>
          </>
        )}
      </div>

      <nav className="flex w-full justify-around md:justify-start md:flex-col md:px-5 gap-1">
        <div className="md:order-1 w-full">
          <MenuItem to="/dashboard" icon={<HiChartBar />} label="Dashboard" />
        </div>
        <div className="md:order-5 w-full">
          <MenuItem to="/" icon={<HiOutlineHome />} label="Home" />
        </div>
        <div className="md:order-4 w-full">
          <MenuItem to="/matches" icon={<HiOutlineRefresh />} label="Job matches" />
        </div>
        <div className="md:order-3 w-full">
          <MenuItem to="/alerts" icon={<HiOutlineBell />} label="Job alerts" badge="13" />
        </div>
        <div className="md:order-2 w-full">
          <MenuItem to="/profile" icon={<HiOutlineUserCircle />} label="My profile" />
        </div>
        <div className="md:order-6 w-full">
          <MenuItem to="/settings" icon={<HiOutlineCog />} label="Settings" />
        </div>
        <div className="hidden md:block md:order-7 w-full">
          <MenuItem to="/faq" icon={<HiOutlineChatAlt2 />} label="FAQ" />
        </div>
        <div className="hidden md:block md:order-8 w-full">
          <MenuItem to="/contacts" icon={<HiOutlineUsers />} label="Contacts" />
        </div>
      </nav>
    </aside>
  );
};

const MenuItem = ({ to, icon, label, badge }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex flex-col md:flex-row items-center gap-1 md:gap-4
        px-3 md:px-6 py-2 md:py-[14px]
        rounded-xl md:rounded-[14px] transition-all duration-200
        text-[10px] md:text-[16px] font-bold
        relative group w-full
        ${isActive 
          ? "bg-[#163853] text-white shadow-md" 
          : "text-[#cbd5e1] hover:bg-gray-50 hover:text-[#94a3b8]"
        }
      `}
    >
      <span className="text-[22px] md:text-[24px]">
        {icon}
      </span>
      <span className="whitespace-nowrap tracking-wide">
        {label}
      </span>
      
      {badge && (
        <span className="absolute top-1 right-2 md:right-4 md:top-1/2 md:-translate-y-1/2 bg-[#5cc992] text-white text-[9px] md:text-[11px] w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full font-bold">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

export default Sidebar;