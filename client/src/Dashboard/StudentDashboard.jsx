// src/Dashboard/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import API from "../api";
import Sidebar from "./Sidebar";
import Breadcrumbs from "./Breadcrumbs";

export default function StudentDashboard() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;

  // Add new course from Payments.jsx navigation state
  useEffect(() => {
    if (location.state?.newCourse) {
      setEnrolledCourses(prev => {
        const exists = prev.some(c => c.id === location.state.newCourse.id);
        return exists ? prev : [...prev, location.state.newCourse];
      });
    }
  }, [location.state]);

  // Fetch enrolled courses from backend
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        setLoading(true);
        const res = await API.get("my-courses/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEnrolledCourses(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch enrolled courses:", err);
        alert("Failed to load your courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchEnrolledCourses();
  }, [token]);

  const breadcrumb = ["Dashboard"];
  if (currentPage !== "Dashboard") breadcrumb.push(currentPage);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onNavigate={setCurrentPage} current={currentPage} />
      <main className="flex-1 p-8">
        <Breadcrumbs items={breadcrumb} />
        <h2 className="pt-18 text-2xl font-bold text-gray-800 mb-6">{currentPage}</h2>

        {loading ? (
          <div className="text-center text-gray-700">Loading...</div>
        ) : currentPage === "My Courses" ? (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">My Enrolled Courses</h3>
            {enrolledCourses.length === 0 ? (
              <p className="text-gray-600">You have not enrolled in any courses yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map(course => (
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
                    <p className="text-sm text-gray-500 mb-2">
                      Enrolled At: {new Date(course.enrolled_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : currentPage === "Dashboard" ? (
          <div>
            <p className="text-gray-600">Welcome to your dashboard! Use the sidebar to explore your courses and profile.</p>
          </div>
        ) : currentPage === "Profile" ? (
          <div>
            <p className="text-gray-600">Profile section coming soon...</p>
          </div>
        ) : (
          <div>
            <p className="text-gray-600">Page not found.</p>
          </div>
        )}
      </main>
    </div>
  );
}
