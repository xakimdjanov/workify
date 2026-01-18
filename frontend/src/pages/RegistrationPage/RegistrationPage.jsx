import React, { useState, useEffect } from "react";
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
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("talent");
  const [showPassword, setShowPassword] = useState(false);

  // Ma'lumotlarni saqlash uchun state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    gender: "male",
    date_of_birth: "",
    location: "",
    phone: "",
  });

  // Agar avval ma'lumot kiritilgan bo'lsa, uni localStorage dan yuklab olish
  useEffect(() => {
    const savedData = localStorage.getItem("step1_data");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Input o'zgarganda state-ni yangilash
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gender o'zgarganda alohida funksiya
  const handleGenderChange = (value) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  // Keyingi bosqichga o'tish
  const handleNext = (e) => {
    e.preventDefault();
    
    // Oddiy tekshiruv (Validation)
    if (!formData.first_name || !formData.email || !formData.password) {
      alert("Iltimos, ism, email va parolni to'ldiring!");
      return;
    }

    // Ma'lumotlarni vaqtincha saqlash
    localStorage.setItem("step1_data", JSON.stringify(formData));
    localStorage.setItem("user_role", activeTab);
    
    // 2-qadamga o'tish
    navigate("/registration/step-2");
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-8">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-[388px] md:max-w-[988px] p-6 md:p-12">
          
          {/* Tablar: Talent yoki Company */}
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

          <form onSubmit={handleNext} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">First name</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#163D5C]" />
                  <input
                    name="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163D5C]"
                  />
                </div>
              </div>
              {/* Last Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Last name</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#163D5C]" />
                  <input
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163D5C]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#163D5C]" />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.com"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163D5C]"
                  />
                </div>
              </div>
              {/* Password */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#163D5C]" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="********"
                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163D5C]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gender Selection */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Gender</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleGenderChange("male")}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all flex-1 ${
                      formData.gender === "male"
                        ? "bg-white text-[#163D5C] shadow-md border-2 border-[#163D5C]"
                        : "bg-gray-100 text-gray-400 border-2 border-transparent"
                    }`}
                  >
                    <FaUser className="text-sm" />
                    <span>Male</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenderChange("female")}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all flex-1 ${
                      formData.gender === "female"
                        ? "bg-white text-[#163D5C] shadow-md border-2 border-[#163D5C]"
                        : "bg-gray-100 text-gray-400 border-2 border-transparent"
                    }`}
                  >
                    <FaUser className="text-sm" />
                    <span>Female</span>
                  </button>
                </div>
              </div>
              {/* Date of Birth */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Date of birth</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-[#163D5C]" />
                  <input
                    name="date_of_birth"
                    type="date"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163D5C]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Location</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-[#163D5C]" />
                  <input
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Tashkent, Uzbekistan"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163D5C]"
                  />
                </div>
              </div>
              {/* Phone */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone</label>
                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#163D5C]" />
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+998 90 123 45 67"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163D5C]"
                  />
                </div>
              </div>
            </div>

            {/* Tugmalar */}
            <div className="flex flex-col md:flex-row gap-4 pt-4 justify-center">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full md:w-auto px-12 py-3 border-2 border-[#163D5C] text-[#163D5C] rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full md:w-auto px-12 py-3 bg-[#163D5C] text-white rounded-lg font-medium hover:bg-[#1a4d73] transition-colors shadow-lg"
              >
                Next Step
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}