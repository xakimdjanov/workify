import React, { useEffect, useState } from "react";
import { talentApi } from "../../services/api";
import { jwtDecode } from "jwt-decode";

const Dashbord = () => {
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // 1️⃣ tokenni decode qilamiz
        const { id } = jwtDecode(token);

        // 2️⃣ real API
        const res = await talentApi.getById(id);
        const data = res.data;

        // 3️⃣ FAKE YO'Q — real fieldlar
        const values = Object.values(data);

        // id, createdAt, updatedAt ni hisobga olmaymiz
        const filtered = values.filter(
          (v) =>
            typeof v !== "number" &&
            v !== data.createdAt &&
            v !== data.updatedAt,
        );

        const filled = filtered.filter((v) => {
          if (v === null) return false;
          if (v === "") return false;
          if (Array.isArray(v) && v.length === 0) return false;
          return true;
        });

        const completion = Math.round((filled.length / filtered.length) * 100);
        
        // 100% dan oshmasligini tekshirish
        const finalPercent = Math.min(completion, 100);
        
        setPercent(finalPercent);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // Progress uchun SVG bilan yaratish (eng ishonchli usul)
  const CircleProgress = ({ percentage, size = 144, strokeWidth = 16 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#FFFFFF33"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#FB959D"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        {/* Markazdagi matn */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white">
          <p className="text-3xl font-bold">{percent}%</p>
          <p className="text-sm uppercase tracking-wider">Complete</p>
        </div>
      </div>
    );
  };

  if (loading) return <p>Yuklanmoqda...</p>;

  return (
    <div>
      <h2 className="bg-white py-4 pl-8 rounded-xl text-xl font-semibold">
        Dashboard
      </h2>
      <div className="pt-6">
        <div className="bg-gradient-to-b from-[#163D5C] to-[#6D89CF] w-[350px] h-[350px] rounded-xl flex flex-col items-center justify-center">
          <h1 className="text-white text-xl font-bold">Profile completed</h1>

          <div className="flex flex-col items-center justify-center py-8">
            <CircleProgress percentage={percent} />
          </div>

          <p className="text-white text-sm text-center">
            Complete all parts of your profile and <br />
            increase your chances of finding a job
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashbord;