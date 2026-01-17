import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaClock,
  FaFileContract,
  FaUserTie,
  FaBuilding,
  FaHome,
  FaLaptop,
  FaDollarSign,
  FaFlag,
  FaCity,
  FaChevronDown,
} from "react-icons/fa";

export default function RegistrationFormStepThree() {
  const navigate = useNavigate();
  const [employmentType, setEmploymentType] = useState("fulltime");
  const [workplaceType, setWorkplaceType] = useState("");
  const [minimumSalary, setMinimumSalary] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [showWorkplaceDropdown, setShowWorkplaceDropdown] = useState(false);

  const workplaceTypes = ["Onsite", "Remote", "Hybrid"];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-[388px] md:max-w-[988px] p-6 md:p-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
            How do you imagine your dream job?
          </h2>

          <div className="flex items-center justify-center gap-2 md:gap-4">
            <div className="w-3 h-3 rounded-full bg-[#163D5C]"></div>
            <div className="w-16 md:w-32 h-0.5 bg-[#163D5C]"></div>
            <div className="w-3 h-3 rounded-full bg-[#163D5C]"></div>
            <div className="w-16 md:w-32 h-0.5 bg-[#163D5C]"></div>
            <div className="w-4 h-4 rounded-full bg-[#163D5C] border-4 border-white shadow-lg"></div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              Employment type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => setEmploymentType("fulltime")}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  employmentType === "fulltime"
                    ? "bg-white text-[#163D5C] shadow-md border-2 border-[#163D5C]"
                    : "bg-gray-100 text-gray-400 border-2 border-transparent"
                }`}
              >
                <FaBriefcase className="text-sm" />
                <span className="text-sm md:text-base">Full time</span>
              </button>
              <button
                type="button"
                onClick={() => setEmploymentType("parttime")}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  employmentType === "parttime"
                    ? "bg-white text-[#163D5C] shadow-md border-2 border-[#163D5C]"
                    : "bg-gray-100 text-gray-400 border-2 border-transparent"
                }`}
              >
                <FaClock className="text-sm" />
                <span className="text-sm md:text-base">Part time</span>
              </button>
              <button
                type="button"
                onClick={() => setEmploymentType("contract")}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  employmentType === "contract"
                    ? "bg-white text-[#163D5C] shadow-md border-2 border-[#163D5C]"
                    : "bg-gray-100 text-gray-400 border-2 border-transparent"
                }`}
              >
                <FaFileContract className="text-sm" />
                <span className="text-sm md:text-base">Contract</span>
              </button>
              <button
                type="button"
                onClick={() => setEmploymentType("freelance")}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  employmentType === "freelance"
                    ? "bg-white text-[#163D5C] shadow-md border-2 border-[#163D5C]"
                    : "bg-gray-100 text-gray-400 border-2 border-transparent"
                }`}
              >
                <FaUserTie className="text-sm" />
                <span className="text-sm md:text-base">Freelance</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">
                Workplace type
              </label>
              <div className="relative">
                <FaBuilding className="absolute left-4 top-4 text-[#163D5C] z-10" />
                <input
                  type="text"
                  value={workplaceType}
                  onChange={(e) => setWorkplaceType(e.target.value)}
                  onFocus={() => setShowWorkplaceDropdown(true)}
                  onBlur={() =>
                    setTimeout(() => setShowWorkplaceDropdown(false), 200)
                  }
                  className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163D5C] focus:border-transparent"
                  placeholder="Select workplace type"
                />
                <FaChevronDown className="absolute right-4 top-4 text-gray-400 pointer-events-none" />
                {showWorkplaceDropdown && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                    {workplaceTypes.map((type, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setWorkplaceType(type);
                          setShowWorkplaceDropdown(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Minimum salary
              </label>
              <div className="relative">
                <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-[#163D5C]" />
                <input
                  type="text"
                  value={minimumSalary}
                  onChange={(e) => setMinimumSalary(e.target.value)}
                  className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163D5C] focus:border-transparent"
                  placeholder="Enter amount"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  $
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Country
            </label>
            <div className="relative">
              <FaFlag className="absolute left-4 top-1/2 -translate-y-1/2 text-[#163D5C]" />
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163D5C] focus:border-transparent"
                placeholder="Enter country"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">City</label>
            <div className="relative">
              <FaCity className="absolute left-4 top-1/2 -translate-y-1/2 text-[#163D5C]" />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163D5C] focus:border-transparent"
                placeholder="Enter city"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 pt-4 justify-center">
            <button
              type="button"
              onClick={() => navigate("/registration/step-2")}
              className="w-full md:w-auto px-12 py-3 border-2 border-[#163D5C] text-[#163D5C] rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="w-full md:w-auto px-12 py-3 bg-[#163D5C] text-white rounded-lg font-medium hover:bg-[#1a4d73] transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
