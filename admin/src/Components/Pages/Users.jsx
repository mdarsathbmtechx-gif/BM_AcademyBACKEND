// client/src/Admin/Users.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("enrolled_at");
  const [sortOrder, setSortOrder] = useState("desc"); // desc or asc
  const itemsPerPage = 5; // courses per page

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URI.replace(/\/$/, "")}/users/list-with-courses/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err.response?.status, err.response?.data || err);
        alert("Failed to fetch users. Check console for details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading)
    return <div className="p-10 text-center text-gray-700">Loading users...</div>;

  const openModal = (user) => {
    setSelectedUser(user);
    setCurrentPage(1); // reset pagination when opening a new user
  };

  const closeModal = () => setSelectedUser(null);

  const sortedCourses = selectedUser?.enrolled_courses
    ? [...selectedUser.enrolled_courses].sort((a, b) => {
        if (sortOrder === "asc") return new Date(a[sortField]) - new Date(b[sortField]);
        else return new Date(b[sortField]) - new Date(a[sortField]);
      })
    : [];

  const paginatedCourses = sortedCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedCourses.length / itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Users</h2>

      {users.length === 0 ? (
        <p className="text-gray-600">No users found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
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
              {users.map((user, index) => (
                <tr
                  key={user.id || index}
                  className={`transition hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-6 py-4 text-gray-700">{user.name || "N/A"}</td>
                  <td className="px-6 py-4 text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 text-gray-700">{user.phone || "N/A"}</td>
                  <td className="px-6 py-4 text-gray-700">{user.enrolled_courses?.length || 0}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openModal(user)}
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

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-11/12 max-w-2xl p-6 relative">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              {selectedUser.name}'s Enrolled Courses
            </h3>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-lg"
            >
              &times;
            </button>

            {sortedCourses.length > 0 ? (
              <>
                <table className="w-full text-left border-collapse mb-4">
                  <thead>
                    <tr>
                      <th
                        className="cursor-pointer px-4 py-2"
                        onClick={() => handleSort("title")}
                      >
                        Title
                      </th>
                      <th
                        className="cursor-pointer px-4 py-2"
                        onClick={() => handleSort("enrolled_at")}
                      >
                        Enrolled At {sortField === "enrolled_at" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                      </th>
                      <th className="px-4 py-2">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCourses.map((course) => (
                      <tr key={course.id} className="border-t">
                        <td className="px-4 py-2">{course.title}</td>
                        <td className="px-4 py-2">{new Date(course.enrolled_at).toLocaleDateString()}</td>
                        <td className="px-4 py-2">₹{course.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-center gap-2">
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
        </div>
      )}
    </div>
  );
};

export default Users;
