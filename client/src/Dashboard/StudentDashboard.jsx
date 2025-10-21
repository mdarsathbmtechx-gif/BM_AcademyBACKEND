// src/Dashboard/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../api";
import Sidebar from "./Sidebar";
import Breadcrumbs from "./Breadcrumbs";

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("Dashboard");

  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const [coursesRes, enrollRes] = await Promise.all([
          API.get("courses/"),
          API.get("enrollments/"),
        ]);

        setCourses(Array.isArray(coursesRes.data) ? coursesRes.data : []);
        setEnrolledCourses(Array.isArray(enrollRes.data) ? enrollRes.data : []);
      } catch (err) {
        console.error(err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await API.post("enrollments/", { course: courseId });
      alert("Enrolled successfully!");
      const enrolledRes = await API.get("enrollments/");
      setEnrolledCourses(Array.isArray(enrolledRes.data) ? enrolledRes.data : []);
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Enrollment failed!");
    }
  };

  const breadcrumb = ["Dashboard"];
  if (currentPage !== "Dashboard") breadcrumb.push(currentPage);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar onNavigate={setCurrentPage} current={currentPage} />

      {/* Main content */}
      <main className="flex-1 p-8">
        <Breadcrumbs items={breadcrumb} />

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {currentPage}
        </h2>

        {loading ? (
          <div className="text-center text-gray-700">Loading...</div>
        ) : currentPage === "Courses" ? (
          <>
            {/* Enrolled Courses */}
            <section className="mb-12">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Your Enrolled Courses
              </h3>
              {enrolledCourses.length === 0 ? (
                <p className="text-gray-600">
                  You haven't enrolled in any courses yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white p-5 rounded-lg shadow hover:shadow-xl transition cursor-default"
                    >
                      <h4 className="font-bold text-lg text-gray-800 mb-2">
                        {course.title}
                      </h4>
                      <p className="text-gray-600">{course.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Available Courses */}
            <section>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Available Courses
              </h3>
              {courses.length === 0 ? (
                <p className="text-gray-600">No courses available.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white p-5 rounded-lg shadow hover:shadow-xl flex flex-col justify-between transition"
                    >
                      <div>
                        <h4 className="font-bold text-lg text-gray-800 mb-2">
                          {course.title}
                        </h4>
                        <p className="text-gray-600">{course.description}</p>
                      </div>
                      <button
                        onClick={() => handleEnroll(course.id)}
                        className="mt-4 bg-yellow-500 text-black font-semibold py-2 rounded hover:bg-yellow-400 transition"
                      >
                        Enroll
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        ) : currentPage === "Profile" ? (
          <div>
            <p className="text-gray-600">Profile section coming soon...</p>
          </div>
        ) : (
          <p className="text-gray-600">
            Welcome to your dashboard! Use the sidebar to explore.
          </p>
        )}
      </main>
    </div>
  );
}
