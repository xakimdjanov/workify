import React, { useState, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { talentApi } from "../../services/api"; 
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // ✅ Yangi state
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (errors.email || errors.password) {
      setErrors({
        email: false,
        password: false,
      });
    }
  }, [formData.email, formData.password]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email maydonini to'ldiring";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email formati noto'g'ri";
    }
    
    if (!formData.password) {
      newErrors.password = "Parol maydonini to'ldiring";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validatsiyasi
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors({
        email: !!validationErrors.email,
        password: !!validationErrors.password,
      });
      
      toast.error(validationErrors.email || validationErrors.password, {
        duration: 4000,
        position: "top-right",
        style: {
          background: '#fef2f2',
          color: '#991b1b',
          border: '1px solid #fca5a5',
        },
      });
      return;
    }
    
    // Remember me checkbox tekshirish ✅
    if (!rememberMe) {
      toast.error("Iltimos, 'Remember me' qutisini belgilang", {
        duration: 4000,
        position: "top-right",
        style: {
          background: '#fef2f2',
          color: '#991b1b',
          border: '1px solid #fca5a5',
        },
      });
      return;
    }
    
    setLoading(true);

    try {
      const res = await talentApi.login(formData);
      const { token } = res.data; 
      
      if (token) {
        localStorage.setItem("token", token);
        
        toast.success("Muvaffaqiyatli kirildi!", {
          duration: 3000,
          position: "top-right",
          style: {
            background: '#f0fdf4',
            color: '#166534',
            border: '1px solid #86efac',
          },
        });
        
        setTimeout(() => navigate("/dashboard"), 1500);
      }
    } catch (error) {
      console.error("Login Error:", error);
      
      setErrors({
        email: true,
        password: true,
      });
      
      let errorMessage = "Email yoki parol noto'g'ri";
      
      if (error.response) {
        switch (error.response.status) {
          case 401:
            errorMessage = "Email yoki parol noto'g'ri";
            break;
          case 404:
            errorMessage = "Foydalanuvchi topilmadi";
            break;
          case 500:
            errorMessage = "Server xatosi. Iltimos, keyinroq urinib ko'ring";
            break;
          default:
            errorMessage = "Tizimda xatolik yuz berdi";
        }
      } else if (error.request) {
        errorMessage = "Serverga ulanib bo'lmadi. Internet aloqasini tekshiring";
      }
      
      toast.error(errorMessage, {
        duration: 5000,
        position: "top-right",
        style: {
          background: '#fef2f2',
          color: '#991b1b',
          border: '1px solid #fca5a5',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: '14px',
            fontWeight: '500',
            borderRadius: '8px',
            padding: '12px 16px',
          },
          success: {
            style: {
              background: '#f0fdf4',
              color: '#166534',
              border: '1px solid #86efac',
            },
            iconTheme: {
              primary: '#16a34a',
              secondary: '#fff',
            },
          },
          error: {
            style: {
              background: '#fef2f2',
              color: '#991b1b',
              border: '1px solid #fca5a5',
            },
            iconTheme: {
              primary: '#dc2626',
              secondary: '#fff',
            },
          },
        }}
        containerStyle={{
          top: 80,
          right: 20,
        }}
      />

      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col justify-center items-center bg-gray-100 py-10 px-4">
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
                <MdEmail className={`absolute left-3 top-1/2 -translate-y-1/2 text-xl ${
                  errors.email ? "text-red-500" : "text-gray-400"
                }`} />
                <input
                  type="email"
                  id="email"
                  placeholder="admin@gmail.com"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 outline-none transition ${
                    errors.email 
                      ? "border-red-500 focus:ring-red-300 bg-red-50" 
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <IoMdLock className={`absolute left-3 top-1/2 -translate-y-1/2 text-xl ${
                  errors.password ? "text-red-500" : "text-gray-400"
                }`} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 outline-none transition ${
                    errors.password 
                      ? "border-red-500 focus:ring-red-300 bg-red-50" 
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                    errors.password ? "text-red-500 hover:text-red-700" : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-between pb-6">
              <div className="flex items-center gap-1">
                <input 
                  type="checkbox" 
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="cursor-pointer"
                />
                <label 
                  htmlFor="rememberMe" 
                  className="text-sm cursor-pointer select-none"
                >
                  Remember me
                </label>
              </div>
              <Link to="/forgotpass" className="text-sm cursor-pointer">Forgot Password?</Link>
            </div>

            <button
              type="submit"
              disabled={loading || !rememberMe} // ✅ Disabled agar rememberMe false bo'lsa
              className={`w-full py-2 rounded-lg text-white font-semibold transition ${
                loading || !rememberMe 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-[#163D5C] hover:bg-[#0f2a40]"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </span>
              ) : "Sign In"}
            </button>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{" "}
              <Link to="/registration/step-1" className="text-[#163D5C] font-bold hover:underline">
                Register
              </Link>
            </p>
          </form>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default SignIn;