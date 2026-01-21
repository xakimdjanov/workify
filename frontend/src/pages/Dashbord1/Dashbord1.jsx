import React, { useEffect, useState } from "react";
import { talentApi } from "../../services/api";
import { jwtDecode } from "jwt-decode";

const Dashbord1 = () => {
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { id } = jwtDecode(token);

        const res = await talentApi.getById(id);
        const data = res.data;

        const values = Object.values(data);

        const filtered = values.filter(
          (v) =>
            typeof v !== "number" &&
            v !== data.createdAt &&
            v !== data.updatedAt
        );

        const filled = filtered.filter((v) => {
          if (v === null) return false;
          if (v === "") return false;

          if (typeof v === "string") {
            if (v === "[]" || v === "{}") return false;
            return true;
          }

          if (Array.isArray(v)) return v.length > 0;

          if (typeof v === "object") return Object.keys(v).length > 0;

          return true;
        });

        const completion = Math.round((filled.length / filtered.length) * 100);

        setPercent(Math.min(completion, 100));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const getProgressColor = (percentage) => {
    if (percentage <= 30) return "#f7481d";
    if (percentage <= 70) return "#FB959D";
    return "#5ABF89";
  };

  // SVG Circle Progress
  const CircleProgress = ({ percentage, size = 144, strokeWidth = 16 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    const progressColor = getProgressColor(percentage);

    return (
      <div className="relative">
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#FFFFFF33"
            strokeWidth={strokeWidth}
            fill="none"
          />

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={progressColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.6s, stroke 0.4s" }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <p className="text-3xl font-bold">{percentage}%</p>
          <p className="text-sm uppercase tracking-wider">Complete</p>
        </div>
      </div>
    );
  };

  if (loading) return <p>Yuklanmoqda...</p>;

  return (
    <div>
      <div className="pt-6">
        <div className="bg-gradient-to-b from-[#163D5C] to-[#6D89CF] w-[350px] h-[350px] rounded-xl flex flex-col items-center justify-center">
          <h1 className="text-white text-xl font-bold">Profile completed</h1>

          <div className="py-8">
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

export default Dashbord1;
