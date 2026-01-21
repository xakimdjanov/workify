import React, { useEffect, useState } from "react";
import { applicationApi } from "../../services/api";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard3 = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const weekDaysShort = ["M", "T", "W", "T", "F", "S", "S"];

  useEffect(() => {
    let isMounted = true;

    const fetchAndProcess = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await applicationApi.getAll();
        let applications = [];

        // API javob formatini turli holatlarga moslashtirish
        if (res?.data) {
          if (Array.isArray(res.data)) {
            applications = res.data;
          } else if (Array.isArray(res.data.applications)) {
            applications = res.data.applications;
          } else if (Array.isArray(res.data.results)) {
            applications = res.data.results;
          } else if (typeof res.data === "object") {
            applications = Object.values(res.data).flat().filter(Boolean);
          }
        }

        // Faqat o'z applicationlarini filtr qilish
        const token = localStorage.getItem("token");
        let myApplications = applications;

        if (token) {
          try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const userId =
              payload.id ||
              payload.userId ||
              payload.user_id ||
              payload.talentId ||
              payload.talent_id ||
              payload.applicantId ||
              payload.applicant_id;

            if (userId) {
              myApplications = applications.filter((app) =>
                [
                  app.talentId,
                  app.talent_id,
                  app.applicantId,
                  app.applicant_id,
                  app.userId,
                  app.user_id,
                  app.profileId,
                ].includes(userId)
              );
            }
          } catch (e) {
            console.warn("Token parse xatosi:", e);
          }
        }

        // Hafta boshini topish (dushanba)
        const now = new Date();
        const dayOfWeek = now.getDay();
        const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        const monday = new Date(now);
        monday.setDate(now.getDate() - diff);
        monday.setHours(0, 0, 0, 0);

        const weekEnd = new Date(monday);
        weekEnd.setDate(monday.getDate() + 7);

        // Har kun uchun hisoblagich
        const counts = new Array(7).fill(0);

        myApplications.forEach((app) => {
          if (!app?.createdAt) return;
          const created = new Date(app.createdAt);
          if (created >= monday && created < weekEnd) {
            const diffDays = Math.floor(
              (created - monday) / (1000 * 60 * 60 * 24)
            );
            if (diffDays >= 0 && diffDays < 7) {
              counts[diffDays]++;
            }
          }
        });

        // Recharts uchun tayyor data
        const formattedData = weekDaysShort.map((day, index) => ({
          day,
          views: counts[index],           // yoki jobOffers, applicationsCount — nomini o‘zgartirishingiz mumkin
        }));

        if (isMounted) {
          setChartData(formattedData);
        }
      } catch (err) {
        console.error("Dashboard xatosi:", err);
        setError("Ma'lumotlarni yuklab bo'lmadi");
        // Test ma'lumot (real loyihada o‘chirib qo‘yish mumkin)
        if (isMounted) {
          setChartData([
            { day: "M", views: 12 },
            { day: "T", views: 45 },
            { day: "W", views: 78 },
            { day: "T", views: 33 },
            { day: "F", views: 92 },
            { day: "S", views: 145 },
            { day: "S", views: 64 },
          ]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAndProcess();

    return () => {
      isMounted = false;
    };
  }, []);

  // Custom tooltip — sizning dizayningizga mos
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      return (
        <div className="relative mb-8">
          <div className="bg-[#5ABF89] text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xl whitespace-nowrap">
            {value} job offer{value !== 1 ? "s" : ""}
          </div>
          <div className="w-4 h-4 bg-[#5ABF89] rotate-45 mx-auto -mt-2" />
        </div>
      );
    }
    return null;
  };

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="w-full mx-auto px-4 py-6">
      <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
            Job Offers
          </h2>

          <div className="inline-flex bg-gray-100 rounded-2xl p-1.5 mb-4">
            <button className="px-7 py-2.5 bg-white rounded-xl text-sm md:text-base font-semibold shadow-sm text-slate-800">
              This week
            </button>
            <button className="px-7 py-2.5 text-gray-500 rounded-xl text-sm md:text-base font-medium hover:bg-white/70 transition">
              This month
            </button>
          </div>

          <div className="text-gray-400 text-sm">{currentDate}</div>
        </div>

        {/* Chart */}
        <div className="h-80 md:h-96 w-full">
          {loading ? (
            <div className="h-full flex items-center justify-center text-gray-500 gap-3">
              <div className="animate-spin h-7 w-7 border-4 border-indigo-500 border-t-transparent rounded-full" />
              Yuklanmoqda...
            </div>
          ) : error ? (
            <div className="h-full flex items-center justify-center text-red-600 text-lg">
              {error}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 30, right: 12, left: -10, bottom: 10 }}
              >
                <defs>
                  <linearGradient id="colorOffers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5ABF89" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#5ABF89" stopOpacity={0.02} />
                  </linearGradient>
                </defs>

                <CartesianGrid vertical={false} stroke="#f0f0f0" />

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 13, fontWeight: 500 }}
                  dy={12}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 13 }}
                  width={30}
                />

                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ stroke: "#5ABF89", strokeWidth: 2, strokeDasharray: "4 4" }}
                />

                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#5ABF89"
                  strokeWidth={3.5}
                  fill="url(#colorOffers)"
                  activeDot={{
                    r: 8,
                    stroke: "#fff",
                    strokeWidth: 3,
                    fill: "#5ABF89",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard3;