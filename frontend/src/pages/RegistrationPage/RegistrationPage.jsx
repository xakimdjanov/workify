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

  useEffect(() => {
    const savedData = localStorage.getItem("step1_data");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (value) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (!formData.first_name || !formData.email || !formData.password) {
      alert("Iltimos, ism, email va parolni to'ldiring!");
      return;
    }

    localStorage.setItem("step1_data", JSON.stringify(formData));
    localStorage.setItem("user_role", activeTab);

    navigate("/registration/step-2");
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-8">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-[388px] md:max-w-[988px] p-6 md:p-12">
          <div className="relative bg-gray-100 rounded-[50px] border border-gray-200 grid grid-cols-2 p-1 mb-8 overflow-hidden">
            <div
              className="absolute top-1 bottom-1 left-1 w-[calc(50%-0.5rem)] bg-white rounded-[50px] shadow-md transition-all duration-300"
              style={{
                transform: `translateX(${
                  activeTab === "company" ? "100%" : "0%"
                })`,
              }}
            ></div>

            <button
              type="button"
              onClick={() => setActiveTab("talent")}
              className={`flex items-center justify-center gap-2 px-6 py-3 relative z-10 font-medium transition-colors duration-200 ${
                activeTab === "talent" ? "text-[#163D5C]" : "text-gray-400"
              }`}
            >
              <FaUser className="text-sm" />
              <span>Talent</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("company")}
              className={`flex items-center justify-center gap-2 px-6 py-3 relative z-10 font-medium transition-colors duration-200 ${
                activeTab === "company" ? "text-[#163D5C]" : "text-gray-400"
              }`}
            >
              <FaBuilding className="text-sm" />
              <span>Company</span>
            </button>
          </div>

          <form onSubmit={handleNext} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  First name
                </label>
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
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Last name
                </label>
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
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
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
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
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
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Gender
                </label>
                <div className="relative bg-gray-100 rounded-[50px] border border-gray-200 grid grid-cols-2 p-1 overflow-hidden">
                  <div
                    className="absolute top-1 bottom-1 left-1 w-[calc(50%-0.5rem)] bg-white rounded-[50px] shadow-md transition-all duration-300"
                    style={{
                      transform: `translateX(${
                        formData.gender === "female" ? "100%" : "0%"
                      })`,
                    }}
                  ></div>

                  <button
                    type="button"
                    onClick={() => handleGenderChange("male")}
                    className={`flex items-center justify-center gap-2 px-6 py-3 relative z-10 font-medium transition-colors duration-200 ${
                      formData.gender === "male"
                        ? "text-[#163D5C]"
                        : "text-gray-400"
                    }`}
                  >
                    <FaUser className="text-sm" />
                    <span>Male</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleGenderChange("female")}
                    className={`flex items-center justify-center gap-2 px-6 py-3 relative z-10 font-medium transition-colors duration-200 ${
                      formData.gender === "female"
                        ? "text-[#163D5C]"
                        : "text-gray-400"
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
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Location
                </label>
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
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Phone
                </label>
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
