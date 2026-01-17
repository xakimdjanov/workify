import React, { useState } from "react";
import { HiOutlineUserAdd, HiOutlineChatAlt2, HiOutlineSearch } from "react-icons/hi";
import { FiBriefcase } from "react-icons/fi";

const TalantCards = () => {
  const [hovered, setHovered] = useState(null); // qaysi card hover bo‘lyapti

  const cards = [
    {
      id: 1,
      icon: <HiOutlineUserAdd className="text-3xl mb-4" />,
      title: "Professional recruiter",
      desc: "Finding the best candidate is always hard.",
    },
    {
      id: 2,
      icon: <FiBriefcase className="text-2xl text-[#1B3B5A]" />,
      title: "Find the right job you want fast",
      desc: "Launch your career on Workify.",
    },
    {
      id: 3,
      icon: <HiOutlineChatAlt2 className="text-3xl mb-4" />,
      title: "All professionals need some help",
      desc: "As a pro recruiter, you need various skills.",
    },
    {
      id: 4,
      icon: <HiOutlineSearch className="text-3xl mb-4" />,
      title: "Searching a job may be boring",
      desc: "Landing a good gig can be hard with competition.",
    },
  ];

  // Card hover bo‘lsa juftini aniqlash
  const getActive = (id) => {
    if (!hovered) return false;
    if (id % 2 === 1) return hovered === id || hovered === id + 1;
    return hovered === id || hovered === id - 1;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1440px] mx-auto">
      {cards.map((card) => (
        <div
          key={card.id}
          onMouseEnter={() => setHovered(card.id)}
          onMouseLeave={() => setHovered(null)}
          className={`p-6 rounded-3xl border border-transparent transition-all duration-300 cursor-default
            ${getActive(card.id) ? "hover:border-gray-200 hover:bg-white hover:shadow-xl" : ""}`}
        >
          <div
            className={`mb-4 transition-colors duration-300 ${
              getActive(card.id) ? "text-[#1B3B5A]" : "text-slate-300"
            }`}
          >
            {card.icon}
          </div>
          <h4 className="font-bold text-slate-800 mb-2 text-base md:text-lg">{card.title}</h4>
          <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default TalantCards;
