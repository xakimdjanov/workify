<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> 904d30252cd10b54916c48284ebc0052b7d5b261
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
<<<<<<< HEAD

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
=======
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function RegistrationFormStepTwo() {
  const navigate = useNavigate();

  const [occupation, setOccupation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [skils, setskils] = useState([{ skill: "", experience_years: "" }]);
  const [languages, setLanguages] = useState([{ language: "", level: "" }]);

  const [showOccupationDropdown, setShowOccupationDropdown] = useState(false);
  const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false);
  const [showSkillDropdown, setShowSkillDropdown] = useState([false]);
  const [showExpDropdown, setShowExpDropdown] = useState([false]);
  const [showLevelDropdown, setShowLevelDropdown] = useState([false]);

  useEffect(() => {
    const savedData = localStorage.getItem("talent_step2");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setOccupation(parsed.occupation || "");
        setSpecialty(parsed.specialty || "");
        if (Array.isArray(parsed.skils)) setskils(parsed.skils);
        if (Array.isArray(parsed.language)) setLanguages(parsed.language);
      } catch (error) {
        console.error("Data loading error:", error);
      }
    }
  }, []);

  const occupations = ["Designer", "Programmer", "Businessman", "Manager", "Doctor", "Teacher"];
  const specialties = ["UX/UI", "Frontend Developer", "Backend Developer", "Graphic designer", "Motion designer"];
  const skilsList = ["Figma", "Photoshop", "React", "Node.js", "Illustrator", "Sketch", "Adobe XD"];
  const expList = ["1 year", "2 years", "3 years", "4 years", "5+ years"];
  const levels = ["Beginner", "Intermediate", "Advanced", "Native"];

  const addSkill = () => {
    if (skils.length < 5) {
      setskils([...skils, { skill: "", experience_years: "" }]);
      setShowSkillDropdown([...showSkillDropdown, false]);
      setShowExpDropdown([...showExpDropdown, false]);
>>>>>>> 904d30252cd10b54916c48284ebc0052b7d5b261
    }
  };

  const removeSkill = (index) => {
<<<<<<< HEAD
    if (skills.length > 1) {
      setSkills(skills.filter((_, i) => i !== index));
      setShowSkillDropdown(showSkillDropdown.filter((_, i) => i !== index));
      setShowExperienceDropdown(
        showExperienceDropdown.filter((_, i) => i !== index)
      );
    }
  };

=======
    if (skils.length > 1) {
      setskils(skils.filter((_, i) => i !== index));
      setShowSkillDropdown(showSkillDropdown.filter((_, i) => i !== index));
      setShowExpDropdown(showExpDropdown.filter((_, i) => i !== index));
    }
  };

  const updateSkill = (index, field, value) => {
    const updated = [...skils];
    updated[index][field] = value;
    setskils(updated);
  };

>>>>>>> 904d30252cd10b54916c48284ebc0052b7d5b261
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

<<<<<<< HEAD
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
=======
  const updateLanguage = (index, field, value) => {
    const updated = [...languages];
    updated[index][field] = value;
    setLanguages(updated);
  };

  const handleNext = () => {
    const step2Data = {
      occupation,
      specialty,
      skils: skils.filter(s => s.skill.trim() !== ""),
      language: languages.filter(l => l.language.trim() !== ""),
      experience_years: parseInt(skils[0]?.experience_years) || 0
    };

    localStorage.setItem("talent_step2", JSON.stringify(step2Data));
    navigate("/registration/step-3");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 flex items-center justify-center p-4 md:p-10">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl p-6 md:p-12">

          <div className="flex flex-col items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#163D5C] mb-6">Professional Details</h2>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#163D5C]"></div>
              <div className="w-16 md:w-32 h-1 bg-[#163D5C] rounded"></div>
              <div className="w-5 h-5 rounded-full bg-[#163D5C] ring-4 ring-blue-100"></div>
              <div className="w-16 md:w-32 h-1 bg-gray-200 rounded"></div>
              <div className="w-3 h-3 rounded-full bg-gray-200"></div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Occupation</label>
                <div className="relative">
                  <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-[#163D5C]" />
                  <input
                    type="text"
                    value={occupation}
                    onFocus={() => setShowOccupationDropdown(true)}
                    onBlur={() => setTimeout(() => setShowOccupationDropdown(false), 200)}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#163D5C] outline-none"
                    placeholder="e.g. Programmer"
                  />
                  {showOccupationDropdown && (
                    <div className="absolute z-30 w-full mt-1 bg-white border rounded-xl shadow-2xl max-h-40 overflow-y-auto">
                      {occupations.map((item, i) => (
                        <div key={i} onClick={() => setOccupation(item)} className="px-5 py-2 hover:bg-blue-50 cursor-pointer text-gray-700">{item}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Specialty</label>
                <div className="relative">
                  <FaSuitcase className="absolute left-4 top-1/2 -translate-y-1/2 text-[#163D5C]" />
                  <input
                    type="text"
                    value={specialty}
                    onFocus={() => setShowSpecialtyDropdown(true)}
                    onBlur={() => setTimeout(() => setShowSpecialtyDropdown(false), 200)}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#163D5C] outline-none"
                    placeholder="e.g. Frontend Developer"
                  />
                  {showSpecialtyDropdown && (
                    <div className="absolute z-30 w-full mt-1 bg-white border rounded-xl shadow-2xl max-h-40 overflow-y-auto">
                      {specialties.map((item, i) => (
                        <div key={i} onClick={() => setSpecialty(item)} className="px-5 py-2 hover:bg-blue-50 cursor-pointer text-gray-700">{item}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800">Skills & Experience</h3>

              {skils.map((s, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end animate-fadeIn">

                  {/* Skill Input */}
                  <div className="relative">
                    <FaIdCard className="absolute left-4 top-11 text-[#163D5C]" />
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Skills</label>
                    <input
                      type="text"
                      value={s.skill}
                      onChange={(e) => updateSkill(index, "skill", e.target.value)}
                      onFocus={() => { let arr = [...showSkillDropdown]; arr[index] = true; setShowSkillDropdown(arr); }}
                      onBlur={() => setTimeout(() => { let arr = [...showSkillDropdown]; arr[index] = false; setShowSkillDropdown(arr); }, 200)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#163D5C] outline-none"
                    />
                    {showSkillDropdown[index] && (
                      <div className="absolute z-20 w-full mt-1 bg-white border rounded-xl shadow-xl max-h-32 overflow-y-auto">
                        {skilsList.map((item, i) => (
                          <div key={i} onClick={() => updateSkill(index, "skill", item)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{item}</div>
>>>>>>> 904d30252cd10b54916c48284ebc0052b7d5b261
                        ))}
                      </div>
                    )}
                  </div>
<<<<<<< HEAD
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
=======

                  {/* Experience Input + Remove Button */}
                  <div className="relative flex items-center gap-2">
                    <div className="flex-1 relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Experience</label>
                      <FaLightbulb className="absolute left-4 top-[65%] -translate-y-1/2 text-[#163D5C] text-lg" />
                      <input
                        type="text"
                        value={s.experience_years}
                        readOnly
                        onFocus={() => { let arr = [...showExpDropdown]; arr[index] = true; setShowExpDropdown(arr); }}
                        onBlur={() => setTimeout(() => { let arr = [...showExpDropdown]; arr[index] = false; setShowExpDropdown(arr); }, 200)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer"
                        placeholder="Experience"
                      />
                      {showExpDropdown[index] && (
                        <div className="absolute z-20 w-full mt-1 bg-white border rounded-xl shadow-xl">
                          {expList.map((item, i) => (
                            <div key={i} onClick={() => updateSkill(index, "experience_years", item)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{item}</div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Remove Button */}
                    {index > 0 && (
                      <button onClick={() => removeSkill(index)} className="mt-6  p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                        <FaTimes />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Add Skill Button aligned to the right */}
              <div className="flex justify-end">
                <button
                  onClick={addSkill}
                  className="text-sm font-bold text-[#fff] bg-[#4AD395]
             w-32 h-10 px-4 py-2 border border-[#4AD395] rounded-[50px]"
                >
                  + Add Skill
                </button>

              </div>
            </div>


            {/* Language Section */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Languages</h3>

              {languages.map((l, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">

                  {/* Language Input */}
                  <div className="relative">
                    <FaLanguage className="absolute left-4 top-11 text-[#163D5C]" />
                    <label className="text-xs text-gray-500 ml-1">Language</label>
                    <input
                      type="text"
                      value={l.language}
                      onChange={(e) => updateLanguage(index, "language", e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#163D5C]"
                    />
                  </div>

                  {/* Level Input + Remove Button */}
                  <div className="relative flex items-center gap-2">
                    <div className="flex-1 relative">
                      <FaChartBar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#163D5C]" />
                      <input
                        type="text"
                        value={l.level}
                        readOnly
                        onFocus={() => { let arr = [...showLevelDropdown]; arr[index] = true; setShowLevelDropdown(arr); }}
                        onBlur={() => setTimeout(() => { let arr = [...showLevelDropdown]; arr[index] = false; setShowLevelDropdown(arr); }, 200)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer"
                        placeholder="Level"
                      />
                      {showLevelDropdown[index] && (
                        <div className="absolute z-20 w-full mt-1 bg-white border rounded-xl shadow-xl">
                          {levels.map((item, i) => (
                            <div
                              key={i}
                              onClick={() => updateLanguage(index, "level", item)}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Remove Button */}
                    {index > 0 && (
                      <button
                        onClick={() => removeLanguage(index)}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                </div>
              ))}

<div className="flex justify-end items-center mt-2">
  <button
    onClick={addLanguage}
    className="text-sm font-bold text-[#fff] bg-[#4AD395]
               px-6 h-10 border border-[#4AD395] rounded-[50px]"
  >
    + Add Language
  </button>
</div>
            </div>
            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-4 pt-10">
              <button
                onClick={() => navigate("/registration/step-1")}
                className="flex-1 py-4 border-2 border-[#163D5C] text-[#163D5C] rounded-2xl font-bold hover:bg-gray-50 transition-all"
              >
                Previous Step
              </button>
              <button
                onClick={handleNext}
                className="flex-[1] py-4 bg-[#163D5C] text-white rounded-2xl font-bold hover:bg-[#1a4d73] shadow-lg shadow-blue-900/20 transition-all"
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
>>>>>>> 904d30252cd10b54916c48284ebc0052b7d5b261
