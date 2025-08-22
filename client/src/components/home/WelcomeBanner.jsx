// src/components/WelcomeBanner.jsx
import React, { useEffect } from "react";
import { IoArrowForward } from "react-icons/io5";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaGraduationCap } from "react-icons/fa6";
import { IoIosRocket } from "react-icons/io";
import { FaNoteSticky } from "react-icons/fa6";
import { IoBookSharp } from "react-icons/io5";

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
    <section className="relative w-full overflow-hidden">
      <Slider {...settings}>
        {/* 🔷 Banner 1 (original Banner 2): AI Career Test */}
        <div>
          <section
            className="relative w-full h-[540px] md:h-[640px] flex items-center justify-center bg-cover bg-center text-white"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/30"></div>

            <div
              className="relative z-10 max-w-4xl text-center px-6"
              data-aos="zoom-in"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-snug">
                <span className="flex items-center gap-3">
                  <IoIosRocket className="text-yellow-400" />
                  Discover Your <span className="text-yellow-400 drop-shadow-md">Career Path</span>
                </span>
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-yellow-400 animate-text-shimmer">
                  with AI-Powered Insights
                </span>
              </h2>


              <p className="text-lg md:text-xl text-gray-200/90 mb-8 leading-relaxed px-4 py-3 rounded-xl">
                <b>SACT – Smart Aptitude & Career Test</b> matches your{" "}
                <span className="text-yellow-400">skills</span> with{" "}
                <span className="text-yellow-400">careers & courses</span>.
                <span className="text-white/90"> Your roadmap in minutes.</span>
              </p>


              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <a
                  href="#test-form"
                  className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:scale-105 transition flex items-center gap-2"
                >
                  <FaNoteSticky />
                  Take Test Now
                </a>

                <a
                  href="#how-it-works"
                  className="px-6 py-3 border-2 border-yellow-400 text-yellow-400 font-semibold rounded-xl shadow-lg hover:bg-yellow-400 hover:text-black hover:scale-105 transition flex items-center gap-2"
                >
                  <IoBookSharp />
                  How It Works
                </a>

              </div>
            </div>
          </section>
        </div>

        {/* 🔷 Banner 2 (original Banner 3): Scholarships */}
        <div>
          <section
            className="relative w-full h-[560px] md:h-[660px] flex items-center justify-center bg-black"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/circuit.png')]"></div>

            <div
              className="relative z-10 max-w-6xl mx-auto text-center px-6"
              data-aos="fade-up"
            >
              <h2 className="flex items-center text-3xl md:text-5xl font-extrabold mb-6 leading-snug text-yellow-400 gap-3">
                <FaGraduationCap className="text-yellow-400" />
                Scholarships up to <span className="text-white">85%</span>
              </h2>

              <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
                Don’t let fees hold you back. At{" "}
                <b className="text-yellow-400">BM Academy</b>, we make sure{" "}
                <span className="text-yellow-400">every deserving student</span>{" "}
                gets access to **quality education** with massive scholarship support.
              </p>

              {/* Scholarship Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <div className="p-6 bg-yellow-400/10 border border-yellow-400 rounded-xl shadow-lg hover:scale-105 transition">
                  <h3 className="text-yellow-400 font-bold text-xl mb-2">85%</h3>
                  <p className="text-gray-200">Max Scholarship Coverage</p>
                </div>
                <div className="p-6 bg-yellow-400/10 border border-yellow-400 rounded-xl shadow-lg hover:scale-105 transition">
                  <h3 className="text-yellow-400 font-bold text-xl mb-2">5K+</h3>
                  <p className="text-gray-200">Students Supported</p>
                </div>
                <div className="p-6 bg-yellow-400/10 border border-yellow-400 rounded-xl shadow-lg hover:scale-105 transition">
                  <h3 className="text-yellow-400 font-bold text-xl mb-2">All Courses</h3>
                  <p className="text-gray-200">Govt + Tech Programs</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/scholarships"
                  className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl  hover:scale-105  transition"
                >
                  🏆 Apply for Scholarship
                </a>
                <a
                  href="/apply"
                  className="px-6 py-3 border-2 border-yellow-400 text-yellow-400 font-semibold rounded-xl hover:bg-yellow-400 hover:text-black transition"
                >
                  📘 Explore Courses
                </a>
              </div>
            </div>
          </section>
        </div>
      </Slider>
    </section>
  );
};

export default WelcomeBanner;
