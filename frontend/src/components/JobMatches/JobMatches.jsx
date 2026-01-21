import React, { useState, useEffect } from "react";
import { jobApi, talentApi } from "../../services/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaClock,
  FaFileContract,
  FaUserTie,
  FaBuilding,
  FaHome,
  FaFlag,
  FaSearch,
  FaChevronDown,
  FaCity,
  FaDollarSign,
  FaThumbsDown,
} from "react-icons/fa";

export default function JobMatches() {
  const [allJobs, setAllJobs] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);

  const [employmentType, setEmploymentType] = useState("");
  const [workplaceType, setWorkplaceType] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [city, setCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) return;
        const decoded = jwtDecode(token);

        const userRes = await talentApi.getById(decoded.id);
        const rawSkills = userRes.data?.skils || [];
        const parsedUserSkills = Array.isArray(rawSkills)
          ? rawSkills
          : rawSkills.split(",").map((s) => s.trim());

        const lowerUserSkills = parsedUserSkills.map((s) => s.toLowerCase());
        setUserSkills(lowerUserSkills);

        const jobRes = await jobApi.getAll();
        const jobs = jobRes.data || [];

        const sortedJobs = [...jobs].sort((a, b) => {
          const aMatch = lowerUserSkills.some(
            (s) =>
              a.specialty?.toLowerCase().includes(s) ||
              a.occupation?.toLowerCase().includes(s)
          );
          const bMatch = lowerUserSkills.some(
            (s) =>
              b.specialty?.toLowerCase().includes(s) ||
              b.occupation?.toLowerCase().includes(s)
          );
          return bMatch - aMatch;
        });

        setAllJobs(sortedJobs);
      } catch (err) {
        console.error("Xatolik yuz berdi:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const filteredJobs = allJobs.filter((job) => {
    const matchType = employmentType ? job.job_type === employmentType : true;
    const matchWorkplace = workplaceType
      ? job.workplace_type === workplaceType
      : true;
    const matchSalary = minSalary ? job.salary_min >= Number(minSalary) : true;
    const matchCity = city
      ? job.location?.toLowerCase().includes(city.toLowerCase())
      : true;
    const matchSearch = searchQuery
      ? job.occupation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company?.company_name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
      : true;

    return (
      matchType && matchWorkplace && matchSalary && matchCity && matchSearch
    );
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#505151]">Job Matches</h2>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-gray-50 rounded-full transition-all"
            >
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-8 space-y-8">
              <div>
                <label className="block text-gray-700 font-bold mb-4">
                  Employment type
                </label>
                <div className="flex flex-wrap bg-[#F1F3F6] rounded-2xl p-1 gap-1 w-fit">
                  {["Full time", "Part time", "Contract", "Freelance"].map(
                    (type) => (
                      <button
                        key={type}
                        onClick={() =>
                          setEmploymentType(employmentType === type ? "" : type)
                        }
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                          employmentType === type
                            ? "bg-white text-[#163D5C] shadow-sm"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        {type === "Full time" && <FaBriefcase />}
                        {type === "Part time" && <FaClock />}
                        {type === "Contract" && <FaFileContract />}
                        {type === "Freelance" && <FaUserTie />}
                        {type}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-gray-700 font-bold mb-4">
                    Workplace type
                  </label>
                  <div className="flex bg-[#F1F3F6] rounded-2xl p-1 gap-1 w-fit">
                    {["Onsite", "Remote", "Hybrid"].map((type) => (
                      <button
                        key={type}
                        onClick={() =>
                          setWorkplaceType(workplaceType === type ? "" : type)
                        }
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                          workplaceType === type
                            ? "bg-white text-[#163D5C] shadow-sm"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        {type === "Onsite" && <FaBuilding />}
                        {type === "Remote" && <FaHome />}
                        {type === "Hybrid" && <FaFlag />}
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-4">
                    Minimum salary
                    <span className="text-gray-300 font-medium">(USD)</span>
                  </label>
                  <div className="relative">
                    <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-[#163D5C]" />
                    <input
                      type="number"
                      className="w-full pl-12 pr-4 py-4 bg-[#F9FAFB] border-none rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none font-bold"
                      placeholder="e.g. 500"
                      value={minSalary}
                      onChange={(e) => setMinSalary(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-4">
                  City
                </label>
                <div className="relative max-w-sm">
                  <FaCity className="absolute left-4 top-1/2 -translate-y-1/2 text-[#163D5C]" />
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-4 bg-[#F9FAFB] border-none rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none font-bold"
                    placeholder="Search city..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mb-10">
          <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 text-xl" />
          <input
            type="text"
            className="w-full pl-16 pr-40 py-5 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none font-medium text-gray-600"
            placeholder="Write something about the job you are looking for..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#163D5C] text-white px-10 py-3 rounded-xl font-bold hover:bg-[#0f2d45] transition-all">
            Search
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center px-2">
            <p className="text-gray-500 font-bold">
              {filteredJobs.length} jobs available
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-gray-100 border-t-[#163D5C] rounded-full animate-spin"></div>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const isMatch =
                userSkills.length > 0 &&
                userSkills.some(
                  (s) =>
                    job.specialty?.toLowerCase().includes(s) ||
                    job.occupation?.toLowerCase().includes(s)
                );

              return (
                <div
                  key={job.id}
                  className={`bg-white rounded-[32px] p-8 border transition-all duration-300 ${
                    isMatch
                      ? "border-blue-100 bg-blue-50/10 shadow-md"
                      : "border-gray-50 shadow-sm"
                  }`}
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex gap-5">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-gray-50 p-2 shrink-0 shadow-sm">
                        <img
                          src={
                            job.company?.profileimg_url ||
                            "https://via.placeholder.com/100"
                          }
                          alt="logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {job.company?.company_name}
                        </h3>
                        <p className="text-gray-400 text-sm font-bold">
                          {job.company.city}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          {[1, 2, 3, 4].map((i) => (
                            <span key={i} className="text-yellow-400 text-sm">
                              ★
                            </span>
                          ))}
                          <span className="text-gray-200 text-sm">★</span>
                          <span className="text-gray-400 text-xs font-bold ml-1">
                            (4.0) 1K reviews
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-2">
                      <div className="flex items-center gap-2 text-gray-500 font-bold text-sm">
                        <FaCity className="text-blue-300" />{" "}
                        {job.company.city || "Tashkent, Uzbekistan"}
                      </div>
                      <p className="text-gray-400 text-xs font-bold">
                        4 days ago
                      </p>
                      <span className="bg-[#E7F8F0] text-[#52D394] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                        {job.workplace_type}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-between items-center mt-6 mb-4">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-black text-slate-800">
                        {job.occupation}
                      </h2>
                      {isMatch && (
                        <span className="bg-[#163D5C] text-white text-[10px] px-3 py-1 rounded-full font-black uppercase">
                          Best Match
                        </span>
                      )}
                    </div>
                    <span className="text-2xl font-black text-slate-800">
                      ${job.salary_min}-{job.salary_max}
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6 line-clamp-2">
                    {job.description ||
                      "Looking for a talented professional to join our fast-growing team. You will be responsible for high-quality deliverables..."}
                    <span className="text-blue-400 cursor-pointer ml-1">
                      more
                    </span>
                  </p>

                  <div className="mb-8">
                    <p className="text-gray-800 font-black text-sm mb-3">
                      Required skills:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-5 py-2.5 bg-[#F1F3F6] text-gray-600 rounded-xl text-xs font-bold border border-transparent">
                        {job.skils}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-50">
                    <button className="text-gray-300 hover:text-red-400 transition-colors mr-auto">
                      <FaThumbsDown size={22} />
                    </button>

                    <button
                      onClick={() => navigate(`/job-post/${job.id}`)}
                      className="px-10 py-4 bg-[#163D5C] text-white rounded-2xl font-black hover:bg-[#0f2d45] transition-all shadow-lg shadow-blue-900/10"
                    >
                      Quick apply
                    </button>

                    <button
                      onClick={() => navigate(`/job-details/${job.company_id}`)}
                      className="px-8 py-4 border-2 border-[#163D5C] text-[#163D5C] rounded-2xl font-black hover:bg-gray-50 transition-all cursor-pointer"
                    >
                      View job post
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
