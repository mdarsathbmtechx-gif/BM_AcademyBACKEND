// src/components/Testimonials.jsx
import React from "react";
import Slider from "react-slick";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "BM Academy helped me crack TNPSC Group 4 on my first try!",
      name: "Nithya R.",
      avatar: "https://i.pravatar.cc/100?img=47",
    },
    {
      quote: "Thanks to their Web Development course, I landed a job at a startup!",
      name: "Arun P.",
      avatar: "https://i.pravatar.cc/100?img=32",
    },
    {
      quote: "The SACT Test gave me clarity on choosing the right career path.",
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
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-yellow-600 mb-12">
          💬 Student Testimonials
        </h2>

        <Slider {...settings}>
          {testimonials.map((t, index) => (
            <div key={index} className="px-4">
              <div className="p-6 bg-yellow-50 border border-yellow-200 shadow-sm rounded-2xl hover:shadow-lg transition flex flex-col items-center">
                
                {/* Avatar */}
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-16 h-16 rounded-full border-2 border-yellow-400 mb-4"
                />

                {/* Quote */}
                <p className="text-gray-600 italic leading-relaxed">
                  "{t.quote}"
                </p>

                {/* Name */}
                <h4 className="mt-4 font-semibold text-yellow-700">
                  — {t.name}
                </h4>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
