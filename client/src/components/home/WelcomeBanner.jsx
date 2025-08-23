// src/components/WelcomeBanner.jsx
import React, { useEffect } from "react";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Icons
import { IoIosRocket } from "react-icons/io";
import { IoBookSharp } from "react-icons/io5";
import { FaGraduationCap, FaNoteSticky } from "react-icons/fa6";

const WelcomeBanner = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    pauseOnHover: false,
  };

  return (
    <section className="relative w-full">
      <Slider {...settings}>
        {/* 🔷 Banner 1 */}
        <div>
          <section className="relative w-full min-h-[700px] flex items-center justify-center text-white overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80"
              alt="Career Path"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/30"></div>

            <div
              className="relative z-10 max-w-4xl text-center px-4 sm:px-6 md:px-8"
              data-aos="zoom-in"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-snug">
                <span className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <IoIosRocket className="text-yellow-400" />
                  Discover Your{" "}
                  <span className="text-yellow-400 drop-shadow-md">Career Path</span>
                </span>
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-yellow-400 animate-text-shimmer text-xl sm:text-2xl md:text-3xl">
                  with AI-Powered Insights
                </span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-gray-200/90 mb-8 leading-relaxed px-3 py-2 rounded-xl">
                <b>SACT – Smart Aptitude & Career Test</b> matches your{" "}
                <span className="text-yellow-400">skills</span> with{" "}
                <span className="text-yellow-400">careers & courses</span>. Your roadmap in minutes.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <a
                  href="#test-form"
                  className="px-5 sm:px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:scale-105 transition flex items-center gap-2 text-sm sm:text-base"
                >
                  <FaNoteSticky />
                  Take Test Now
                </a>
                <a
                  href="#how-it-works"
                  className="px-5 sm:px-6 py-3 border-2 border-yellow-400 text-yellow-400 font-semibold rounded-xl shadow-lg hover:bg-yellow-400 hover:text-black hover:scale-105 transition flex items-center gap-2 text-sm sm:text-base"
                >
                  <IoBookSharp />
                  How It Works
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* 🔷 Banner 2 */}
        <div>
          <section className="relative w-full min-h-[600px] sm:min-h-[650px] md:min-h-[700px] flex items-center justify-center bg-black px-4 sm:px-6 md:px-10">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/circuit.png')] bg-cover"></div>

            <div
              className="relative z-10 max-w-6xl w-full text-center"
              data-aos="fade-up"
            >
              <h2 className="flex flex-col sm:flex-row items-center justify-center text-2xl sm:text-3xl md:text-5xl font-extrabold mb-6 gap-2 sm:gap-3 text-yellow-400">
                <FaGraduationCap className="text-yellow-400 text-3xl sm:text-4xl md:text-5xl" />
                Scholarships up to <span className="text-white">85%</span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto px-2">
                Don’t let fees hold you back. At{" "}
                <b className="text-yellow-400">BM Academy</b>, every deserving student gets access to{" "}
                <span className="text-yellow-400">quality education</span> with massive scholarship support.
              </p>

              {/* Scholarship Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 px-2">
                <div className="p-4 sm:p-6 bg-yellow-400/10 border border-yellow-400 rounded-xl shadow-lg hover:scale-105 transition">
                  <h3 className="text-yellow-400 font-bold text-lg sm:text-xl mb-1 sm:mb-2">85%</h3>
                  <p className="text-gray-200 text-xs sm:text-sm md:text-base">Max Scholarship Coverage</p>
                </div>
                <div className="p-4 sm:p-6 bg-yellow-400/10 border border-yellow-400 rounded-xl shadow-lg hover:scale-105 transition">
                  <h3 className="text-yellow-400 font-bold text-lg sm:text-xl mb-1 sm:mb-2">5K+</h3>
                  <p className="text-gray-200 text-xs sm:text-sm md:text-base">Students Supported</p>
                </div>
                <div className="p-4 sm:p-6 bg-yellow-400/10 border border-yellow-400 rounded-xl shadow-lg hover:scale-105 transition">
                  <h3 className="text-yellow-400 font-bold text-lg sm:text-xl mb-1 sm:mb-2">All Courses</h3>
                  <p className="text-gray-200 text-xs sm:text-sm md:text-base">Govt + Tech Programs</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <a
                  href="/scholarships"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:scale-105 transition text-sm sm:text-base"
                >
                  🏆 Apply for Scholarship
                </a>
                <button
                  type="button"
                  className="flex justify-center gap-2 items-center shadow-xl text-lg bg-gray-50 text-black backdrop-blur-md lg:font-semibold isolation-auto border-yellow-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-yellow-500 hover:text-black before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-6 py-3 overflow-hidden border-2 rounded-full group"
                >
                  📘 Explore Courses
                  <svg
                    className="w-6 h-6 justify-end group-hover:rotate-90 group-hover:bg-black text-black ease-linear duration-300 rounded-full border border-yellow-500 group-hover:border-none p-1 rotate-45"
                    viewBox="0 0 16 19"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                      className="fill-yellow-500 group-hover:fill-black"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </section>
        </div>
      </Slider>
    </section>
  );
};

export default WelcomeBanner;
