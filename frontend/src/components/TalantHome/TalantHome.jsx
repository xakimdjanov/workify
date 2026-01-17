import React from "react";
import {
  HiOutlineUserAdd,
  HiOutlineChatAlt2,
  HiOutlineSearch,
} from "react-icons/hi";
import { FiBriefcase } from "react-icons/fi";
import { MdOutlineWorkOutline } from "react-icons/md";
import heroImage from "../../assets/homeimg.png";
import Header from "../../pages/Header/Header";
import Footer from "../../pages/Footer/Footer";

const TalantHome = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 overflow-x-hidden">
      <Header />
      {/* Hero Section */}
      <section className="relative px-4 sm:px-8 md:px-16 lg:px-24 py-10 md:py-20 flex flex-col lg:flex-row items-center max-w-[1440px] mx-auto gap-12">
        {/* Left text & search */}
        <div className="w-full lg:w-1/2 z-10 text-center lg:text-left order-2 lg:order-1">
          <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-extrabold leading-tight text-slate-900 mb-4">
            Find aspiring talents <br className="hidden md:block" /> and great
            employers
          </h2>
          <p className="text-gray-500 text-sm md:text-base mb-6 md:mb-8 max-w-sm mx-auto lg:mx-0 leading-relaxed">
            Finding the best candidate is always hard. Tell us what you are
            looking for and choose one from among the best.
          </p>
          <div className="bg-white p-1.5 rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.08)] flex flex-col md:flex-row items-center gap-1.5 max-w-lg border border-gray-100">
            <div className="flex-1 px-3 py-2 text-left w-full border-b md:border-b-0 md:border-r border-gray-100">
              <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                Hire a talent
              </label>
              <div className="flex items-center gap-2">
                <HiOutlineSearch className="text-gray-300 text-xs" />
                <input
                  type="text"
                  placeholder="Who are you looking for?"
                  className="w-full outline-none text-xs text-slate-700 placeholder:text-gray-300 bg-transparent"
                />
              </div>
            </div>
            <div className="flex-1 px-3 py-2 text-left w-full">
              <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                Find a job
              </label>
              <div className="flex items-center gap-2">
                <MdOutlineWorkOutline className="text-gray-300 text-xs" />
                <input
                  type="text"
                  placeholder="What job are you looking for?"
                  className="w-full outline-none text-xs text-slate-700 placeholder:text-gray-300 bg-transparent"
                />
              </div>
            </div>
            <button className="bg-[#1B3B5A] text-white px-6 py-3 rounded-lg font-bold text-xs w-full md:w-auto active:scale-95 hover:bg-slate-800 transition-colors duration-300">
              Search
            </button>
          </div>
        </div>

        {/* Right Hero Image */}
        <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2 relative px-4">
          <div className="absolute inset-0 bg-blue-100 rounded-full filter blur-[80px] md:blur-[100px] opacity-30 scale-90 md:scale-110"></div>
          <img
            src={heroImage}
            alt="Hero illustration"
            className="w-full max-w-[550px] sm:max-w-[550px] md:max-w-[750px] h-auto lg:h-[550px] object-contain relative z-10 transition-transform duration-500 hover:scale-105"
          />
        </div>
      </section>

      {/* Features / Cards Section */}
      <section className="px-4 sm:px-8 md:px-16 lg:px-24 py-16 md:py-28 bg-gray-50/40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-[1440px] mx-auto items-stretch">
          {/* Card 1 */}
          <div className="p-6 rounded-3xl border border-gray-200 bg-white cursor-pointer flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:border-gray-300">
            <HiOutlineUserAdd className="text-3xl mb-4 text-slate-300 group-hover:text-[#1B3B5A] transition-colors duration-300" />
            <h4 className="font-bold text-slate-800 mb-2 text-base md:text-lg">
              Professional recruiter
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Finding the best candidate is always hard.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-3xl border border-gray-200 bg-white cursor-pointer flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:border-gray-300">
            <div className="w-14 h-14 bg-blue-50 flex items-center justify-center rounded-2xl mb-4 transition-colors duration-300 hover:bg-[#1B3B5A]">
              <FiBriefcase className="text-2xl text-[#1B3B5A] hover:text-white transition-colors duration-300" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2 text-base md:text-lg">
              Find the right job you want fast
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Launch your career on Workify.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-3xl border border-gray-200 bg-white cursor-pointer flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:border-gray-300">
            <HiOutlineChatAlt2 className="text-3xl mb-4 text-slate-300 group-hover:text-[#1B3B5A] transition-colors duration-300" />
            <h4 className="font-bold text-slate-800 mb-2 text-base md:text-lg">
              All professionals need some help
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              As a pro recruiter, you need various skills.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-3xl border border-gray-200 bg-white cursor-pointer flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:border-gray-300">
            <HiOutlineSearch className="text-3xl mb-4 text-slate-300 group-hover:text-[#1B3B5A] transition-colors duration-300" />
            <h4 className="font-bold text-slate-800 mb-2 text-base md:text-lg">
              Searching a job may be boring
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Landing a good gig can be hard with competition.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TalantHome;
