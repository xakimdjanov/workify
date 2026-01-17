import React, { useState } from "react";
import {
  FaBriefcase,
  FaSuitcase,
  FaIdCard,
  FaLightbulb,
  FaLanguage,
  FaChartBar,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function RegistrationFormStepTwo() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([{ skill: "", experience: "" }]);
  const [languages, setLanguages] = useState([{ language: "", level: "" }]);
  const [occupation, setOccupation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [showOccupationDropdown, setShowOccupationDropdown] = useState(false);
  const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false);
  const [showSkillDropdown, setShowSkillDropdown] = useState([false]);
  const [showExperienceDropdown, setShowExperienceDropdown] = useState([false]);
  const [showLevelDropdown, setShowLevelDropdown] = useState([false]);

  const occupations = [
    "Designer",
    "Programmer",
    "Businessman",
    "Manager",
    "Doctor",
    "Teacher",
  ];
  const specialties = [
    "UX/UI",
    "UX/UI designer",
    "3D designer",
    "Logo and brand designer",
    "Motion designer",
    "Interior designer",
    "Graphic designer",
  ];
  const skillsList = [
    "Figma",
    "Photoshop",
    "Illustrator",
    "Sketch",
    "Adobe XD",
  ];
  const experiences = ["1 year", "2 years", "3 years", "4 years", "5+ years"];
  const levels = ["Beginner", "Intermediate", "Advanced"];

  const addSkill = () => {
    if (skills.length < 3) {
      setSkills([...skills, { skill: "", experience: "" }]);
      setShowSkillDropdown([...showSkillDropdown, false]);
      setShowExperienceDropdown([...showExperienceDropdown, false]);
    }
  };

  const removeSkill = (index) => {
    if (skills.length > 1) {
      setSkills(skills.filter((_, i) => i !== index));
      setShowSkillDropdown(showSkillDropdown.filter((_, i) => i !== index));
      setShowExperienceDropdown(
        showExperienceDropdown.filter((_, i) => i !== index)
      );
    }
  };

  const addLanguage = () => {
    if (languages.length < 3) {
      setLanguages([...languages, { language: "", level: "" }]);
      setShowLevelDropdown([...showLevelDropdown, false]);
    }
  };

  const removeLanguage = (index) => {
    if (languages.length > 1) {
      setLanguages(languages.filter((_, i) => i !== index));
      setShowLevelDropdown(showLevelDropdown.filter((_, i) => i !== index));
    }
  };

  const updateSkill = (index, field, value) => {
    const newSkills = [...skills];
    newSkills[index][field] = value;
    setSkills(newSkills);
  };

  const updateLanguage = (index, field, value) => {
    const newLanguages = [...languages];
    newLanguages[index][field] = value;
    setLanguages(newLanguages);
  };

  const toggleSkillDropdown = (index) => {
    const newDropdowns = [...showSkillDropdown];
    newDropdowns[index] = !newDropdowns[index];
    setShowSkillDropdown(newDropdowns);
  };

  const toggleExperienceDropdown = (index) => {
    const newDropdowns = [...showExperienceDropdown];
    newDropdowns[index] = !newDropdowns[index];
    setShowExperienceDropdown(newDropdowns);
  };

  const toggleLevelDropdown = (index) => {
    const newDropdowns = [...showLevelDropdown];
    newDropdowns[index] = !newDropdowns[index];
    setShowLevelDropdown(newDropdowns);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-[388px] md:max-w-[988px] p-6 md:p-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
            Show us what you got
          </h2>

          <div className="flex items-center justify-center gap-2 md:gap-4">
            <div className="w-3 h-3 rounded-full bg-[#163D5C]"></div>
            <div className="w-16 md:w-32 h-0.5 bg-[#163D5C]"></div>
            <div className="w-4 h-4 rounded-full bg-[#163D5C] border-4 border-white shadow-lg"></div>
            <div className="w-16 md:w-32 h-0.5 bg-gray-300"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">
                Occupation
              </label>
              <div className="relative">
                <FaBriefcase className="absolute left-4 top-4 text-[#163D5C] z-10" />
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  onFocus={() => setShowOccupationDropdown(true)}
                  onBlur={() =>
                    setTimeout(() => setShowOccupationDropdown(false), 200)
                  }
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163D5C] focus:border-transparent"
                />
                {showOccupationDropdown && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {occupations
                      .filter((occ) =>
                        occ.toLowerCase().includes(occupation.toLowerCase())
                      )
                      .map((occ, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setOccupation(occ);
                            setShowOccupationDropdown(false);
                          }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {occ}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">
                Specialty
              </label>
              <div className="relative">
                <FaSuitcase className="absolute left-4 top-4 text-[#163D5C] z-10" />
                <input
                  type="text"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  onFocus={() => setShowSpecialtyDropdown(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSpecialtyDropdown(false), 200)
                  }
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163D5C] focus:border-transparent"
                />
                {showSpecialtyDropdown && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {specialties
                      .filter((spec) =>
                        spec.toLowerCase().includes(specialty.toLowerCase())
                      )
                      .map((spec, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setSpecialty(spec);
                            setShowSpecialtyDropdown(false);
                          }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {spec}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-2">
              <label className="block text-gray-700 font-medium">Skills</label>
              <label className="block text-gray-700 font-medium">
                Years of experience
              </label>
            </div>

            {skills.map((skill, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 relative"
              >
                <div className="relative">
                  <FaIdCard className="absolute left-4 top-4 text-[#163D5C] z-10" />
                  <input
                    type="text"
                    value={skill.skill}
                    onChange={(e) =>
                      updateSkill(index, "skill", e.target.value)
                    }
                    onFocus={() => toggleSkillDropdown(index)}
                    onBlur={() =>
                      setTimeout(() => {
                        const newDropdowns = [...showSkillDropdown];
                        newDropdowns[index] = false;
                        setShowSkillDropdown(newDropdowns);
                      }, 200)
                    }
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163D5C] focus:border-transparent"
                  />
                  {showSkillDropdown[index] && (
                    <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {skillsList
                        .filter((s) =>
                          s.toLowerCase().includes(skill.skill.toLowerCase())
                        )
                        .map((s, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              updateSkill(index, "skill", s);
                              const newDropdowns = [...showSkillDropdown];
                              newDropdowns[index] = false;
                              setShowSkillDropdown(newDropdowns);
                            }}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            {s}
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className="relative flex items-center gap-2">
                  <div className="relative flex-1">
                    <FaLightbulb className="absolute left-4 top-4 text-[#163D5C] z-10" />
                    <input
                      type="text"
                      value={skill.experience}
                      onChange={(e) =>
                        updateSkill(index, "experience", e.target.value)
                      }
                      onFocus={() => toggleExperienceDropdown(index)}
                      onBlur={() =>
                        setTimeout(() => {
                          const newDropdowns = [...showExperienceDropdown];
                          newDropdowns[index] = false;
                          setShowExperienceDropdown(newDropdowns);
                        }, 200)
                      }
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163D5C] focus:border-transparent"
                    />
                    {showExperienceDropdown[index] && (
                      <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {experiences.map((exp, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              updateSkill(index, "experience", exp);
                              const newDropdowns = [...showExperienceDropdown];
                              newDropdowns[index] = false;
                              setShowExperienceDropdown(newDropdowns);
                            }}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            {exp}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-300 hover:bg-gray-400 rounded-full text-white transition-colors"
                    >
                      <FaTimes className="text-sm" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {skills.length < 3 && (
              <div className="flex justify-center md:justify-end mt-4">
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
                >
                  Add skill
                </button>
              </div>
            )}
          </div>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-2">
              <label className="block text-gray-700 font-medium">
                Language
              </label>
              <label className="block text-gray-700 font-medium">Level</label>
            </div>

            {languages.map((lang, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 relative"
              >
                <div className="relative">
                  <FaLanguage className="absolute left-4 top-4 text-[#163D5C] z-10" />
                  <input
                    type="text"
                    value={lang.language}
                    onChange={(e) =>
                      updateLanguage(index, "language", e.target.value)
                    }
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163D5C] focus:border-transparent"
                    placeholder="Enter language"
                  />
                </div>

                <div className="relative flex items-center gap-2">
                  <div className="relative flex-1">
                    <FaChartBar className="absolute left-4 top-4 text-[#163D5C] z-10" />
                    <input
                      type="text"
                      value={lang.level}
                      onChange={(e) =>
                        updateLanguage(index, "level", e.target.value)
                      }
                      onFocus={() => toggleLevelDropdown(index)}
                      onBlur={() =>
                        setTimeout(() => {
                          const newDropdowns = [...showLevelDropdown];
                          newDropdowns[index] = false;
                          setShowLevelDropdown(newDropdowns);
                        }, 200)
                      }
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163D5C] focus:border-transparent"
                      placeholder="Select level"
                    />
                    {showLevelDropdown[index] && (
                      <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                        {levels.map((lv, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              updateLanguage(index, "level", lv);
                              const newDropdowns = [...showLevelDropdown];
                              newDropdowns[index] = false;
                              setShowLevelDropdown(newDropdowns);
                            }}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            {lv}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeLanguage(index)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-300 hover:bg-gray-400 rounded-full text-white transition-colors"
                    >
                      <FaTimes className="text-sm" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {languages.length < 3 && (
              <div className="flex justify-center md:justify-end mt-4">
                <button
                  type="button"
                  onClick={addLanguage}
                  className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
                >
                  Add language
                </button>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col md:flex-row gap-4 pt-4 justify-center">
            <button
              type="button"
              onClick={() => navigate("/registration/step-1")}
              className="w-full md:w-auto px-12 py-3 border-2 border-[#163D5C] text-[#163D5C] rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => navigate("/registration/step-3")}
              className="w-full md:w-auto px-12 py-3 bg-[#163D5C] text-white rounded-lg font-medium hover:bg-[#1a4d73] transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
