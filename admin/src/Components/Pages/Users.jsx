// client/src/Admin/Users.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const detailRef = useRef(null);

  const BASE_URL = import.meta.env.VITE_BASE_URI.replace(/\/$/, "");
  const token = localStorage.getItem("access_token");

  // ✅ Create an axios instance with token
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
  });

  // ✅ Fetch all users with enrolled courses
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/users/list-with-courses/");
        // Safely handle missing enrolled_courses
        const sanitizedData = res.data.map((u) => ({
          ...u,
          enrolled_courses: u.enrolled_courses || [],
        }));
        setUsers(sanitizedData);
      } catch (err) {
        console.error("Error fetching users:", err);
        toast.error("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // ✅ Open user details and scroll smoothly
  const openUserDetails = (user) => {
    setSelectedUser(user);
    setCurrentPage(1);
    setTimeout(() => detailRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  // ✅ Update course status both in backend and UI
  const updateCourseStatus = async (enrolledCourseId, newStatus) => {
    try {
      await axiosInstance.patch(`/courses/${enrolledCourseId}/update-status/`, {
        status: newStatus,
      });

      // Update the state instantly for a smoother UX
      setSelectedUser((prevUser) => {
        const updatedCourses = prevUser.enrolled_courses.map((course) => {
          if (course.id === enrolledCourseId) {
            let progress = course.progress || 0;

            if (newStatus === "Completed") progress = 100;
            else if (newStatus === "In Progress" && progress === 0) progress = 10;
            else if (newStatus === "Not Started") progress = 0;

            return { ...course, status: newStatus, progress };
          }
          return course;
        });
        return { ...prevUser, enrolled_courses: updatedCourses };
      });

      toast.success(`✅ Course marked as "${newStatus}"`);
    } catch (error) {
      console.error("Error updating course status:", error);
      toast.error("Failed to update course status. Please try again.");
    }
  };

  // ✅ Loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-yellow-500"></div>
      </div>
    );
  }

  const totalPages = selectedUser
    ? Math.ceil(selectedUser.enrolled_courses?.length / itemsPerPage)
    : 0;

  const paginatedCourses = selectedUser?.enrolled_courses
    ? selectedUser.enrolled_courses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Users</h2>

      {/* 🟨 Users Table */}
      {users.length === 0 ? (
        <p className="text-gray-600">No users found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-yellow-500 text-black">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Courses</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user, idx) => (
                <tr
                  key={user.id || idx}
                  className={`transition hover:bg-gray-50 ${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-4 text-gray-700 font-medium">{user.name || "N/A"}</td>
                  <td className="px-6 py-4 text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 text-gray-700">{user.phone || "N/A"}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {user.enrolled_courses?.length || 0}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openUserDetails(user)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-1 px-3 rounded-lg transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🟨 User Details */}
      {selectedUser && (
        <div ref={detailRef} className="bg-white shadow-lg rounded-xl p-6 mb-6">
          <h3 className="text-2xl font-bold mb-4">{selectedUser.name}'s Details</h3>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Phone:</strong> {selectedUser.phone || "N/A"}</p>
          <p><strong>Total Courses:</strong> {selectedUser.enrolled_courses?.length || 0}</p>

          <h4 className="text-xl font-semibold mt-4 mb-2">Enrolled Courses</h4>
          {paginatedCourses.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-4">
                {paginatedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-gray-50 p-4 rounded-lg shadow flex flex-col md:flex-row md:justify-between md:items-center"
                  >
                    <div className="flex-1">
                      <h5 className="text-lg font-semibold">{course.title}</h5>
                      <p className="text-sm text-gray-600">
                        Enrolled: {new Date(course.enrolled_at).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">Price: ₹{course.price}</p>
                      <p className="text-sm text-gray-600">
                        Status: {course.status || "Not Started"}
                      </p>

                      <div className="mt-2 w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${
                            course.status === "Completed"
                              ? "bg-green-500"
                              : course.status === "In Progress"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                          } transition-all`}
                          style={{ width: `${course.progress || 0}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {course.progress || 0}% completed
                      </p>
                    </div>

                    {/* 🟨 Action Buttons */}
                    <div className="mt-2 flex gap-2 md:mt-0">
                      <button
                        onClick={() => updateCourseStatus(course.id, "In Progress")}
                        className="px-3 py-1 bg-blue-500 text-white rounded cursor-pointer"
                      >
                        In Progress
                      </button>

                      <button
                        onClick={() => updateCourseStatus(course.id, "Completed")}
                        className="px-3 py-1 bg-green-500 text-white rounded cursor-pointer"
                      >
                        Completed
                      </button>

                      <button
                        onClick={() => updateCourseStatus(course.id, "Not Started")}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* 🟨 Pagination */}
              <div className="flex justify-center gap-2 mt-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="px-3 py-1">
                  {currentPage} / {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500">No courses enrolled.</p>
          )}
        </div>
      )}

      {/* ✅ Toast Notifications */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Users;
