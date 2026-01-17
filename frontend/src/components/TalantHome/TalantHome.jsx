import React from "react";

const TalantHome = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      

      <section className="relative px-6 md:px-16 py-12 md:py-20 flex flex-col md:flex-row items-center max-w-7xl mx-auto">
        <div className="w-full md:w-1/2 z-10 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-800 mb-6">
            Find aspiring talents <br className="hidden md:block" /> and great
            employers
          </h2>
          <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto md:mx-0">
            Finding the best candidate is always hard. Tell us what you are
            looking for and choose one from among the best.
          </p>

          <div className="bg-white p-2 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col md:flex-row items-center gap-2 max-w-2xl border border-gray-50">
            <div className="flex-1 px-4 py-2 text-left w-full border-b md:border-b-0 md:border-r border-gray-100">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Hire a talent
              </label>
              <input
                type="text"
                placeholder="Who are you looking for?"
                className="w-full outline-none text-sm text-slate-700 placeholder:text-gray-300"
              />
            </div>
            <div className="flex-1 px-4 py-2 text-left w-full">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Find a job
              </label>
              <input
                type="text"
                placeholder="What job are you looking for?"
                className="w-full outline-none text-sm text-slate-700 placeholder:text-gray-300"
              />
            </div>
            <button className="bg-[#1B3B5A] text-white px-10 py-4 rounded-lg font-bold hover:bg-slate-800 transition w-full md:w-auto">
              Search
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center mt-12 md:mt-0 relative">
          {/* Background shapes/blobs like in image */}
          <div className="absolute top-10 right-10 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/man-working-on-laptop-while-sitting-on-chair-6761491-5616839.png"
            alt="Hero"
            className="w-full max-w-md relative z-10"
          />
        </div>
      </section>

      <section className="px-6 md:px-16 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto items-start">
          {/* Feature 1 */}
          <div className="p-4">
            <div className="text-2xl mb-4 text-slate-400">
              👤<span className="text-sm font-bold">+</span>
            </div>
            <h4 className="font-bold text-slate-700 mb-2 leading-tight">
              Professional recruiter
            </h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              Finding the best candidate is always hard.
            </p>
          </div>

          <div className="p-8 bg-white rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-gray-50 transform md:-translate-y-8 relative z-20">
            <div className="w-12 h-12 bg-blue-50 flex items-center justify-center rounded-2xl mb-8">
              <span className="text-2xl">👔</span>
            </div>
            <h4 className="font-bold text-slate-800 mb-3 leading-tight">
              Find the right job you want fast
            </h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              Launch your career on Workify.
            </p>
          </div>

          <div className="p-4">
            <div className="text-2xl mb-4 text-slate-400">💬</div>
            <h4 className="font-bold text-slate-700 mb-2 leading-tight">
              All professionals need some help
            </h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              As a pro recruiter, you need various skills to hire a great
              talent.
            </p>
          </div>

          <div className="p-4">
            <div className="text-2xl mb-4 text-slate-400">🔍</div>
            <h4 className="font-bold text-slate-700 mb-2 leading-tight">
              Searching a job may be long and boring
            </h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              Landing a good gig can be hard, when you have a strong
              competition.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TalantHome;
