import React from 'react'
import { FaCheck } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaHandPointRight } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import HeroImg from "../../assets/img/hero-academy.jpg";


export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-blue-50 to-indigo-100 py-16 px-6 lg:px-20 text-center lg:text-left">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        {/* Left Content */}
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight"><FaGraduationCap />
            Empowering Futures with <span className="text-yellow-400">Skills & Scholarships!</span>
          </h1>

          <p className="mt-6 text-lg text-gray-700">
            Unlock your potential with BM Academy&apos;s SAT Program —
            Get up to <span className="font-bold text-yellow-400">85% scholarship</span> on career-building courses!
            From government exam prep to in-demand tech skills, we guide you every step of the way.
          </p>

          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <FaCheck className="text-black mt-1" size={18} />
              <span>Govt. Exam Coaching (TNPSC, SSC, etc.)</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheck className="text-black-600 mt-1" size={18} />
              <span>IT & Tech Courses (Web Development, Data Science & more)</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheck className="text-black-600 mt-1" size={18} />
              <span>Free Career Guidance via our SACT AI Career Test</span>
            </li>
          </ul>

          <p className="mt-6 text-sm text-gray-600 flex items-center gap-2">
            <FaLocationDot className="text-black" size={20} />
            Available in Pondicherry, Tamil Nadu, & Across India
          </p>
          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
            <a
              href="#"
              className="px-6 py-3 rounded-2xl bg-yellow-400 text-black font-semibold shadow-md hover:bg-yellow-600 flex items-center gap-2"
            >
              <FaHandPointRight className="text-black" size={18} />
              Try AI Career Test (SACT)
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-yellow-600 text-black font-semibold hover:bg-yellow-50 transition"
            >
              <FiTarget className="text-black" size={18} />
              Explore Courses
            </a>
          </div>
        </div>

        {/* Right Illustration (Optional Placeholder) */}
        <div className="hidden lg:block">
          <img
  src={HeroImg}
  alt="BM Academy Illustration"
  className="w-full h-auto drop-shadow-xl rounded-2xl"
/>


        </div>
      </div>
    </section>
  );
}
