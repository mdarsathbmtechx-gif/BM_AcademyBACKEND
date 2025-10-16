// src/components/Courses/CoursesList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Public fetch function (no auth)
  const publicFetch = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    return res.json();
  };

  // Fetch courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await publicFetch(`${import.meta.env.VITE_BASE_URI}courses/`);
        if (!Array.isArray(data)) {
          throw new Error("Courses response is not an array");
        }
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

  // ------------------- Render -------------------
  if (loading) {
    return <p className="text-center py-20 text-gray-500">Loading courses...</p>;
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>Error: {error}</p>
        <p>Could not load courses. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-5 justify-center">
      {courses.map((course) => {
        const courseId = getCourseId(course);
        if (!courseId) return null;

        return (
          <div
            key={courseId}
            className="border p-4 rounded-lg w-64 cursor-pointer shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
            onClick={() => navigate(`/courses/${courseId}`)}
          >
            {course.image_url && (
              <img
                src={course.image_url}
                alt={course.title}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
            )}
            <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
            <p className="text-gray-600 text-sm mb-1">{course.description}</p>
            <p className="text-gray-700 text-sm">
              <strong>Mode:</strong> {course.mode}
            </p>
            <p className="text-gray-700 text-sm">
              <strong>Price:</strong> ₹{course.price}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CoursesList;
