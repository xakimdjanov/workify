import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaCalendarAlt,
  FaBuilding,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("talent");
  const [gender, setGender] = useState("male");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-[388px] md:max-w-[988px] p-6 md:p-12">
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setActiveTab("talent")}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all flex-1 ${
              activeTab === "talent"
                ? "bg-white text-[#163D5C] shadow-md border-2 border-[#163D5C]"
                : "bg-gray-100 text-gray-400 border-2 border-transparent"
            }`}
          >
            <FaUser className="text-sm" />
            <span>Talent</span>
          </button>
          <button
            onClick={() => setActiveTab("company")}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all flex-1 ${
              activeTab === "company"
                ? "bg-white text-[#163D5C] shadow-md border-2 border-[#163D5C]"
                : "bg-gray-100 text-gray-400 border-2 border-transparent"
            }`}
          >
            <FaBuilding className="text-sm" />
            <span>Company</span>
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                First name
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#163D5C]" />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163D5C] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Last name
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#163D5C]" />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163D5C] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#163D5C]" />
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163D5C] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#163D5C]" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163D5C] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Gender
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setGender("male")}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all flex-1 ${
                    gender === "male"
                      ? "bg-white text-[#163D5C] shadow-md border-2 border-[#163D5C]"
                      : "bg-gray-100 text-gray-400 border-2 border-transparent"
                  }`}
                >
                  <FaUser className="text-sm" />
                  <span>Male</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGender("female")}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all flex-1 ${
                    gender === "female"
                      ? "bg-white text-[#163D5C] shadow-md border-2 border-[#163D5C]"
                      : "bg-gray-100 text-gray-400 border-2 border-transparent"
                  }`}
                >
                  <FaUser className="text-sm" />
                  <span>Female</span>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Date of birth
              </label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-[#163D5C]" />
                <input
                  type="date"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163D5C] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Location
              </label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-[#163D5C]" />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163D5C] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone
              </label>
              <div className="relative">
                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#163D5C]" />
                <input
                  type="tel"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163D5C] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <button
              type="button"
              className="w-full md:w-auto px-12 py-3 border-2 border-[#163D5C] text-[#163D5C] rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => navigate("/registration/step-2")}
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
