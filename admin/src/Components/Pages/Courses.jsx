// client/src/Admin/Users.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const detailRef = useRef(null); // scroll to user details

  const token = localStorage.getItem("token"); // admin token

  // ------------------ Fetch Users ------------------
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URI.replace(/\/$/, "")}/users/list-with-courses/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      alert("Failed to fetch users. Check console.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ------------------ Open User Details ------------------
  const openUserDetails = (user) => {
    setSelectedUser(user);
    setCurrentPage(1);
    setTimeout(() => detailRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  // ------------------ Update Course Status ------------------
  const updateCourseStatus = async (courseId, newStatus) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URI.replace(/\/$/, "")}/courses/${courseId}/update-status/`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the UI without refetching everything
      setSelectedUser((prev) => ({
        ...prev,
        enrolled_courses: prev.enrolled_courses.map((c) =>
          c.id === courseId
            ? { ...c, status: res.data.status, progress: res.data.progress }
            : c
        ),
      }));
    } catch (err) {
      console.error("Error updating course status:", err);
      if (err.response && err.response.status === 403) {
        alert("You are not authorized to update this course. Make sure you are an admin.");
      } else if (err.response && err.response.data?.error) {
        alert(err.response.data.error);
      } else {
        alert("Failed to update course status. Check console for details.");
      }
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-700">Loading users...</div>;

  // Pagination for enrolled courses
  const totalPages = selectedUser
    ? Math.ceil(selectedUser.enrolled_courses?.length / itemsPerPage)
    : 0;

  const paginatedCourses = selectedUser?.enrolled_courses
    ? selectedUser.enrolled_courses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  // ------------------ Render ------------------
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Users</h2>

      {/* Users Table */}
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
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Enrolled Courses</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user, idx) => (
                <tr
                  key={user.id || idx}
                  className={`transition hover:bg-gray-50 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-6 py-4 text-gray-700">{user.name || "N/A"}</td>
                  <td className="px-6 py-4 text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 text-gray-700">{user.phone || "N/A"}</td>
                  <td className="px-6 py-4 text-gray-700">{user.enrolled_courses?.length || 0}</td>
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

      {/* User Details */}
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
                      <p className="text-sm text-gray-600">Enrolled: {new Date(course.enrolled_at).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600">Price: ₹{course.price}</p>
                      <p className="text-sm text-gray-600">Status: {course.status || "Not Started"}</p>

                      {/* Progress Bar */}
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
                      <p className="text-xs text-gray-600 mt-1">{course.progress || 0}% completed</p>
                    </div>

                    {/* Status Buttons */}
                    <div className="mt-2 flex gap-2 md:mt-0">
                      <button
                        onClick={() => updateCourseStatus(course.id, "In Progress")}
                        className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition"
                      >
                        In Progress
                      </button>
                      <button
                        onClick={() => updateCourseStatus(course.id, "Completed")}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                      >
                        Completed
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="px-3 py-1">{currentPage} / {totalPages}</span>
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
    </div>
  );
};

export default Users;
