import React, { useState } from "react";
import { TbWorld, TbBrandTelegram, TbMail, TbMoon } from "react-icons/tb";

const Setting = () => {
  const [settings, setSettings] = useState({
    website: true,
    telegram: true,
    email: true,
    darkMode: true,
  });

  const toggleSwitch = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
    <div className="min-h-full bg-[#F8F9FA] p-4 sm:p-6 md:p-8 pb-[100px] md:pb-8 font-sans">
      <div className="max-w-[900px] mx-auto">
        <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm mb-6 md:mb-8 border border-gray-100">
          <h1 className="text-lg md:text-xl font-medium text-gray-700 ml-1">
            Settings
          </h1>
        </div>

        <div className="mb-8 md:mb-10">
          <h2 className="text-[16px] md:text-[18px] font-bold text-gray-600 mb-4 md:mb-5">
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
            />
            <SettingItem
              icon={<TbBrandTelegram />}
              title="Telegram"
              desc="With this setting, you can customize vacancy notifications from the Telegram"
              isOn={settings.telegram}
              onToggle={() => toggleSwitch("telegram")}
              CustomToggle={CustomToggle}
            />
            <SettingItem
              icon={<TbMail />}
              title="Email"
              desc="With this setting, you can customize vacancy notifications from the Email"
              isOn={settings.email}
              onToggle={() => toggleSwitch("email")}
              CustomToggle={CustomToggle}
            />
          </div>
        </div>

        <div>
          <h2 className="text-[16px] md:text-[18px] font-bold text-gray-600 mb-4 md:mb-5">
            Theme settings
          </h2>
          <SettingItem
            icon={<TbMoon />}
            title="Dark mode"
            desc="Use the platform in a mode that is convenient for you"
            isOn={settings.darkMode}
            onToggle={() => toggleSwitch("darkMode")}
            CustomToggle={CustomToggle}
          />
        </div>
      </div>
    </div>
  );
};

const SettingItem = ({ icon, title, desc, isOn, onToggle, CustomToggle }) => (
  <div className="bg-white p-4 md:p-6 rounded-[18px] md:rounded-[22px] flex justify-between items-center shadow-sm border border-gray-50 transition-all hover:shadow-md">
    <div className="flex items-start gap-3 md:gap-4 overflow-hidden">
      <div className="text-[20px] md:text-[24px] text-gray-400 mt-1 flex-shrink-0">
        {icon}
      </div>

      <div className="flex-1 min-w-0 pr-2">
        <h3 className="text-[15px] md:text-[17px] font-bold text-gray-800 leading-none mb-1 truncate">
          {title}
        </h3>
        <p className="text-[11px] md:text-[14px] text-gray-500 leading-tight md:leading-snug break-words">
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
