import React from "react";
import { IoIosCall } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

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

  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-black to-gray-900 py-16 sm:py-20 px-4 sm:px-6 lg:px-20 text-center text-white overflow-hidden">
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-gradient-radial from-yellow-400/20 to-transparent blur-3xl animate-pulse -z-10"></div>

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-400 drop-shadow-lg animate-pulse">
          Why Choose <span className="text-white">BM Academy?</span>
        </h2>

        {/* Highlights Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl border border-gray-700 hover:border-yellow-400 hover:shadow-yellow-400/40 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-yellow-300 inline-flex items-center gap-2 group-hover:text-yellow-400 transition-colors">
                <FaCheck size={20} /> {item.title}
              </h3>
              <p className="text-gray-400 mt-2 group-hover:text-gray-200 text-sm sm:text-base transition-colors">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row flex-wrap justify-center gap-4">
          <a
            href="#"
            className="px-6 py-3 rounded-2xl bg-yellow-400 text-black font-semibold shadow-md hover:bg-yellow-500 transition transform hover:scale-105 flex-1 sm:flex-auto text-center"
          >
            🚀 Join Now
          </a>
          <a
            href="tel:+91XXXXXXXXXX"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-yellow-400 text-black font-semibold shadow-md hover:bg-yellow-500 transition transform hover:scale-105 flex-1 sm:flex-auto text-center"
          >
            <IoIosCall size={20} />
            Call Us
          </a>
        </div>
      </div>
    </section>
  );
}
