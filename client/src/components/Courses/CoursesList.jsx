// src/components/Courses/CoursesList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../../utils/authFetch"; // ✅ shared helper for auth requests

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_BASE_URI}courses/`, {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
        });

        const contentType = res.headers.get("content-type");

        if (!res.ok) {
          let errMsg = `Failed to fetch courses (${res.status})`;
          if (contentType && contentType.includes("application/json")) {
            const errData = await res.json();
            errMsg = errData.error || JSON.stringify(errData);
          }
          throw new Error(errMsg);
        }

        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error("Non-JSON response: " + text);
        }

        const data = await res.json();

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

  if (loading) return <p className="text-center py-20 text-gray-500">Loading courses...</p>;
  if (error) return <p className="text-red-500 text-center py-20">Error: {error}</p>;

  return (
    <div className="flex flex-wrap gap-5 justify-center">
      {courses.map((course) => (
        <div
          key={course._id?.$oid || course.id || course._id} // fallback if structure varies
          className="border p-4 rounded-lg w-64 cursor-pointer shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
          onClick={() => navigate(`${course._id?.$oid || course.id || course._id}`)}
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
      ))}
    </div>
  );
};

export default CoursesList;
