import React from "react";
import { FaBrain, FaGraduationCap, FaPhone } from "react-icons/fa";
import { IoRocketOutline } from "react-icons/io5";

export default function CareerTestSection() {
  return (
    <section className="relative bg-gray-50 py-16 px-6 pt-28 border-b border-gray-200">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
           
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What is SACT?</h2>
          <p className="text-lg text-gray-600">
            SACT (Smart Aptitude & Career Test) is a quick online test designed for students.  
            It helps you discover your <span className="font-semibold">Interests, Aptitude, and Personality</span>  
            — and gives you a clear career roadmap at <span className="text-yellow-500 font-semibold">zero cost</span>.
          </p>
        </div>

        {/* What You’ll Get */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">What You’ll Get – For FREE</h3>
            <ul className="space-y-3 text-gray-700">
              <li>📄 Personalized Career Report (PDF) – With 3 top career paths</li>
              <li>🎓 Recommended BM Academy Courses – Based on your profile</li>
              <li>🏅 Scholarship Eligibility – Up to 85% fee waivers (SAT Exam)</li>
              <li>💬 Free Career Guidance Call – With our experts</li>
            </ul>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">How BM Foundation Supports Students</h3>
            <p className="text-gray-700 mb-3">
              Many students have talent but lack guidance. With BM Foundation, deserving students get:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li>🔸 100% Free Access to SACT & Career Guidance</li>
              <li>🔸 Scholarships for Skills Courses</li>
              <li>🔸 Mentorship from Career Coaches</li>
            </ul>
            <p className="mt-4 italic text-gray-600">
              “SACT is not just a test — it’s a social initiative. With BM Foundation, we ensure no student is left behind.”<br />
              — Founder, BM Academy
            </p>
          </div>
        </div>

        {/* How to Take the Test */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-xl mb-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">How to Take the SACT Test</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Fill the Google Form – 20+ guided questions</li>
            <li>AI Analyzes Your Profile</li>
            <li>Get Report Instantly + Email PDF</li>
            <li>Optional Counseling with Career Experts</li>
          </ol>
          <p className="mt-3 text-gray-700">Duration: 15 minutes | Cost: ₹0 – Absolutely Free</p>
        </div>

        {/* Who Can Take This */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Who Can Take This?</h3>
          <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
            <li>Class 9th to 12th Students</li>
            <li>Diploma & UG Students</li>
            <li>Graduates unsure about next steps</li>
            <li>Students from Tamil Nadu, Pondicherry & anywhere in India</li>
          </ul>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-yellow-400 to-yellow-500 py-10 px-6 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Take Your Free Career Test Now</h3>
          <p className="text-gray-800 mb-6">Discover Your Strengths. Choose the Right Path. Build a Bright Future.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#"
              className="px-6 py-3 bg-black text-white rounded-xl shadow hover:bg-gray-800 transition flex items-center gap-2"
            >
              <FaBrain className="text-yellow-400" />
              Take Free SACT Test
            </a>
            <a
              href="#"
              className="px-6 py-3 bg-white text-gray-900 rounded-xl shadow border hover:bg-gray-100 transition flex items-center gap-2"
            >
              <FaPhone className="text-gray-900" />
              Talk to a Career Expert
            </a>
            <a
              href="#"
              className="px-6 py-3 bg-gray-900 text-white rounded-xl shadow hover:bg-black transition flex items-center gap-2"
            >
              <FaGraduationCap className="text-yellow-400" />
              View Courses Based on My Report
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
