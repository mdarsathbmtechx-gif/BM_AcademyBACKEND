import React from "react";
import { IoIosCall } from "react-icons/io";
const CallToAction = () => {
  return (
    <section className="bg-white text-center py-12 px-6 rounded-xl shadow-md mt-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        🎯 Ready to Start Your Career Journey?
      </h2>
      <p className="text-lg md:text-xl mb-6 text-gray-700">
        Join 1000+ students who chose BM Academy for skills, scholarships, and success.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <a
          href="/contact"
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
        >
           <IoIosCall size={20}/>
           Contact Us
        </a>
        <a
          href="/apply"
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          📝 Join Now
        </a>
      </div>
    </section>
  );
};

export default CallToAction;
