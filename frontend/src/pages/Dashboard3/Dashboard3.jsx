// Dashboard3.jsx - responsive down to 400px with week/month toggle
import React, { useEffect, useState, useMemo } from "react";
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
  const [chartData, setChartData] = useState({ week: [], month: [] });
  const [activeTab, setActiveTab] = useState("week");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const weekDaysShort = ["M", "T", "W", "T", "F", "S", "S"];
  const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    let isMounted = true;

    const fetchAndProcess = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await applicationApi.getAll();
        let applications = [];

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

        // Haftalik ma'lumotlar
        const now = new Date();
        const dayOfWeek = now.getDay();
        const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        const monday = new Date(now);
        monday.setDate(now.getDate() - diff);
        monday.setHours(0, 0, 0, 0);

        const weekEnd = new Date(monday);
        weekEnd.setDate(monday.getDate() + 7);

        const weekCounts = new Array(7).fill(0);

        // Oylik ma'lumotlar
        const currentYear = now.getFullYear();
        const monthCounts = new Array(12).fill(0);

        myApplications.forEach((app) => {
          if (!app?.createdAt) return;
          const created = new Date(app.createdAt);

          // Haftalik statistikaga qo'shish
          if (created >= monday && created < weekEnd) {
            const diffDays = Math.floor(
              (created - monday) / (1000 * 60 * 60 * 24)
            );
            if (diffDays >= 0 && diffDays < 7) {
              weekCounts[diffDays]++;
            }
          }

          // Oylik statistikaga qo'shish
          const year = created.getFullYear();
          if (year === currentYear) {
            const month = created.getMonth();
            monthCounts[month]++;
          }
        });

        const formattedWeekData = weekDaysShort.map((day, index) => ({
          day,
          views: weekCounts[index],
        }));

        const formattedMonthData = monthNamesShort.map((month, index) => ({
          day: month,
          views: monthCounts[index],
        }));

        if (isMounted) {
          setChartData({
            week: formattedWeekData,
            month: formattedMonthData
          });
        }
      } catch (err) {
        console.error("Dashboard xatosi:", err);
        setError("Ma'lumotlarni yuklab bo'lmadi");
        if (isMounted) {
          setChartData({
            week: [
              { day: "M", views: 12 },
              { day: "T", views: 45 },
              { day: "W", views: 78 },
              { day: "T", views: 33 },
              { day: "F", views: 92 },
              { day: "S", views: 145 },
              { day: "S", views: 64 },
            ],
            month: [
              { day: "Jan", views: 120 },
              { day: "Feb", views: 150 },
              { day: "Mar", views: 180 },
              { day: "Apr", views: 200 },
              { day: "May", views: 220 },
              { day: "Jun", views: 240 },
              { day: "Jul", views: 260 },
              { day: "Aug", views: 280 },
              { day: "Sep", views: 250 },
              { day: "Oct", views: 230 },
              { day: "Nov", views: 210 },
              { day: "Dec", views: 190 },
            ]
          });
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

  const activeData = useMemo(() => {
    return activeTab === "week" ? chartData.week : chartData.month;
  }, [activeTab, chartData]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      return (
        <div className="relative mb-6 xs:mb-8">
          <div className="bg-[#5ABF89] text-white text-[10px] xs:text-xs sm:text-sm font-semibold px-2 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-2.5 rounded-lg xs:rounded-xl shadow-xl whitespace-nowrap">
            {value} job offer{value !== 1 ? "s" : ""}
          </div>
          <div className="w-2 h-2 xs:w-3 xs:h-3 sm:w-4 sm:h-4 bg-[#5ABF89] rotate-45 mx-auto -mt-1 xs:-mt-1.5 sm:-mt-2" />
        </div>
      );
    }
    return null;
  };

  const getDisplayDate = () => {
    const now = new Date();
    if (activeTab === "week") {
      const dayOfWeek = now.getDay();
      const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const monday = new Date(now);
      monday.setDate(now.getDate() - diff);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      
      return `${monday.getDate()} ${monday.toLocaleDateString('en-GB', { month: 'short' })} - ${sunday.getDate()} ${sunday.toLocaleDateString('en-GB', { month: 'short' })} ${monday.getFullYear()}`;
    } else {
      return `January - December ${now.getFullYear()}`;
    }
  };

  // Get responsive chart height
  const getChartHeight = () => {
    if (windowWidth < 400) return 180;
    if (windowWidth < 500) return 200;
    if (windowWidth < 640) return 220;
    if (windowWidth < 768) return 260;
    if (windowWidth < 1024) return 300;
    return 350;
  };

  // Get Y-axis width based on screen size
  const getYAxisWidth = () => {
    if (windowWidth < 400) return 20;
    if (windowWidth < 500) return 25;
    if (windowWidth < 768) return 30;
    return 35;
  };

  // Get X-axis padding based on active tab
  const getXPadding = () => {
    if (activeTab === "month") {
      return windowWidth < 400 ? -5 : 0;
    }
    return windowWidth < 400 ? 0 : (windowWidth < 500 ? 5 : 12);
  };

  return (
    <div className="w-full mx-auto xs:px-2 py-3 xs:py-4 sm:py-6">
      <div className="bg-white rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-lg p-3 xs:p-4 sm:p-6 md:p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10">
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-2 xs:mb-3 sm:mb-4">
            Job Offers
          </h2>

          <div className="inline-flex bg-gray-100 rounded-lg xs:rounded-xl sm:rounded-2xl p-0.5 xs:p-1 sm:p-1.5 mb-2 xs:mb-3 sm:mb-4">
            <button 
              onClick={() => setActiveTab("week")}
              className={`px-2.5 xs:px-3 sm:px-4 md:px-6 lg:px-7 py-1 xs:py-1.5 sm:py-2 md:py-2.5 rounded-md xs:rounded-lg sm:rounded-xl text-[10px] xs:text-xs sm:text-sm md:text-base font-semibold shadow-sm whitespace-nowrap transition-all ${
                activeTab === "week" 
                  ? "bg-white text-slate-800" 
                  : "text-gray-500 hover:bg-white/70"
              }`}
            >
              This week
            </button>
            <button 
              onClick={() => setActiveTab("month")}
              className={`px-2.5 xs:px-3 sm:px-4 md:px-6 lg:px-7 py-1 xs:py-1.5 sm:py-2 md:py-2.5 rounded-md xs:rounded-lg sm:rounded-xl text-[10px] xs:text-xs sm:text-sm md:text-base font-semibold shadow-sm whitespace-nowrap transition-all ${
                activeTab === "month" 
                  ? "bg-white text-slate-800" 
                  : "text-gray-500 hover:bg-white/70"
              }`}
            >
              This year
            </button>
          </div>

          <div className="text-gray-400 text-[10px] xs:text-xs sm:text-sm">
            {getDisplayDate()}
          </div>
        </div>

        {/* Chart */}
        <div className={`h-[${getChartHeight()}px] w-full`}>
          {loading ? (
            <div className="h-full flex items-center justify-center text-gray-500 gap-1.5 xs:gap-2 sm:gap-3">
              <div className="animate-spin h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 border-3 xs:border-4 border-indigo-500 border-t-transparent rounded-full" />
              <span className="text-[10px] xs:text-xs sm:text-sm md:text-base">Yuklanmoqda...</span>
            </div>
          ) : error ? (
            <div className="h-full flex items-center justify-center text-red-600 text-xs xs:text-sm sm:text-base md:text-lg">
              {error}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={activeData}
                margin={{ 
                  top: windowWidth < 400 ? 10 : 20,
                  right: getXPadding(),
                  left: -getYAxisWidth(),
                  bottom: windowWidth < 400 ? 5 : (windowWidth < 640 ? 10 : 15)
                }}
              >
                <defs>
                  <linearGradient id="colorOffers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5ABF89" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#5ABF89" stopOpacity={0.02} />
                  </linearGradient>
                </defs>

                <CartesianGrid 
                  vertical={false} 
                  stroke="#f0f0f0" 
                  strokeDasharray={windowWidth < 400 ? "2 2" : "3 3"}
                />

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ 
                    fill: "#9CA3AF", 
                    fontSize: windowWidth < 400 ? 10 : (windowWidth < 500 ? 11 : 13),
                    fontWeight: 500 
                  }}
                  dy={windowWidth < 400 ? 5 : 10}
                  minTickGap={activeTab === "month" ? 0 : 1}
                  interval={windowWidth < 400 && activeTab === "month" ? "preserveStartEnd" : 0}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ 
                    fill: "#9CA3AF", 
                    fontSize: windowWidth < 400 ? 10 : (windowWidth < 500 ? 11 : 13)
                  }}
                  width={getYAxisWidth()}
                />

                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ 
                    stroke: "#5ABF89", 
                    strokeWidth: windowWidth < 400 ? 1 : 1.5, 
                    strokeDasharray: "3 3" 
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#5ABF89"
                  strokeWidth={windowWidth < 400 ? 1.5 : (windowWidth < 500 ? 2 : 3.5)}
                  fill="url(#colorOffers)"
                  activeDot={{
                    r: windowWidth < 400 ? 4 : (windowWidth < 500 ? 5 : 8),
                    stroke: "#fff",
                    strokeWidth: windowWidth < 400 ? 1 : (windowWidth < 500 ? 2 : 3),
                    fill: "#5ABF89",
                  }}
                  dot={windowWidth > 768 ? {
                    r: windowWidth < 1024 ? 3 : 4,
                    stroke: "#5ABF89",
                    strokeWidth: 1,
                    fill: "#fff"
                  } : false}
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