import React, { useState } from "react";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaTwitterSquare,
  FaYoutubeSquare,
  FaTelegram,
} from "react-icons/fa";
import { MdEmail, MdPhoneInTalk, MdLocationOn } from "react-icons/md";
import { AiOutlineGlobal } from "react-icons/ai";
import ContactImg from "../../assets/Contactimg.png";
import { contactApi } from "../../services/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setMessage({ 
        text: "Iltimos, barcha maydonlarni to'ldiring", 
        type: "error" 
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage({ 
        text: "Iltimos, to'g'ri email manzil kiriting", 
        type: "error" 
      });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await contactApi.sendMessage({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: new Date().toISOString()
      });

      setMessage({ 
        text: "Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz", 
        type: "success" 
      });
      
      // Formani tozalash
      setFormData({
        name: "",
        email: "",
        message: ""
      });

    } catch (error) {
      console.error("Xabar yuborishda xatolik:", error);
      setMessage({ 
        text: error.response?.data?.message || "Xatolik yuz berdi. Iltimos keyinroq urinib ko'ring", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-4 md:py-10 px-4 font-sans text-[#1E293B]">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="w-full flex justify-start mb-6">
          <div
            className="
              w-full 
              bg-gradient-to-r from-white via-white/70 to-transparent 
              rounded-2xl 
              py-3 px-6 md:py-4 md:px-10 
              shadow-sm 
              border-l-4 border-white
            "
          >
            <h1 className="text-xl md:text-2xl font-bold text-[#4A4A4A]">
              Contact Us
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-sm border border-gray-50 flex flex-col items-center w-full">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-8 leading-tight text-[#333]">
              Is there a message? <br /> Let us know.
            </h2>

            {/* Message display */}
            {message.text && (
              <div className={`w-full max-w-md mb-4 p-3 rounded-lg text-center text-sm ${
                message.type === "success" 
                  ? "bg-green-100 text-green-700 border border-green-200" 
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}>
                {message.text}
              </div>
            )}

            <form
              className="w-full space-y-4 max-w-md"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50/30 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white placeholder:text-gray-300 transition-all text-sm md:text-base"
                disabled={loading}
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50/30 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white placeholder:text-gray-300 transition-all text-sm md:text-base"
                disabled={loading}
              />
              <textarea
                name="message"
                placeholder="What is the message?"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50/30 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white placeholder:text-gray-300 transition-all resize-none text-sm md:text-base"
                disabled={loading}
              ></textarea>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-[#1B3E59] text-white px-12 py-3 rounded-xl font-bold hover:bg-[#152f44] transition-all transform active:scale-95 shadow-lg w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Yuborilmoqda...
                    </span>
                  ) : "Send"}
                </button>
              </div>
            </form>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50 flex items-center justify-center flex-grow min-h-[300px] md:min-h-[400px]">
              <img
                src={ContactImg}
                alt="Contact Illustration"
                className="max-h-full w-auto object-contain"
              />
            </div>

            <div className="bg-white rounded-2xl py-5 px-8 shadow-sm border border-gray-50 flex justify-center items-center gap-6 md:gap-10">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookSquare className="text-[#1B3E59] text-2xl md:text-3xl cursor-pointer hover:scale-110 transition-transform" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-[#1B3E59] text-2xl md:text-3xl cursor-pointer hover:scale-110 transition-transform" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitterSquare className="text-[#1B3E59] text-2xl md:text-3xl cursor-pointer hover:scale-110 transition-transform" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutubeSquare className="text-[#1B3E59] text-2xl md:text-3xl cursor-pointer hover:scale-110 transition-transform" />
              </a>
              <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
                <FaTelegram className="text-[#1B3E59] text-2xl md:text-3xl cursor-pointer hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-sm border border-gray-50">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-10 text-[#333]">
            Our contacts
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              {[
                {
                  icon: <MdEmail />,
                  text: "workifysupport777@mail.ru",
                  isLink: true,
                  href: "mailto:workifysupport777@mail.ru"
                },
                {
                  icon: <MdPhoneInTalk />,
                  text: "+99894-498-6565, +99894-498-65-65",
                  isLink: true,
                  href: "tel:+998944986565"
                },
                {
                  icon: <AiOutlineGlobal />,
                  text: "www.TechCells.com, www.ItStars.com",
                  isLink: true,
                  href: "https://techcells.com"
                },
                {
                  icon: <MdLocationOn />,
                  text: "Usta shirin street 74/85, Tashkent, Uzbekistan",
                  isLink: false
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-5 group">
                  <div className="text-[#1B3E59] text-2xl md:text-3xl shrink-0 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  {item.isLink ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : '_self'}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : ''}
                      className="text-gray-600 font-medium hover:text-blue-600 transition-colors text-sm md:text-base"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <p className="text-gray-600 font-medium text-sm md:text-base">
                      {item.text}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-inner h-[250px] md:h-[350px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d931.702516386193!2d71.67380983420124!3d41.00414059260599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb4d002546dfed%3A0xb9bab87fb75370ba!2sAlgoritm%20IT%20Center!5e0!3m2!1sen!2s!4v1768905674819!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                title="Our Location on Google Maps"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;