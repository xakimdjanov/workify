import React, { useState } from "react";
import { FiUser, FiBriefcase, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="px-4 sm:px-6 md:px-16 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <Link to="/">
          <h1 className="text-2xl font-bold text-slate-800 cursor-pointer">
            workify
          </h1>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
            <a className="flex items-center gap-2 hover:text-slate-900 transition">
              <FiUser className="text-lg" /> Talents
            </a>
            <a className="flex items-center gap-2 hover:text-slate-900 transition">
              <FiBriefcase className="text-lg" /> Jobs
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/signin">
            <button className="hidden sm:block px-5 py-2 border rounded-lg font-semibold">
              Sign in
            </button>
            </Link>
            <button className="hidden sm:block px-5 py-2 bg-[#1B3B5A] text-white rounded-lg font-semibold">
              Join Now
            </button>

            <button
              className="md:hidden text-2xl"
              onClick={() => setOpen(true)}
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </nav>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      <div
        className={`fixed top-0 left-0 w-full h-64 bg-white z-50
        transform transition-transform duration-300
        ${open ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setOpen(false)} className="text-2xl">
            <FiX />
          </button>
        </div>

        <div className="flex flex-col gap-5 p-5 text-sm font-medium text-slate-700">
          <a className="flex items-center gap-3 text-base hover:text-slate-900 transition">
            <FiUser className="text-lg" /> Talents
          </a>
          <a className="flex items-center gap-3 text-base hover:text-slate-900 transition">
            <FiBriefcase className="text-lg" /> Jobs
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
