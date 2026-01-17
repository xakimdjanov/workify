import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://dummyjson.com/users", {
        email,
        password,
      });

      alert("Login muvaffaqiyatli!");

      localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Xato yuz berdi");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm"
      >
        <label htmlFor="email" className="cursor-pointer">
          Email
        </label>
        <div className="relative mt-2">
          <MdEmail className="absolute left-2 top-2 text-2xl text-[#163D5C]" />
          <input
            type="email"
            id="email"
            placeholder="Forexaplae@mail.ru"
            className="w-full px-10 py-2 border rounded-lg mb-4 
          focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <label htmlFor="password" className="cursor-pointer">
          Password
        </label>
        <div className="relative mt-2">
          <IoMdLock className="absolute left-2 top-2 text-2xl text-[#163D5C]" />
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password"
            className="w-full px-10 py-2 border rounded-lg mb-4 
          focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
          type="button"
          className="absolute right-3 top-2 text-xl text-gray-600"
          onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>

        <div className="flex items-center gap-2 pb-6">
          <input type="checkbox" />
          <p className="text-sm">Remember me</p>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-6/12 bg-[#163D5C] text-white py-2 rounded-lg text-lg font-medium 
          hover:bg-[#163D6C] transition"
          >
            Sign In
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Have no account yet?{" "}
          <Link to="/signup" className="text-[#163D5C] hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
