// client/src/Admin/Users.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.error(
          "Error fetching users:",
          err.response?.status,
          err.response?.data || err
        );
        alert("Failed to fetch users. Check console for details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-center text-gray-700">Loading users...</div>
    );

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
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Enrolled Courses
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr
                  key={user.id || index}
                  className={`transition hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-4 text-gray-700">{user.name || "N/A"}</td>
                  <td className="px-6 py-4 text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 text-gray-700">{user.phone || "N/A"}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {user.enrolled_courses && user.enrolled_courses.length > 0 ? (
                      <ul className="list-disc pl-5 max-h-32 overflow-y-auto">
                        {user.enrolled_courses.map((course) => (
                          <li key={course.id}>
                            {course.title} -{" "}
                            {new Date(course.enrolled_at).toLocaleDateString()}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No enrolled courses</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        alert(`Viewing details for ${user.name || user.email}`)
                      }
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
    </div>
  );
};

export default Users;
