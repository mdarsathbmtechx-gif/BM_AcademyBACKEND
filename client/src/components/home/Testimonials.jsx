// src/components/Testimonials.jsx
import React from "react";
import Slider from "react-slick";

// Required for react-slick to size & respond correctly
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "BM Academy helped me crack TNPSC Group 4 on my first try!",
      name: "Nithya R.",
      avatar: "https://i.pravatar.cc/100?img=47",
    },
    {
      quote:
        "Thanks to their Web Development course, I landed a job at a startup!",
      name: "Arun P.",
      avatar: "https://i.pravatar.cc/100?img=32",
    },
    {
      quote:
        "The SACT Test gave me clarity on choosing the right career path.",
      name: "Kavitha M.",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    {
      quote: "The faculty support was amazing and very motivating.",
      name: "Praveen S.",
      avatar: "https://i.pravatar.cc/100?img=68",
    },
  ];

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,          // desktop default
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,      // desktop/tablet cadence
    swipeToSlide: true,
    pauseOnHover: false,
    pauseOnDotsHover: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } }, // tablet
      {
        breakpoint: 768,                                     // mobile
        settings: {
          slidesToShow: 1,            // ← exactly one at a time
          slidesToScroll: 1,
          centerMode: true,           // centers the single card like your screenshot
          centerPadding: "0px",
          adaptiveHeight: true,       // card height fits content
          autoplay: true,
          autoplaySpeed: 2500,        // a few seconds on mobile
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 480,                                   // small phones
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "0px",
          adaptiveHeight: true,
          autoplay: true,
          autoplaySpeed: 2500,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-700 mb-12 flex items-center justify-center gap-2">
          <span role="img" aria-label="chat">💬</span>
          Student Testimonials
        </h2>

        <Slider {...settings} className="!overflow-visible">
          {testimonials.map((t, index) => (
            <div key={index} className="px-2 sm:px-4">
              <article className="p-6 bg-yellow-50 border border-yellow-200 rounded-2xl shadow-sm hover:shadow-lg transition flex flex-col items-center h-full">
                {/* Avatar */}
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-16 h-16 rounded-full border-2 border-yellow-400 mb-4 object-cover"
                />

                {/* Quote */}
                <p className="text-gray-700 italic leading-relaxed">
                  "{t.quote}"
                </p>

                {/* Name */}
                <h4 className="mt-4 font-semibold text-yellow-700">— {t.name}</h4>
              </article>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
