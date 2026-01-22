import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { talentApi, applicationApi } from "../../services/api";
import { jwtDecode } from "jwt-decode";
import {
  HiChartBar,
  HiOutlineUserCircle,
  HiOutlineBell,
  HiOutlineRefresh,
  HiOutlineCog,
  HiOutlineChatAlt2,
  HiOutlineUsers,
  HiOutlineLogout,
} from "react-icons/hi";

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appCount, setAppCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const decoded = jwtDecode(token);
        // Dashboard mantiqidagi kabi turli xil ID nomlarini tekshiramiz
        const currentUserId = decoded.id || decoded.userId || decoded.user_id || 
                            decoded.talentId || decoded.talent_id || 
                            decoded.applicantId || decoded.applicant_id;

        const [userRes, appRes] = await Promise.all([
          talentApi.getById(decoded.id),
          applicationApi.getAll(),
        ]);

        setUser(userRes.data);

        // ARIZALARNI FILTRLASH QISMI
        const allApps = Array.isArray(appRes.data)
          ? appRes.data
          : appRes.data?.data || [];

        if (currentUserId) {
          const myApps = allApps.filter((app) => {
            return (
              app.talentId === currentUserId ||
              app.talent_id === currentUserId ||
              app.applicantId === currentUserId ||
              app.applicant_id === currentUserId ||
              app.userId === currentUserId ||
              app.user_id === currentUserId
            );
          });
          setAppCount(myApps.length); // Faqat foydalanuvchinikini sanash
        } else {
          setAppCount(0);
        }

      } catch (err) {
        console.error("Sidebar error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSidebarData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ... (Qolgan render qismi (return) o'zgarishsiz qoladi)
  return (
    <>
      <aside className="fixed bottom-0 left-0 w-full h-[75px] md:top-0 md:h-screen md:w-[290px] bg-white border-t md:border-r border-gray-100 z-50 md:rounded-r-[35px] flex md:flex-col py-2 md:py-8 transition-all duration-300">
        <div className="hidden md:flex items-center gap-3 px-8 mb-8">
          {loading ? (
            <div className="flex items-center gap-3 animate-pulse">
              <div className="w-11 h-11 rounded-full bg-gray-200"></div>
              <div className="space-y-2">
                <div className="h-3 w-24 bg-gray-200 rounded"></div>
                <div className="h-2 w-16 bg-gray-100 rounded"></div>
              </div>
            </div>
          ) : (
            <>
              <img
                src={user?.image || "https://via.placeholder.com/150"}
                alt="avatar"
                className="w-11 h-11 rounded-full object-cover border border-gray-100 shadow-sm"
              />
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
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
          <MenuItem to="/dashboard" icon={<HiChartBar />} label="Dashboard" />
          <MenuItem to="/profile" icon={<HiOutlineUserCircle />} label="My profile" />
          <MenuItem
            to="/alerts"
            icon={<HiOutlineBell />}
            label="Job alerts"
            badge={appCount > 0 ? appCount : null} // Bu yerda filtrlangan son ko'rinadi
          />
          <MenuItem to="/matches" icon={<HiOutlineRefresh />} label="Job matches" />
          <MenuItem to="/settings" icon={<HiOutlineCog />} label="Settings" />

          <div className="hidden md:block">
            <MenuItem to="/faq" icon={<HiOutlineChatAlt2 />} label="FAQ" />
            <MenuItem to="/contacts" icon={<HiOutlineUsers />} label="Contacts" />
          </div>

          <div className="md:mt-auto md:pt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex flex-col md:flex-row items-center gap-1 md:gap-4 px-3 md:px-6 py-2 md:py-[14px] rounded-xl md:rounded-[14px] transition-all duration-200 text-[10px] md:text-[16px] font-bold text-red-500 hover:bg-red-50 w-full"
            >
              <span className="text-[22px] md:text-[24px]">
                <HiOutlineLogout />
              </span>
              <span className="whitespace-nowrap tracking-wide">Log out</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Modal qismi ham o'sha holicha qoladi */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl transform transition-all">
            <h3 className="text-xl font-bold text-[#334155] mb-2">Chiqish</h3>
            <p className="text-gray-500 mb-6">Rostdan ham tizimdan chiqmoqchimisiz?</p>
            <div className="flex gap-3">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors">Yo'q</button>
              <button onClick={handleLogout} className="flex-1 py-3 px-4 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-200">Ha, chiqish</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// MenuItem komponenti ham o'zgarishsiz qoladi
const MenuItem = ({ to, icon, label, badge }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex flex-col md:flex-row items-center gap-1 md:gap-4
      px-3 md:px-6 py-2 md:py-[14px]
      rounded-xl md:rounded-[14px] transition-all duration-200
      text-[10px] md:text-[16px] font-bold
      relative group w-full
      ${isActive ? "bg-[#163853] text-white shadow-md" : "text-[#cbd5e1] hover:bg-gray-50 hover:text-[#94a3b8]"}
    `}
  >
    <span className="text-[22px] md:text-[24px]">{icon}</span>
    <span className="whitespace-nowrap tracking-wide">{label}</span>
    {badge && (
      <span className="absolute top-1 right-2 md:right-4 md:top-1/2 md:-translate-y-1/2 bg-[#5cc992] text-white text-[9px] md:text-[11px] w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full font-bold">
        {badge}
      </span>
    )}
  </NavLink>
);

export default Sidebar;