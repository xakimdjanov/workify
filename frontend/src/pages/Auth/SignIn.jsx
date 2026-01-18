import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

// API bazaviy manzilini sozlash
const API_BASE_URL =  "http://localhost:5000/api";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/talent/login`, 
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      const { token } = res.data;
      if (token) {
        localStorage.setItem("token", token);
        alert("Login muvaffaqiyatli!");
        navigate("/");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Login yoki parol xato!";
      if (error.response?.status === 404) {
        alert("Serverdagi manzil topilmadi (404). Backend manzilini tekshiring.");
      } else {
        alert(message);
      }
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col justify-center items-center bg-gray-100 py-10">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">Login</h2>
        
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm border border-gray-200"
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
              <input
                type="email"
                id="email"
                placeholder="admin@gmail.com"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <IoMdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#163D5C] hover:bg-[#0f2a40]"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#163D5C] font-bold hover:underline">
              Register
            </Link>
          </p>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;