import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#1B3B5A] text-white px-6 md:px-16 py-16 mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-20">
            {/* Footer Logo Section */}
            <div className="col-span-2 md:col-span-1">
              <h2 className="text-2xl font-bold mb-1">workify</h2>
              <p className="text-slate-400 text-xs mb-8 font-medium">
                Job posting platform
              </p>
              <button className="bg-white text-slate-800 px-10 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-100 transition">
                Contacts
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <h5 className="font-bold text-sm tracking-wide">General</h5>
              <div className="flex flex-col gap-2.5 text-slate-400 text-sm">
                <a href="#" className="hover:text-white transition">
                  Sign up
                </a>
                <a href="#" className="hover:text-white transition">
                  Contacts
                </a>
                <a href="#" className="hover:text-white transition">
                  About
                </a>
                <a href="#" className="hover:text-white transition">
                  FAQ
                </a>
                <a href="#" className="hover:text-white transition">
                  Partners
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h5 className="font-bold text-sm tracking-wide">Company</h5>
              <div className="flex flex-col gap-2.5 text-slate-400 text-sm">
                <a href="#" className="hover:text-white transition">
                  Post a job
                </a>
                <a href="#" className="hover:text-white transition">
                  Search talents
                </a>
                <a href="#" className="hover:text-white transition">
                  Company login
                </a>
                <a href="#" className="hover:text-white transition">
                  Company advice
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h5 className="font-bold text-sm tracking-wide">Talents</h5>
              <div className="flex flex-col gap-2.5 text-slate-400 text-sm">
                <a href="#" className="hover:text-white transition">
                  Search jobs
                </a>
                <a href="#" className="hover:text-white transition">
                  Talent login
                </a>
                <a href="#" className="hover:text-white transition">
                  Talent advice
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-700 flex flex-col md:row justify-between items-center gap-6">
            <p className="text-slate-400 text-xs">All rights reserved 2021</p>
            <div className="flex gap-6 items-center">
              <span className="w-5 h-5 bg-slate-500 rounded-full cursor-pointer hover:bg-white transition opacity-60"></span>
              <span className="w-5 h-5 bg-slate-500 rounded-full cursor-pointer hover:bg-white transition opacity-60"></span>
              <span className="w-5 h-5 bg-slate-500 rounded-full cursor-pointer hover:bg-white transition opacity-60"></span>
              <span className="w-5 h-5 bg-slate-500 rounded-full cursor-pointer hover:bg-white transition opacity-60"></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
