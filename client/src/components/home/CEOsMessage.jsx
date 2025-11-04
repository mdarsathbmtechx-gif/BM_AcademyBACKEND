import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

export const CEOsMessage = () => {
  return (
    <section className="relative bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-16 sm:py-20 px-4 sm:px-6 lg:px-20 overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-32 h-32 sm:w-40 sm:h-40 bg-yellow-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-60 sm:h-60 bg-yellow-400 rounded-full blur-3xl opacity-10 animate-pulse"></div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-10 drop-shadow-sm">
          ✉️ CEO’s Message
        </h2>

        {/* Quote Block */}
        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 md:p-12 border border-yellow-200 relative">
          <FaQuoteLeft className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 text-yellow-400 text-2xl sm:text-3xl" />
          <blockquote className="text-lg sm:text-xl md:text-2xl italic text-gray-700 leading-relaxed">
            “At <span className="text-yellow-500 font-semibold">BM Academy</span>, 
            we don’t just teach — we guide futures.”
          </blockquote>
          <FaQuoteRight className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 text-yellow-400 text-2xl sm:text-3xl" />
        </div>

        {/* Message */}
        <p className="mt-6 sm:mt-8 text-gray-800 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
          Our mission is simple: to help every student discover the right path and 
          make career decisions with clarity and confidence. With tools like{" "}
          <span className="font-semibold text-yellow-500">SACT</span> and support from{" "}
          <span className="font-semibold text-yellow-500">BM Foundation</span>, 
          we aim to empower learners everywhere — especially those who need it most.
        </p>

        {/* Closing Statement */}
        <p className="mt-8 sm:mt-10 text-gray-900 font-semibold text-lg sm:text-xl md:text-2xl italic">
          “Let’s build a future you’ll be proud of.”
        </p>

        {/* Signature */}
        <p className="mt-4 sm:mt-6 text-yellow-600 font-bold text-xl sm:text-2xl">
          – [B.M.Kamarudeen], Founder & CEO
        </p>
      </div>
    </section>
  );
};
