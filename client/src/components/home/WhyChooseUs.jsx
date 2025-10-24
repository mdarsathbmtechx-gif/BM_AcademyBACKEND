import React, { useState } from "react";
import { IoIosCall } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { FaRocket } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function WhyChooseUs() {
  const highlights = [
    {
      title: "1100+ Students Trained",
      desc: "Proven success in coaching & career building.",
    },
    {
      title: "Free AI Career Guider",
      desc: "Personalized guidance with our AI-powered SACT tool.",
    },
    {
      title: "Practical, Job-Oriented Courses",
      desc: "Hands-on learning to make you career-ready.",
    },
    {
      title: "Scholarships for Deserving Students",
      desc: "Up to 85% off via our SAT scholarship program.",
    },
    {
      title: "Flexible Learning",
      desc: "Offline classes + Online live sessions for all learners.",
    },
  ];

  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-black to-gray-900 py-16 sm:py-20 px-4 sm:px-6 lg:px-20 text-center text-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-400 drop-shadow-lg">
          Why Choose <span className="text-white">BM Academy?</span>
        </h2>

        {/* Highlights Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
          {highlights.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl bg-gray-800 shadow-xl border border-gray-700 transition-all duration-500 transform cursor-pointer
              ${hoverIndex === index ? "border-yellow-400 shadow-yellow-400/40 -translate-y-2 scale-105" : ""}`}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              onTouchStart={() => setHoverIndex(index)}
              onTouchEnd={() => setHoverIndex(null)}
            >
              <h3
                className={`text-lg sm:text-xl font-semibold inline-flex items-center gap-2 transition-colors 
                ${hoverIndex === index ? "text-yellow-400" : "text-yellow-300"}`}
              >
                <FaCheck size={20} /> {item.title}
              </h3>
              <p
                className={`mt-2 text-sm sm:text-base transition-colors 
                ${hoverIndex === index ? "text-gray-200" : "text-gray-400"}`}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row flex-wrap justify-center gap-4">
          <Link
  to="/courses"
  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-yellow-400 text-black font-semibold shadow-md hover:bg-yellow-500 transition transform active:scale-95 hover:scale-105"
>
  <FaRocket size={20} />
  Join Now
</Link>

          <a
            href="tel:+91XXXXXXXXXX"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-yellow-400 text-black font-semibold shadow-md hover:bg-yellow-500 transition transform active:scale-95 hover:scale-105"
          >
            <IoIosCall size={20} />
            Call Us
          </a>
        </div>
      </div>
    </section>
  );
}
