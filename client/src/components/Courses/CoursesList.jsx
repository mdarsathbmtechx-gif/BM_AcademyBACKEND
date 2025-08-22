import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { HiArrowRight } from "react-icons/hi";
import { FaChartBar, FaPython, FaCloud, FaLaptopCode, FaBullhorn, FaPalette, FaRobot, FaDatabase } from "react-icons/fa";


export default function CoursesList() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const courses = [
    {
      title: "Digital Marketing Mastery",
      desc: "Learn SEO, Social Media Ads, Google Ads, YouTube & WhatsApp Campaigns",
      duration: "6 Weeks",
      extra: "Tools: Canva, Google Analytics, Meta Ads",
      outcome: "Run campaigns, freelance or work with agencies",
      icon: <FaBullhorn className="text-3xl sm:text-4xl text-yellow-500" />,
    },
    {
      title: "Web Development",
      desc: "Master HTML, CSS, JS & Responsive Design",
      duration: "6 Weeks",
      extra: "Project: Build your own website",
      outcome: "Job-ready web skills + portfolio",
      icon: <FaLaptopCode  className="text-3xl sm:text-4xl text-blue-500" />,
    },
    {
      title: "Full Stack Development",
      desc: "React.js + Node.js + MongoDB – Build real apps from scratch",
      duration: "4 Months",
      extra: "Includes: Git, Firebase, APIs, Hosting",
      outcome: "Become a full stack developer",
      icon: <FaDatabase className="text-3xl sm:text-4xl text-green-600" />,
    },
    {
      title: "Graphic Design & Reels",
      desc: "Design Posters, Ads & Reels using Canva & Photoshop",
      duration: "2 Months",
      extra: "Perfect for creators & digital marketers",
      outcome: "Freelance or work as a creative designer",
      icon: <FaPalette className="text-3xl sm:text-4xl text-pink-500" />,
    },
    {
      title: "Python Programming",
      desc: "Beginner-friendly coding course covering logic & scripting",
      duration: "6 Weeks",
      outcome: "Solid foundation for software, AI & analytics",
      icon: <FaPython className="text-3xl sm:text-4xl text-blue-400" />,
    },
    {
      title: "Data Analysis (Excel + Python)",
      desc: "Excel dashboards, data cleaning, Python pandas & charts",
      duration: "6 Weeks",
      outcome: "Data analyst job roles in any domain",
      icon: <FaChartBar className="text-3xl sm:text-4xl text-indigo-500" />,
    },
    {
      title: "Power BI Dashboard Design",
      desc: "Import, clean & visualize data using Power BI",
      duration: "4 Weeks",
      outcome: "BI Developer / Dashboard Expert",
      icon: <FaChartBar className="text-3xl sm:text-4xl text-blue-700" />,
    },
    {
      title: "AI/ML Fundamentals",
      desc: "Understand AI with Google Colab, train basic ML models",
      duration: "6 Weeks",
      outcome: "Step into the world of AI careers",
      icon: <FaRobot className="text-3xl sm:text-4xl text-purple-500" />,
    },
    {
      title: "Cloud Basics",
      desc: "Intro to AWS, Hosting, Google Cloud & Servers",
      duration: "4 Weeks",
      outcome: "Cloud-ready skills for tech jobs",
      icon: <FaCloud className="text-3xl sm:text-4xl text-blue-400" />,
    },
  ];

  return (
    <section className="relative bg-gray-50 py-16 sm:py-24 px-4 sm:px-6 md:px-12 overflow-hidden">
      {/* Background Gradient Shapes */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[400px] sm:w-[800px] h-[300px] sm:h-[600px] bg-yellow-100/40 rounded-full filter blur-2xl sm:blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 w-[300px] sm:w-[600px] h-[200px] sm:h-[400px] bg-yellow-300/30 rounded-full filter blur-2xl sm:blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            📚 Career-Building Courses
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Hands-on projects, expert trainers, certifications, and scholarships to jumpstart your career.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {courses.map((course, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="p-5 sm:p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between border border-gray-200"
            >
              <div>
                {/* Icon */}
                <div className="mb-3">{course.icon}</div>

                {/* Course Title */}
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 flex items-center gap-2">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-3 text-sm sm:text-base">{course.desc}</p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-yellow-100 text-yellow-800 text-xs sm:text-sm px-3 py-1 rounded-full font-medium animate-pulse">
                    🕒 {course.duration}
                  </span>
                  {course.extra && (
                    <span className="bg-gray-100 text-gray-800 text-xs sm:text-sm px-3 py-1 rounded-full font-medium animate-pulse">
                      📌 {course.extra}
                    </span>
                  )}
                </div>

                {/* Outcome */}
                <p className="text-gray-700 font-medium mb-4 text-sm sm:text-base">🎯 Outcome: {course.outcome}</p>
              </div>

              {/* CTA Button */}
              <a
                href="#"
                className="mt-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2 sm:py-3 bg-yellow-400 text-black font-semibold rounded-xl shadow hover:bg-yellow-500 hover:shadow-lg transition text-center text-sm sm:text-base"
              >
                View Details <HiArrowRight size={18} className="sm:hidden md:inline-block" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
