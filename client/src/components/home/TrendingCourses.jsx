import React from "react";

const courses = [
  {
    title: "Full Stack Web Development",
    description:
      "Learn to build websites and apps from scratch — HTML, CSS, JavaScript & more!",
    duration: "4 Months",
    type: "Certificate Provided",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Artificial Intelligence & Machine Learning",
    description:
      "Dive into AI fundamentals, machine learning algorithms, and real-world projects.",
    duration: "4 Months",
    type: "Certificate Provided",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Data Science & Analytics",
    description:
      "Work with big data using Python, R, SQL, and visualization tools like Tableau.",
    duration: "4 Months",
    type: "Certificate Provided",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Digital Marketing",
    description:
      "Master SEO, social media ads, Google & Meta campaigns to grow any business.",
    duration: "2 Months",
    type: "Certificate Provided",
    image:
      "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Government Exam Coaching",
    description:
      "Prepare for TNPSC, Bank, SSC with expert guidance & mock tests.",
    duration: "6 Months",
    type: "Government Certification",
    image:
      "https://media.istockphoto.com/id/2045620685/photo/justice-gavel-and-law-books-on-table-in-office-for-court-trial-legislation-or-fair.jpg?s=2048x2048&w=is&k=20&c=NjHQ23LK6JXbt96OUVTaGeyUVLF8yCSz7iyBH8lycGE=",
  },
  {
    title: "Cybersecurity Basics",
    description:
      "Learn ethical hacking & security essentials to protect digital assets.",
    duration: "2 Months",
    type: "Certificate Provided",
    image:
      "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Cloud Computing Fundamentals",
    description:
      "Get started with AWS & Azure cloud services powering modern tech.",
    duration: "3 Months",
    type: "Certificate Provided",
    image:
      "https://media.istockphoto.com/id/1695598546/photo/businessman-using-tablet-to-transfer-data-on-cloud-computing-seamless-data-transfer-and.jpg?s=2048x2048&w=is&k=20&c=Dlse7dYErHmqv_TTR1IIxVbyL5htJhYk25hwMFKBTaI=",
  },
  {
    title: "Soft Skills & Interview Prep",
    description:
      "Boost your communication & confidence to ace job interviews.",
    duration: "1 Month",
    type: "Certificate Provided",
    image:
      "https://media.istockphoto.com/id/1288814183/photo/business-semiar-during-coronavirus-pandemic.jpg?s=2048x2048&w=is&k=20&c=sbdDAsjLueYOpyqYJ2tjYO43Rk3kqgkFmP8wnBCdmW0=",
  },
  {
    title: "Graphic & UI/UX Design",
    description:
      "Create stunning visuals & user-friendly interfaces with popular tools.",
    duration: "2 Months",
    type: "Certificate Provided",
    image:
      "https://media.istockphoto.com/id/1279584626/photo/businessman-working-on-high-internet-speed-on-a-futuristic-background.jpg?s=2048x2048&w=is&k=20&c=DLkdf3Newyp8BNCst2fvtejWpelx-fRtJTZ2HWvDN3Y=",
  },
];

const TrendingCourses = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 md:px-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">
          🔥 Trending Courses for Students & Job Seekers
        </h2>
        <p className="text-gray-600 text-lg">
          Boost your skills. Grab your dream job. Start today!
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-500 mb-4">{course.description}</p>
                <div className="flex justify-between text-gray-700 text-sm font-medium">
                  <p>
                    Duration: <span className="font-normal">{course.duration}</span>
                  </p>
                  <p>{course.type}</p>
                </div>
              </div>
              <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg transition-colors">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Why Choose Section */}
      <section className="mt-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">
            ✨ Why Choose These Courses?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-black backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
              <div className="text-yellow-400 text-4xl mb-4">🤖</div>
              <h4 className="font-semibold text-lg text-white mb-2">Cutting-edge AI & Tech</h4>
              <p className="text-gray-300 text-sm">Learn skills that are shaping the future.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-black backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
              <div className="text-yellow-400 text-4xl mb-4">🛠️</div>
              <h4 className="font-semibold text-lg text-white mb-2">Hands-on Projects</h4>
              <p className="text-gray-300 text-sm">Real-world experience with live training.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-black backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
              <div className="text-yellow-400 text-4xl mb-4">💼</div>
              <h4 className="font-semibold text-lg text-white mb-2">Job-ready Skills</h4>
              <p className="text-gray-300 text-sm">High-demand skills for top career opportunities.</p>
            </div>

            {/* Card 4 */}
            <div className="bg-black backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
              <div className="text-yellow-400 text-4xl mb-4">🏆</div>
              <h4 className="font-semibold text-lg text-white mb-2">Scholarships</h4>
              <p className="text-gray-300 text-sm">Get up to 85% support for deserving students.</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-10">
            <button className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-2xl shadow-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(255,221,0,0.8)] transition-all duration-300">
              Enroll Now
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default TrendingCourses;
