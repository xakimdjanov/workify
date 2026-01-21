import React, { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import FAQimg from "../../assets/FAQimg.png";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question:
        "It is a long established fact that a reader will be distracted by the readable content of a page when?",
      answer:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    },
    {
      question:
        "It is a long established fact that a reader will be distracted by the readable content of a page when?",
      answer:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It helps focus on the structure rather than the text itself.",
    },
    {
      question:
        "It is a long established fact that a reader will be distracted by the readable content of a page when?",
      answer:
        "This is another sample answer to demonstrate the toggle effect of the accordion component. It opens and closes smoothly.",
    },
    {
      question:
        "It is a long established fact that a reader will be distracted by the readable content of a page when?",
      answer:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Many desktop publishing packages and web page editors now use Lorem Ipsum.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-6 md:py-10 px-4 font-sans text-[#1E293B]">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl py-3 px-6 md:py-4 md:px-8 mb-8 shadow-sm border border-gray-100">
          <h1 className="text-xl md:text-2xl font-bold">FAQ</h1>
        </div>

        <div className="flex justify-center mb-10 md:mb-14">
          <div className="h-44 md:h-72 w-full flex items-center justify-center">
            <img
              src={FAQimg}
              alt="FAQ Illustration"
              className="max-h-full w-auto object-contain"
            />
          </div>
        </div>

        <div className="space-y-3 md:space-y-4">
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-50 overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-start md:items-center justify-between p-4 md:p-6 text-left hover:bg-gray-50/50 transition-all duration-500"
                >
                  <div className="flex items-start md:items-center gap-3 md:gap-5">
                    <span
                      className={`text-lg md:text-2xl mt-1 md:mt-0 transition-all duration-500 ease-in-out ${
                        isOpen
                          ? "text-[#3B82F6] rotate-180"
                          : "text-gray-400 rotate-0"
                      }`}
                    >
                      <IoChevronDown />
                    </span>
                    <span
                      className={`font-semibold text-sm md:text-lg leading-tight transition-colors duration-500 ${
                        isOpen ? "text-[#1E293B]" : "text-[#475569]"
                      }`}
                    >
                      {item.question}
                    </span>
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-gray-500 leading-relaxed text-xs md:text-base border-t border-gray-50 pt-3 md:pt-4 px-4 md:px-6 pb-5 md:pb-8">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Faq;
