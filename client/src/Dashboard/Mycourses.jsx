// client/src/Dashboard/MyCourses.jsx
import React, { useEffect, useState } from "react";
import API from "../api";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("my-courses/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        alert("Failed to load your courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading your courses...</p>;

  if (!courses.length)
    return <p className="text-center mt-10">You have not enrolled in any courses yet.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={course.image_url || "/logo.png"}
              alt={course.title}
              className="h-40 w-full object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-600 mb-2">{course.description}</p>
            <p className="text-green-600 font-semibold mb-2">₹{course.price}</p>
            <p className="text-sm text-gray-500 mb-2">Duration: {course.duration}</p>
            <p className="text-sm text-gray-500 mb-2">Enrolled At: {new Date(course.enrolled_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
