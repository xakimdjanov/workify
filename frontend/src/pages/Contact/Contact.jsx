import React from "react";
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

const Contact = () => {
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
              Faq
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-sm border border-gray-50 flex flex-col items-center w-full">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-8 leading-tight text-[#333]">
              Is there a problem? <br /> Let us know.
            </h2>

            <form
              className="w-full space-y-4 max-w-md"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="Your name"
                className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50/30 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white placeholder:text-gray-300 transition-all text-sm md:text-base"
              />
              <input
                type="email"
                placeholder="Your email"
                className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50/30 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white placeholder:text-gray-300 transition-all text-sm md:text-base"
              />
              <textarea
                placeholder="What is the problem?"
                rows="4"
                className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50/30 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white placeholder:text-gray-300 transition-all resize-none text-sm md:text-base"
              ></textarea>

              <div className="flex justify-center pt-4">
                <button className="bg-[#1B3E59] text-white px-12 py-3 rounded-xl font-bold hover:bg-[#152f44] transition-all transform active:scale-95 shadow-lg w-full md:w-auto">
                  Send
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
              <FaFacebookSquare className="text-[#1B3E59] text-2xl md:text-3xl cursor-pointer hover:scale-110 transition-transform" />
              <FaLinkedin className="text-[#1B3E59] text-2xl md:text-3xl cursor-pointer hover:scale-110 transition-transform" />
              <FaTwitterSquare className="text-[#1B3E59] text-2xl md:text-3xl cursor-pointer hover:scale-110 transition-transform" />
              <FaYoutubeSquare className="text-[#1B3E59] text-2xl md:text-3xl cursor-pointer hover:scale-110 transition-transform" />
              <FaTelegram className="text-[#1B3E59] text-2xl md:text-3xl cursor-pointer hover:scale-110 transition-transform" />
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
                },
                {
                  icon: <MdPhoneInTalk />,
                  text: "+99894-498-6565, +99894-498-65-65",
                },
                {
                  icon: <AiOutlineGlobal />,
                  text: "www.TechCells.com, www.ItStars.com",
                },
                {
                  icon: <MdLocationOn />,
                  text: "Usta shirin street 74/85, Tashkent, Uzbekistan",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-5 group">
                  <div className="text-[#1B3E59] text-2xl md:text-3xl shrink-0 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  {item.isLink ? (
                    <a
                      href={`mailto:${item.text}`}
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
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
