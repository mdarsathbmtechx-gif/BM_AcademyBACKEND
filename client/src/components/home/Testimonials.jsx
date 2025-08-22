// src/components/Testimonials.jsx
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Testimonials() {
  const sliderRef = useRef(null);

  const getSlides = () => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1280;
    if (w < 640) return 1;        // sm
    if (w < 1024) return 2;       // md (and up to lg)
    return 3;                     // lg+
  };

  // Set the correct value immediately to avoid a flash of 3 on md
  const [slidesToShow, setSlidesToShow] = useState(getSlides());

  useEffect(() => {
    const onResize = () => setSlidesToShow(getSlides());
    onResize(); // ensure correct on first mount
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const testimonials = [
    { quote: "BM Academy helped me crack TNPSC Group 4 on my first try!", name: "Nithya R.", avatar: "https://i.pravatar.cc/100?img=47" },
    { quote: "Thanks to their Web Development course, I landed a job at a startup!", name: "Arun P.", avatar: "https://i.pravatar.cc/100?img=32" },
    { quote: "The SACT Test gave me clarity on choosing the right career path.", name: "Kavitha M.", avatar: "https://i.pravatar.cc/100?img=12" },
    { quote: "The faculty support was amazing and very motivating.", name: "Praveen S.", avatar: "https://i.pravatar.cc/100?img=68" },
  ];

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    cssEase: "ease-in-out",
    slidesToShow,              // 👈 controlled by us
    slidesToScroll: 1,
    adaptiveHeight: true,
    swipeToSlide: true,
    touchMove: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    pauseOnDotsHover: false,
    // IMPORTANT: no "responsive" array — we’re bypassing that bug
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6 text-center min-w-0">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-700 mb-12 flex items-center justify-center gap-2">
          <span role="img" aria-label="chat">💬</span>
          Student Testimonials
        </h2>

        {/* key={slidesToShow} forces a clean remount when the count changes */}
        <Slider ref={sliderRef} {...settings} key={slidesToShow} className="!overflow-visible">
          {testimonials.map((t, index) => (
            <div key={index} className="px-2 sm:px-4 !flex !justify-center">
              <article className="w-full max-w-md p-6 bg-yellow-50 border border-yellow-200 rounded-2xl shadow-sm hover:shadow-lg transition flex flex-col items-center">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-16 h-16 rounded-full border-2 border-yellow-400 mb-4 object-cover"
                />
                <p className="text-gray-700 italic leading-relaxed">
                  "{t.quote}"
                </p>
                <h4 className="mt-4 font-semibold text-yellow-700">— {t.name}</h4>
              </article>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
