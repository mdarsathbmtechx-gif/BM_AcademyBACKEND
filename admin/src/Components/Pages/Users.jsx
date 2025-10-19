import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        // ✅ Get token stored after signup/login
        const token = localStorage.getItem("token");

        // ✅ Correct endpoint (matches Django's api/users/list/)
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URI}/users/list/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err.response?.data || err);
        alert("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading)
    return <div className="p-10 text-center text-gray-700">Loading users...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Users</h2>

      {users.length === 0 ? (
        <p className="text-gray-600">No users found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-yellow-500 text-black">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Phone Number</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-700">{user.name || "N/A"}</td>
                  <td className="px-6 py-4 text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 text-gray-700">{user.phone || "N/A"}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => alert(`Viewing details for ${user.name || user.email}`)}
                      className="text-blue-600 hover:underline font-medium"
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
