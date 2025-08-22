import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaGraduationCap, FaLightbulb, FaLaptopCode, FaChartLine, FaCloud } from "react-icons/fa";

export default function CoursesIntroBanner() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 py-24 sm:py-32 px-4 sm:px-6 md:px-12 overflow-hidden text-white">
      
      {/* Floating Icons */}
      <FaLaptopCode className="absolute top-5 left-2 sm:top-10 sm:left-5 text-yellow-300 text-3xl sm:text-4xl opacity-30 animate-bounce-slow" />
      <FaChartLine className="absolute top-1/4 right-5 sm:top-1/3 sm:right-10 text-yellow-400 text-4xl sm:text-5xl opacity-25 animate-bounce-slower" />
      <FaCloud className="absolute bottom-10 left-10 sm:bottom-20 sm:left-20 text-yellow-200 text-5xl sm:text-6xl opacity-20 animate-bounce-slowest" />
      <FaGraduationCap className="absolute bottom-5 right-20 sm:bottom-10 sm:right-1/4 text-yellow-300 text-4xl sm:text-5xl opacity-25 animate-bounce-slower" />

      {/* Decorative Gradient Shapes */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-yellow-100/10 rounded-full filter blur-2xl sm:blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-1/3 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-yellow-300/10 rounded-full filter blur-2xl sm:blur-3xl -z-10"></div>

      <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
        {/* Heading */}
        <h2
          data-aos="fade-up"
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold flex justify-center items-center gap-3 hover:scale-105 transform transition duration-500"
        >
          <FaGraduationCap className="text-yellow-400" />
          📚 <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500">Our Career-Building Courses</span>
        </h2>

        {/* Subheading */}
        <h3
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-lg sm:text-xl md:text-2xl font-medium flex justify-center items-center gap-2 flex-wrap"
        >
          <FaLightbulb className="text-yellow-400" />
          Build <span className="font-bold text-yellow-400">Skills</span>. Earn <span className="font-bold text-yellow-400">Certifications</span>. Get <span className="font-bold text-yellow-400">Placed</span>.
        </h3>

        {/* Description */}
        <p
          data-aos="fade-up"
          data-aos-delay="400"
          className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-200"
        >
          Explore our most popular <span className="font-semibold text-yellow-400">IT & career courses</span> designed for students, job seekers, and working professionals. Every course includes <span className="font-semibold text-yellow-400">hands-on projects</span>, <span className="font-semibold text-yellow-400">expert trainers</span>, and <span className="font-semibold text-yellow-400">certifications</span> to boost your career.
        </p>

        {/* CTA Buttons */}
        <div
          data-aos="fade-up"
          data-aos-delay="600"
          className="flex flex-col sm:flex-row justify-center gap-4 mt-4 sm:mt-6"
        >
          <a
            href="/sact"
            className="px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold shadow-lg hover:bg-yellow-500 hover:shadow-xl transform hover:-translate-y-1 transition text-center"
          >
            ▶ Take the Free Career Test
          </a>
          <a
            href="/apply"
            className="px-6 py-3 bg-black text-yellow-400 rounded-lg font-semibold shadow-lg hover:bg-gray-800 hover:shadow-xl transform hover:-translate-y-1 transition text-center"
          >
            ℹ Learn More
          </a>
        </div>

        {/* Scholarship Highlight */}
        <div
          data-aos="zoom-in"
          data-aos-delay="800"
          className="inline-block bg-yellow-400/20 text-yellow-300 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold shadow-md hover:bg-yellow-500/20 transition mt-4 sm:mt-6 text-base sm:text-lg"
        >
          🎯 Scholarships up to <span className="text-yellow-300 font-bold">85%</span> available via our{" "}
          <span className="underline font-medium">SAT Entrance Test</span>.
        </div>
      </div>

      {/* Tailwind Custom Animations */}
      <style>
        {`
          @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
          @keyframes bounce-slower { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
          @keyframes bounce-slowest { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }

          .animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }
          .animate-bounce-slower { animation: bounce-slower 6s infinite ease-in-out; }
          .animate-bounce-slowest { animation: bounce-slowest 8s infinite ease-in-out; }
        `}
      </style>
    </section>
  );
}
