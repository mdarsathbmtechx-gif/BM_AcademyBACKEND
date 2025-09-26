import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../api";

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in
  const token = localStorage.getItem("token"); // use Navbar token key
  if (!token) {
    return <Navigate to="/login" />; // Redirect if not logged in
  }

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await API.get("courses/");
        setCourses(res.data);

        // Optional: fetch enrolled courses
        const enrolledRes = await API.get("enrollments/");
        setEnrolledCourses(enrolledRes.data);
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
      setEnrolledCourses(enrolledRes.data);
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Enrollment failed!");
    }
  };

  if (loading)
    return <div className="p-10 text-center text-gray-700">Loading courses...</div>;

  return (
    <div className="mt-20 min-h-screen bg-gray-50">
      {/* Optional: Navbar placeholder */}
      <header className="bg-white shadow p-6 flex justify-between items-center sticky top-0 z-20">
        <h1 className="text-2xl font-bold text-gray-800">BM Academy Dashboard</h1>
      </header>

      <main className="p-6 max-w-6xl mx-auto space-y-10">
        {/* Enrolled Courses */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Your Enrolled Courses
          </h2>
          {enrolledCourses.length === 0 ? (
            <p className="text-gray-600">You haven't enrolled in any courses yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white p-5 rounded-lg shadow hover:shadow-xl transition cursor-default"
                >
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{course.title}</h3>
                  <p className="text-gray-600">{course.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Available Courses */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Available Courses
          </h2>
          {courses.length === 0 ? (
            <p className="text-gray-600">No courses available at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white p-5 rounded-lg shadow hover:shadow-xl flex flex-col justify-between transition"
                >
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{course.title}</h3>
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
      </main>
    </div>
  );
}
