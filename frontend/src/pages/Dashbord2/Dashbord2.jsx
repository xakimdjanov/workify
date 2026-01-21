import React, { useEffect, useState } from "react";
import { applicationApi } from "../../services/api";

const Dashboard2 = () => {
  const [weeklyStats, setWeeklyStats] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

  const getThisMonday = () => {
    const now = new Date();
    const day = now.getDay();
    const diff = day === 0 ? 6 : day - 1;
    const monday = new Date(now);
    monday.setDate(now.getDate() - diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await applicationApi.getAll();

        let applications = [];
        if (response?.data) {
          if (Array.isArray(response.data)) {
            applications = response.data;
          } else if (Array.isArray(response.data.applications)) {
            applications = response.data.applications;
          } else if (Array.isArray(response.data.results)) {
            applications = response.data.results;
          } else if (typeof response.data === "object") {
            applications = Object.values(response.data).flat().filter(Boolean);
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
              myApplications = applications.filter((app) => {
                return (
                  app.talentId === userId ||
                  app.talent_id === userId ||
                  app.applicantId === userId ||
                  app.applicant_id === userId ||
                  app.userId === userId ||
                  app.user_id === userId ||
                  app.profileId === userId
                );
              });
            }
          } catch (e) {
            console.warn("Token parse qilib bo'lmadi", e);
          }
        }

        const monday = getThisMonday();
        const weekEnd = new Date(monday);
        weekEnd.setDate(monday.getDate() + 7);

        const weekData = new Array(7).fill(0);

        myApplications.forEach((app) => {
          if (!app?.createdAt) return;
          const created = new Date(app.createdAt);
          if (created >= monday && created < weekEnd) {
            const dayIndex = Math.floor(
              (created - monday) / (1000 * 60 * 60 * 24)
            );
            if (dayIndex >= 0 && dayIndex < 7) {
              weekData[dayIndex]++;
            }
          }
        });

        if (isMounted) {
          setWeeklyStats(weekData);
        }
      } catch (err) {
        console.error("Dashboard ma'lumot xatosi:", err);
        setError("Ma'lumotlarni yuklab bo'lmadi");
        if (isMounted) {
          setWeeklyStats([45, 120, 85, 210, 180, 95, 60]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const maxValue = Math.max(...weeklyStats, 1);
  const chartHeight = 100;
  const yAxisValues = [0, Math.round(maxValue * 0.5), maxValue];

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="w-[550px] pt-6">
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Profile Views
          </h2>
          <div className="inline-flex bg-gray-100 rounded-full p-1 mb-3">
            <button className="px-6 py-2 bg-white rounded-full text-sm font-semibold shadow-sm">
              This week
            </button>
            <button className="px-6 py-2 text-gray-600 rounded-full text-sm font-medium hover:bg-white/60 transition">
              This month
            </button>
          </div>
          <div className="text-sm text-gray-500">{currentDate}</div>
        </div>

        <div className="relative">
          {loading ? (
            <div className="h-[165px] flex items-center justify-center gap-3 text-gray-500">
              <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full" />
              Yuklanmoqda...
            </div>
          ) : error ? (
            <div className="h-[165px] flex items-center justify-center text-red-600">
              {error}
            </div>
          ) : (
            <div className="flex h-[165px]">
              <div className="w-12 flex flex-col justify-between text-xs text-gray-400 pr-2 text-right pb-2">
                {yAxisValues.reverse().map((val, i) => (
                  <div key={i} className="h-[50px] flex items-end justify-end">
                    {val}
                  </div>
                ))}
              </div>

              <div className="flex-1 relative">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[0, 1, 2].map((_, i) => (
                    <div
                      key={i}
                      className="border-t border-gray-100 w-full"
                      style={{
                        position: "absolute",
                        top: i === 0 ? "0px" : i === 1 ? "50px" : "100px",
                        width: "100%",
                      }}
                    />
                  ))}
                </div>

                <div className="absolute inset-0 flex items-end justify-between px-2 pb-2">
                  {weekDays.map((day, i) => {
                    const value = weeklyStats[i];
                    const height = (value / maxValue) * chartHeight;

                    return (
                      <div
                        key={day}
                        className="flex flex-col items-center group w-10"
                      >
                        <div className="relative w-full">
                          <div
                            className={`w-full rounded-t-xl transition-all duration-300 ${
                              value > 0
                                ? "bg-gradient-to-t from-indigo-600 to-purple-500 hover:brightness-110"
                                : "bg-gray-100"
                            }`}
                            style={{
                              height: Math.max(height, 2),
                              minHeight: "2px",
                            }}
                          />

                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                            <div className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                              {value} view{value !== 1 ? "s" : ""}
                            </div>
                            <div className="w-3 h-3 bg-gray-900 rotate-45 mx-auto -mt-1.5" />
                          </div>
                        </div>

                        <div className="mt-2 text-sm font-medium text-gray-600">
                          {day}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard2;
