import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jobApi } from "../../services/api";
import { FaChevronLeft } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [companyStats, setCompanyStats] = useState({ active: 0, total: 0 });

  useEffect(() => {
    const fetchFullData = async () => {
      try {
        setLoading(true);
        // 1. Ish ma'lumotlarini olish
        const res = await jobApi.getById(id);
        const jobData = res.data;
        setJob(jobData);

        // 2. Kompaniya statistikasini hisoblash (Kompaniya ID orqali)
        if (jobData?.company_id) {
          const statsRes = await jobApi.getByCompany(jobData.company_id);
          const allJobs = Array.isArray(statsRes.data) ? statsRes.data : [];
          
          setCompanyStats({
            active: allJobs.filter(j => j.is_activate === true).length,
            total: allJobs.length
          });
        }
      } catch (err) {
        console.error(err);
        toast.error("Ma'lumotlarni yuklashda xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    fetchFullData();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#52D394]"></div>
    </div>
  );

  if (!job) return <div className="text-center py-20 text-red-500 font-bold">Ish topilmadi.</div>;

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6 flex items-center justify-between border border-gray-100">
           <h2 className="text-lg font-bold text-gray-700 ml-4">Job Details</h2>
           <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-full transition-all">
             <FaChevronLeft className="text-gray-400" />
           </button>
        </div>

        {/* --- JOB INFO CARD --- */}
        <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
            <div className="flex gap-5">
              <div className="w-16 h-16 bg-[#008B8B] rounded-2xl flex items-center justify-center p-2 shadow-sm shrink-0">
                <img 
                  src={job.company?.profileimg_url || "/default-company.png"} 
                  alt="logo" 
                  className="w-full h-full object-contain brightness-0 invert" 
                />
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">{job.occupation}</h1>
                <p className="text-gray-400 font-bold text-sm">{job.company?.company_name}</p>
                <p className="text-gray-400 text-[12px] mt-1 font-medium italic">
                  {job.company?.city} • {job.workplace_type}
                </p>
              </div>
            </div>
            <div className="md:text-right w-full md:w-auto">
              <p className="text-gray-400 text-xs font-bold mb-1">Posted {new Date(job.createdAt).toLocaleDateString()}</p>
              <span className="text-2xl font-black text-slate-800">${job.salary_min}-{job.salary_max}</span>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-md font-black text-slate-800 mb-3 uppercase tracking-wider text-[13px]">What you will do:</h3>
              <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
                {job.description || "No description provided."}
              </p>
            </div>

            <div>
              <h3 className="text-md font-black text-slate-800 mb-3 uppercase tracking-wider text-[13px]">Required skills:</h3>
              <div className="flex flex-wrap gap-2">
               <span className="px-5 py-2.5 bg-[#F1F3F6] text-gray-600 rounded-xl text-xs font-bold border border-transparent">{job.skils}</span>
              </div>
            </div>
          </div>

          {/* APPLY BUTTON */}
          <div className="flex justify-center mt-12">
            <button 
              onClick={() => navigate(`/job-post/${job.id}`)}
              className="px-20 md:px-32 py-4 bg-[#52D394] hover:bg-[#46b881] text-white font-black rounded-2xl transition-all shadow-lg shadow-green-100 transform active:scale-95"
            >
              Apply Now
            </button>
          </div>
        </div>

        {/* --- ABOUT COMPANY SECTION --- */}
        <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
          <h3 className="text-md font-black text-slate-800 mb-6 uppercase tracking-wider text-[13px]">About company</h3>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex gap-4 w-full lg:w-auto">
              <div className="w-14 h-14 bg-[#008B8B] rounded-2xl flex items-center justify-center p-2 shrink-0">
                 <img 
                  src={job.company?.profileimg_url || "/default-company.png"} 
                  alt="logo" 
                  className="w-full h-full object-contain brightness-0 invert" 
                />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-md font-black text-slate-800 truncate">{job.company?.company_name}</h4>
                <p className="text-gray-400 text-[11px] font-bold leading-tight uppercase truncate">
                  {job.company?.category || "Technology & Software"}
                </p>
                <p className="text-gray-400 text-[11px] font-bold mt-1 opacity-70 italic">{job.location}</p>
              </div>
            </div>

            {/* Statistika (Dinamik) */}
            <div className="flex items-center justify-around w-full lg:w-auto gap-4 md:gap-12 text-center border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 lg:pt-0 lg:pl-10">
              <div className="min-w-[80px]">
                <p className="text-xl md:text-2xl font-black text-slate-800">{companyStats.active}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Active jobs</p>
              </div>
              <div className="hidden md:block h-8 w-[1px] bg-gray-100"></div>
              <div className="min-w-[80px]">
                <p className="text-xl md:text-2xl font-black text-slate-800">{companyStats.total}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Jobs posted</p>
              </div>
              <div className="hidden md:block h-8 w-[1px] bg-gray-100"></div>
              <div className="min-w-[80px]">
                <p className="text-xl md:text-2xl font-black text-slate-800">250+</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Hired</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}