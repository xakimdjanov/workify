import React from "react";

const Header = () => {
  return (
    <div>
      <nav className="flex items-center justify-between px-6 md:px-16 py-4 bg-white">
        <div className="flex items-center gap-10">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 cursor-pointer">
            workify
          </h1>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
            <a
              href="#"
              className="flex items-center gap-2 hover:text-slate-900 transition"
            >
              <span className="text-gray-400">👤</span> Talents
            </a>
            <a
              href="#"
              className="flex items-center gap-2 hover:text-slate-900 transition"
            >
              <span className="text-gray-400">💼</span> Jobs
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-2 border border-gray-300 rounded-lg font-semibold text-slate-700 hover:bg-gray-50 transition">
            Sign in
          </button>
          <button className="px-6 py-2 bg-[#1B3B5A] text-white rounded-lg font-semibold hover:bg-slate-800 transition">
            Join Now
          </button>
          <div className="flex items-center gap-1 text-sm font-semibold ml-2 cursor-pointer text-slate-600">
            Eng <span className="text-[10px] transform scale-75">▼</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
