import React, { useState, useEffect } from "react";
import { TbWorld, TbBrandTelegram, TbMail, TbMoon } from "react-icons/tb";

const Setting = () => {
  // Boshlang'ich state
  const [settings, setSettings] = useState({
    website: true,
    telegram: true,
    email: true,
    darkMode: false, // Boshlang'ich holat - yorug'
  });

  // 🌑 Dark mode class qo‘shish / o‘chirish — BUTUN SAYTGA ta’sir qiladi
  useEffect(() => {
    const root = document.documentElement;
    if (settings.darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [settings.darkMode]);

  const toggleSwitch = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Custom toggle component
  const CustomToggle = ({ isOn, onToggle }) => (
    <div
      onClick={onToggle}
      style={{ transitionDuration: "1.5s" }}
      className={`relative w-[46px] h-[24px] md:w-[50px] md:h-[26px] flex items-center rounded-full cursor-pointer transition-colors ease-in-out ${
        isOn ? "bg-[#55B985]" : "bg-gray-300"
      }`}
    >
      <div
        style={{
          transitionDuration: "1.5s",
          transform: isOn ? "translateX(24px)" : "translateX(4px)",
        }}
        className="absolute bg-white w-[18px] h-[18px] md:w-[20px] md:h-[20px] rounded-full shadow-sm transition-all ease-in-out"
      />
    </div>
  );

  return (
    <div
      className={`min-h-full p-4 sm:p-6 md:p-8 pb-[100px] md:pb-8 font-sans transition-colors duration-500 ${
        settings.darkMode
          ? "bg-[#121212] text-white"
          : "bg-[#F8F9FA] text-gray-800"
      }`}
    >
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div
          className={`${
            settings.darkMode
              ? "bg-[#1E1E1E] border-gray-700"
              : "bg-white border-gray-100"
          } p-3 md:p-4 rounded-xl shadow-sm mb-6 md:mb-8 border transition-colors duration-500`}
        >
          <h1
            className={`text-lg md:text-xl font-medium ${
              settings.darkMode ? "text-gray-200" : "text-gray-700"
            } ml-1`}
          >
            Settings
          </h1>
        </div>

        {/* Notification settings */}
        <div className="mb-8 md:mb-10">
          <h2
            className={`text-[16px] md:text-[18px] font-bold mb-4 md:mb-5 ${
              settings.darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Notification settings
          </h2>
          <div className="flex flex-col gap-3 md:gap-4">
            <SettingItem
              icon={<TbWorld />}
              title="Website"
              desc="With this setting, you can customize vacancy notifications from the web site"
              isOn={settings.website}
              onToggle={() => toggleSwitch("website")}
              CustomToggle={CustomToggle}
              isDark={settings.darkMode}
            />
            <SettingItem
              icon={<TbBrandTelegram />}
              title="Telegram"
              desc="With this setting, you can customize vacancy notifications from the Telegram"
              isOn={settings.telegram}
              onToggle={() => toggleSwitch("telegram")}
              CustomToggle={CustomToggle}
              isDark={settings.darkMode}
            />
            <SettingItem
              icon={<TbMail />}
              title="Email"
              desc="With this setting, you can customize vacancy notifications from the Email"
              isOn={settings.email}
              onToggle={() => toggleSwitch("email")}
              CustomToggle={CustomToggle}
              isDark={settings.darkMode}
            />
          </div>
        </div>

        {/* Theme settings */}
        <div>
          <h2
            className={`text-[16px] md:text-[18px] font-bold mb-4 md:mb-5 ${
              settings.darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Theme settings
          </h2>
          <SettingItem
            icon={<TbMoon />}
            title="Dark mode"
            desc="Use the platform in a mode that is convenient for you"
            isOn={settings.darkMode}
            onToggle={() => toggleSwitch("darkMode")}
            CustomToggle={CustomToggle}
            isDark={settings.darkMode}
          />
        </div>
      </div>
    </div>
  );
};

const SettingItem = ({
  icon,
  title,
  desc,
  isOn,
  onToggle,
  CustomToggle,
  isDark,
}) => (
  <div
    className={`${
      isDark ? "bg-[#1E1E1E] border-gray-800" : "bg-white border-gray-50"
    } p-4 md:p-6 rounded-[18px] md:rounded-[22px] flex justify-between items-center shadow-sm border transition-all duration-500 hover:shadow-md`}
  >
    <div className="flex items-start gap-3 md:gap-4 overflow-hidden">
      <div
        className={`text-[20px] md:text-[24px] mt-1 flex-shrink-0 ${
          isDark ? "text-gray-500" : "text-gray-400"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0 pr-2">
        <h3
          className={`text-[15px] md:text-[17px] font-bold leading-none mb-1 truncate ${
            isDark ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-[11px] md:text-[14px] leading-tight md:leading-snug break-words ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {desc}
        </p>
      </div>
    </div>
    <div className="flex-shrink-0 ml-2">
      <CustomToggle isOn={isOn} onToggle={onToggle} />
    </div>
  </div>
);

export default Setting;
