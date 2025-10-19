import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TrendingCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Public fetch function
  const publicFetch = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    return res.json();
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await publicFetch(`${import.meta.env.VITE_BASE_URI}courses/`);
        if (!Array.isArray(data)) throw new Error("Courses response is not an array");
        setCourses(data);
      } catch (err) {
        console.error("Courses fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Safely get course ID
  const getCourseId = (course) => {
    if (course._id?.$oid) return course._id.$oid;
    if (course.id) return course.id;
    if (course._id) return course._id;
    return null;
  };

  if (loading) return <p className="text-center py-20 text-gray-500">Loading courses...</p>;
  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        <p>Error: {error}</p>
        <p>Could not load courses. Please try again later.</p>
      </div>
    );

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
        {courses.map((course) => {
          const courseId = getCourseId(course);
          if (!courseId) return null;

          return (
            <div
              key={courseId}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              {course.image_url && (
                <img
                  src={course.image_url}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-500 mb-4 line-clamp-3">{course.description}</p>
                  <div className="flex justify-between text-gray-700 text-sm font-medium">
                    <p>
                      Duration: <span className="font-normal">{course.duration}</span>
                    </p>
                    <p>{course.type || "Certificate Provided"}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/courses/${courseId}`)}
                  className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Why Choose Section */}
      <section className="mt-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">
            ✨ Why Choose These Courses?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-black backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
              <div className="text-yellow-400 text-4xl mb-4">🤖</div>
              <h4 className="font-semibold text-lg text-white mb-2">Cutting-edge AI & Tech</h4>
              <p className="text-gray-300 text-sm">Learn skills that are shaping the future.</p>
            </div>
            <div className="bg-black backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
              <div className="text-yellow-400 text-4xl mb-4">🛠️</div>
              <h4 className="font-semibold text-lg text-white mb-2">Hands-on Projects</h4>
              <p className="text-gray-300 text-sm">Real-world experience with live training.</p>
            </div>
            <div className="bg-black backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
              <div className="text-yellow-400 text-4xl mb-4">💼</div>
              <h4 className="font-semibold text-lg text-white mb-2">Job-ready Skills</h4>
              <p className="text-gray-300 text-sm">High-demand skills for top career opportunities.</p>
            </div>
            <div className="bg-black backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
              <div className="text-yellow-400 text-4xl mb-4">🏆</div>
              <h4 className="font-semibold text-lg text-white mb-2">Scholarships</h4>
              <p className="text-gray-300 text-sm">Get up to 85% support for deserving students.</p>
            </div>
          </div>

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
