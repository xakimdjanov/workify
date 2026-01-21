import React, { useEffect, useState } from "react";
import { applicationApi } from "../../services/api";
import {
  FaChevronDown,
  FaBriefcase,
  FaClock,
  FaFileContract,
  FaUserTie,
  FaBuilding,
  FaHome,
  FaFlag,
  FaSearch,
  FaMapMarkerAlt,
  FaTrashAlt,
  FaEye,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CompImg from "../../assets/bg.png";

export default function JobAlerts() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  const navigate = useNavigate();

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await applicationApi.getAll();
      setApplications(
        Array.isArray(res.data) ? res.data : res.data?.data || []
      );
    } catch (err) {
      console.error("Arizalarni yuklashda xato:", err);
      toast.error("Ma'lumotlarni yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Haqiqatdan ham ushbu arizani bekor qilmoqchimisiz?")) {
      try {
        await applicationApi.delete(id);
        toast.success("Ariza muvaffaqiyatli o'chirildi");
        setApplications(applications.filter((app) => app.id !== id));
      } catch (err) {
        toast.error("O'chirishda xatolik yuz berdi");
      }
    }
  };

  const filteredApps = applications.filter((app) => {
    if (filterStatus === "all") return true;
    return app.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-black text-[#163D5C]">
              Job Alerts
            </h2>
            <button onClick={() => setIsFilterExpanded(!isFilterExpanded)}>
              <FaChevronDown
                className={`transition-transform ${
                  isFilterExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {isFilterExpanded && (
            <div className="p-8">
              <label className="block text-gray-700 font-bold mb-4">
                Filter by Status
              </label>
              <div className="flex flex-wrap bg-[#F1F3F6] rounded-2xl p-1 gap-1 w-fit">
                {[
                  { id: "all", label: "All", icon: <FaBriefcase /> },
                  { id: "pending", label: "Pending", icon: <FaClock /> },
                  {
                    id: "accepted",
                    label: "Accepted",
                    icon: <FaFileContract />,
                  },
                  { id: "rejected", label: "Rejected", icon: <FaUserTie /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFilterStatus(tab.id)}
                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${
                      filterStatus === tab.id
                        ? "bg-white text-[#163D5C] shadow-sm"
                        : "text-gray-400"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <p className="text-gray-500 font-bold ml-2">
            {filteredApps.length} applications found
          </p>

          {loading ? (
            <div className="text-center py-20 animate-pulse text-gray-400 font-bold">
              Loading applications...
            </div>
          ) : filteredApps.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[32px] border border-dashed text-gray-400">
              Arizalar topilmadi.
            </div>
          ) : (
            filteredApps.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-[32px] p-8 border border-gray-50 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex gap-5">
                    <div className="w-16 h-16 bg-[#F9FAFB] rounded-2xl flex items-center justify-center border p-2">
                      <img
                        src={app.job?.company?.profileimg_url || CompImg}
                        alt="logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-800">
                        {app.job?.occupation}
                      </h3>
                      <p className="text-gray-400 font-bold text-sm">
                        {app.job?.company?.company_name}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-gray-400 text-xs font-bold">
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt className="text-blue-300" />{" "}
                          {app.job?.location}
                        </span>
                        <span className="flex items-center gap-1 uppercase px-3 py-1 bg-gray-100 rounded-lg text-[10px]">
                          {app.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="md:text-right">
                    <p className="text-2xl font-black text-slate-800">
                      ${app.job?.salary_max}.00
                    </p>
                    <p className="text-gray-400 text-xs font-bold mt-1">
                      Applied on: {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                  <p className="text-gray-500 text-sm italic line-clamp-1 max-w-[60%]">
                    "{app.cover_letter || "No cover letter provided."}"
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="p-4 bg-red-50 text-red-400 rounded-2xl hover:bg-red-100 transition-all"
                      title="Cancel Application"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
