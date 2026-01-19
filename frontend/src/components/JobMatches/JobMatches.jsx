import React, { useState, useEffect } from "react";
import {
  FaBriefcase,
  FaClock,
  FaFileContract,
  FaUserTie,
  FaBuilding,
  FaHome,
  FaFlag,
  FaDollarSign,
  FaCity,
  FaChevronDown,
  FaHeart,
  FaThumbsUp,
  FaEye,
  FaSearch,
} from "react-icons/fa";

export default function JobMatches() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employmentType, setEmploymentType] = useState("fulltime");
  const [workplaceType, setWorkplaceType] = useState("");
  const [minimumSalary, setMinimumSalary] = useState("");
  const [city, setCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const [allJobs, setAllJobs] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState([]);

  const employmentTypes = [
    { id: "fulltime", label: "Full time", icon: <FaBriefcase /> },
    { id: "parttime", label: "Part time", icon: <FaClock /> },
    { id: "contract", label: "Contract", icon: <FaFileContract /> },
    { id: "freelance", label: "Freelance", icon: <FaUserTie /> },
  ];

  useEffect(() => {
    setTimeout(() => {
      const mockJobs = [
        {
          id: 1,
          company: "TechCells",
          logo: "https://via.placeholder.com/48/163D5C/fff?text=TC",
          title: "UX/UI Designer",
          location: "Tashkent, Uzbekistan",
          posted: "4 days ago",
          salary: 700, 
          salaryDisplay: "$400–1,000",
          city: "Tashkent",
          applications: 15,
          isHiring: true,
          rating: "4.0",
          reviews: "1K",
          skills: [
            "Figma (2 years)",
            "Adobe Photoshop (1 year)",
            "Responsive UX/UI (5 years)",
            "Adobe XD (1 year)",
          ],
        },
        {
          id: 2,
          company: "TechCells",
          logo: "https://via.placeholder.com/48/163D5C/fff?text=TC",
          title: "Frontend Developer",
          location: "Samarkand, Uzbekistan",
          posted: "2 days ago",
          salary: 1200,
          salaryDisplay: "$1,000–1,500",
          city: "Samarkand",
          applications: 8,
          isHiring: false,
          rating: "4.2",
          reviews: "320",
          skills: ["React", "Tailwind CSS", "TypeScript"],
        },
      ];
      setAllJobs(mockJobs);
      setDisplayedJobs(mockJobs);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    let filtered = [...allJobs];

    if (minimumSalary && !isNaN(Number(minimumSalary))) {
      const minSal = Number(minimumSalary);
      filtered = filtered.filter((job) => job.salary >= minSal);
    }

    if (city.trim()) {
      const searchCity = city.trim().toLowerCase();
      filtered = filtered.filter((job) =>
        job.city.toLowerCase().includes(searchCity)
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query)
      );
    }

    setDisplayedJobs(filtered);
  }, [minimumSalary, city, searchQuery, allJobs]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="px-6 pt-6 pb-4 border-b">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Job Matches
                </h1>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1.5 text-[#163D5C] hover:text-[#124a75] font-medium transition-colors"
                >
                  {isExpanded ? "Hide filters" : "Filters"}
                  <FaChevronDown
                    className={`text-sm transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
            <div className="px-6 pt-5 pb-6">
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2.5">
                  Employment type
                </label>
                <div className="relative bg-gray-50 rounded-full border border-gray-200 p-1 overflow-hidden">
                  <div
                    className="absolute inset-y-0 bg-[#163D5C]/10 rounded-full transition-all duration-400"
                    style={{
                      width: "25%",
                      transform: `translateX(${
                        employmentTypes.findIndex(
                          (t) => t.id === employmentType
                        ) * 100
                      }%)`,
                    }}
                  />
                  <div className="relative grid grid-cols-4">
                    {employmentTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setEmploymentType(type.id)}
                        className={`
            relative z-10 flex items-center justify-center gap-1.5 md:gap-2 
            py-2.5 md:py-3.5 text-sm md:text-base font-medium transition-colors duration-200
            ${
              employmentType === type.id
                ? "text-[#163D5C]"
                : "text-gray-600 hover:text-gray-800"
            }
          `}
                      >
                        <span className="text-base md:text-lg">
                          {type.icon}
                        </span>
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className={`transition-all duration-400 ease-in-out overflow-hidden ${
                  isExpanded
                    ? "max-h-[600px] opacity-100 translate-y-0"
                    : "max-h-0 opacity-0 -translate-y-2"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2.5">
                      Workplace type
                    </label>
                    <div className="relative bg-gray-50 rounded-full border border-gray-200 p-1 overflow-hidden">
                      <div
                        className="absolute inset-y-0 bg-[#163D5C]/10 rounded-full transition-all duration-400"
                        style={{
                          width: "25%",
                          transform: `translateX(${
                            ["", "Onsite", "Remote", "Hybrid"].indexOf(
                              workplaceType
                            ) * 100
                          }%)`,
                        }}
                      />
                      <div className="relative flex">
                        {["", "Onsite", "Remote", "Hybrid"].map((type) => (
                          <button
                            key={type}
                            onClick={() => setWorkplaceType(type)}
                            className={`
            relative z-10 flex-1 flex items-center justify-center gap-1.5 md:gap-2 
            py-3 text-sm md:text-base font-medium transition-colors duration-200
            ${
              workplaceType === type
                ? "text-[#163D5C]"
                : "text-gray-600 hover:text-gray-800"
            }
          `}
                          >
                            {type === "Onsite" && (
                              <FaBuilding className="text-base" />
                            )}
                            {type === "Remote" && (
                              <FaHome className="text-base" />
                            )}
                            {type === "Hybrid" && (
                              <FaFlag className="text-base" />
                            )}
                            {type || "All"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2.5">
                      Minimum salary (USD)
                    </label>
                    <div className="relative">
                      <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-[#163D5C]" />
                      <input
                        type="number"
                        value={minimumSalary}
                        onChange={(e) => setMinimumSalary(e.target.value)}
                        className="w-full pl-12 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-[#163D5C]/30 focus:border-[#163D5C] outline-none"
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-gray-700 font-medium mb-2.5">
                    City
                  </label>
                  <div className="relative max-w-md">
                    <FaCity className="absolute left-4 top-1/2 -translate-y-1/2 text-[#163D5C]" />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-[#163D5C]/30 focus:border-[#163D5C] outline-none"
                      placeholder="Enter city"
                    />
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Write something about the job you are looking for..."
                    className="w-full pl-12 pr-36 py-3.5 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-[#163D5C]/30 focus:border-[#163D5C] outline-none"
                  />
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#163D5C] text-white px-6 py-2.5 rounded-full hover:bg-[#124a75] transition text-sm font-medium">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-5">
              {displayedJobs.length} matching jobs
            </h3>

            {loading ? (
              <div className="text-center py-12 text-gray-500">Loading...</div>
            ) : displayedJobs.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No jobs match your filters
              </div>
            ) : (
              <div className="space-y-6">
                {displayedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-xl shadow-sm p-5 md:p-6 hover:shadow-md transition-shadow border border-gray-100"
                  >
                    <div className="flex flex-col md:flex-row gap-5 md:gap-6">
                      <img
                        src={job.logo}
                        alt={job.company}
                        className="w-16 h-16 rounded-xl object-cover bg-[#163D5C]/10"
                      />
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {job.title}
                            </h3>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-gray-600 text-sm">
                              <span className="font-medium">{job.company}</span>
                              <span>•</span>
                              <span>{job.location}</span>
                              <span>•</span>
                              <span>{job.posted}</span>
                            </div>
                          </div>
                          {job.isHiring && (
                            <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                              Now hiring
                            </span>
                          )}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-700">
                          <div className="flex items-center gap-1.5">
                            <FaDollarSign className="text-[#163D5C]" />
                            {job.salary}
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★★★★☆</span>
                            <span>
                              ({job.rating}) | {job.reviews} reviews
                            </span>
                          </div>
                          <div>{job.applications} applications</div>
                        </div>

                        <div className="mt-5">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Required skills:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                          <button className="px-6 py-2.5 bg-[#163D5C] text-white rounded-lg hover:bg-[#124a75] transition flex items-center gap-2 text-sm font-medium">
                            <FaThumbsUp className="text-sm" /> Quick apply
                          </button>
                          <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 text-sm font-medium">
                            <FaEye className="text-sm" /> View job post
                          </button>
                          <button className="p-2.5 border border-gray-300 text-gray-500 rounded-lg hover:bg-gray-50 transition">
                            <FaHeart />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
