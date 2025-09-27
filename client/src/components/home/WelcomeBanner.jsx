// src/components/WelcomeBanner.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [banners, setBanners] = useState([]); // 👈 state for banners

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });

    axios
      .get("${import.meta.env.VITE_BASE_URI}banners/")
      .then((res) => setBanners(res.data))
      .catch((err) => console.error("Error fetching banners:", err));
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
        {/* If API has banners, render them dynamically */}
        {banners.length > 0 ? (
          banners.map((banner, index) => (
            <div key={index}>
              <section className="relative w-full min-h-[700px] flex items-center justify-center text-white overflow-hidden">
                <img
                  src={banner.image} // 👈 Django API should return `image` field
                  alt={banner.title || "Banner"}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/30"></div>

                <div
                  className="relative z-10 max-w-4xl text-center px-4 sm:px-6 md:px-8"
                  data-aos="zoom-in"
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-snug">
                    {banner.title}
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-gray-200/90 mb-8 leading-relaxed px-3 py-2 rounded-xl">
                    {banner.description}
                  </p>
                </div>
              </section>
            </div>
          ))
        ) : (
          // If API is empty, fallback to your original static banners
          <>
            {/* 🔷 Banner 1 (your existing design) */}
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

            {/* 🔷 Banner 2 (your existing design) */}
            <div>
              <section className="relative w-full min-h-[600px] sm:min-h-[650px] md:min-h-[700px] flex items-center justify-center bg-black px-4 sm:px-6 md:px-10">
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
                  {/* Your boxes & buttons remain untouched */}
                </div>
              </section>
            </div>
          </>
        )}
      </Slider>
    </section>
  );
};

export default WelcomeBanner;
