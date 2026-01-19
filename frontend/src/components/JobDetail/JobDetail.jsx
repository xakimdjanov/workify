import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jobApi, applicationApi } from "../../services/api";
import { jwtDecode } from "jwt-decode";
import { 
  FaChevronLeft, FaCloudUploadAlt, FaFileAlt, 
  FaTrashAlt, FaMapMarkerAlt, FaRegClock, FaThumbsDown 
} from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null); // Backend odatda bitta fayl kutadi
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setLoading(true);
        const res = await jobApi.getById(id);
        setJob(res.data);
      } catch (err) {
        toast.error("Ma'lumotlarni yuklashda xatolik!");
      } finally {
        setLoading(false);
      }
    };
    fetchJobData();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleApply = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Iltimos, avval tizimga kiring!");

    if (!selectedFile) {
      return toast.error("Iltimos, rezyume faylini yuklang!");
    }

    try {
      setIsSubmitting(true);
      const decoded = jwtDecode(token);
      
      const formData = new FormData();
      // BACKEND KUTAYOTGAN ANIQ MAYDONLAR:
      formData.append("job_id", parseInt(id)); // Integer bo'lishi shart
      formData.append("talent_id", parseInt(decoded.id)); // Integer bo'lishi shart
      formData.append("cover_letter", message);
      formData.append("resume", selectedFile); // Swaggerda "resume" deb yozilgan

      const response = await applicationApi.apply(formData);
      
      if (response.data) {
        toast.success("Arizangiz muvaffaqiyatli yuborildi!");
        navigate("/matches");
      }
    } catch (err) {
      console.error("Xatolik tafsiloti:", err.response?.data);
      toast.error(err.response?.data?.message || "Serverda xatolik yuz berdi (500)");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-20 animate-pulse">Yuklanmoqda...</div>;
  if (!job) return <div className="text-center py-20">Ish topilmadi.</div>;

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#163D5C] font-bold mb-6">
          <FaChevronLeft /> Back to matches
        </button>

        {/* JOB INFO SECTION */}
        <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm mb-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-5">
              <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-2">
                <img src={job.company?.profileimg_url || "/default-company.png"} alt="logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-800">{job.occupation}</h1>
                <p className="text-gray-500 font-bold">{job.company?.company_name || "TechCells"}</p>
                <div className="flex items-center gap-4 mt-2 text-gray-400 text-xs font-bold">
                  <span className="flex items-center gap-1"><FaMapMarkerAlt /> {job.location}</span>
                  <span className="flex items-center gap-1"><FaRegClock /> 4 days ago</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-slate-800">${job.salary_max}.00</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">{job.description}</p>
        </div>

        {/* APPLY FORM SECTION */}
        <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm">
          
          <div className="relative border-2 border-dashed border-gray-200 rounded-[28px] p-12 text-center hover:border-blue-400 transition-all">
            <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf,.doc,.docx" />
            <FaCloudUploadAlt className="mx-auto text-5xl text-[#163D5C] mb-4" />
            <p className="text-gray-600 font-bold">
              Drag and drop or <span className="text-blue-500 underline">Browse</span> resume file
            </p>
          </div>

          {selectedFile && (
            <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl mt-6">
              <div className="flex items-center gap-3">
                <FaFileAlt className="text-[#163D5C]" />
                <div className="truncate max-w-[200px]">
                  <p className="text-xs font-bold text-gray-700 truncate">{selectedFile.name}</p>
                  <p className="text-[10px] text-gray-400">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <button onClick={() => setSelectedFile(null)} className="p-2 bg-red-50 text-red-400 rounded-xl">
                <FaTrashAlt size={14} />
              </button>
            </div>
          )}

          <textarea
            className="w-full mt-8 p-6 bg-[#F9FAFB] border-none rounded-[24px] outline-none min-h-[150px]"
            placeholder="Say something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <div className="flex items-center justify-between mt-8">
            <button className="text-gray-300 hover:text-red-400 transition-colors">
              <FaThumbsDown size={24} />
            </button>
            <button 
              onClick={handleApply}
              disabled={isSubmitting}
              className={`px-20 py-4 rounded-2xl text-white font-black text-lg shadow-lg transition-all ${
                isSubmitting ? "bg-gray-400" : "bg-[#52D394] hover:bg-[#46b881]"
              }`}
            >
              {isSubmitting ? "Sending..." : "Apply"}
            </button>
            <div className="w-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}