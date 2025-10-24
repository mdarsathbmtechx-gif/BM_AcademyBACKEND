import React, { useEffect, useState } from "react";
import API from "../../api"; // Make sure src/api.js exists
import { toast } from "react-toastify";

export default function Certificate() {
  const [certificates, setCertificates] = useState([]);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    user: "",
    course: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch initial data
  useEffect(() => {
    fetchCertificates();
    fetchUsers();
    fetchCourses();
  }, []);

  // -------------------- Fetch Functions --------------------
  const fetchCertificates = async () => {
    try {
      const res = await API.get("/certificates/");
      setCertificates(res.data);
    } catch (err) {
      toast.error("Failed to load certificates");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users/"); // Adjust this path if your user endpoint differs
      setUsers(res.data);
    } catch {
      toast.error("Failed to load users");
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses/"); // Adjust to match your API route
      setCourses(res.data);
    } catch {
      toast.error("Failed to load courses");
    }
  };

  // -------------------- Issue Certificate --------------------
  const handleIssue = async () => {
    if (!formData.user || !formData.course) {
      toast.warn("Please select both user and course");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        certificate_id: "CERT" + Date.now(),
      };

      await API.post("/certificates/", payload);
      toast.success("Certificate issued successfully!");
      setFormData({ user: "", course: "" });
      fetchCertificates();
    } catch (err) {
      console.error(err);
      toast.error("Failed to issue certificate");
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Render --------------------
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        🎓 Issue Certificates
      </h2>

      {/* Issue Form */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-8 border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* User Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-2">Select User</label>
            <select
              value={formData.user}
              onChange={(e) => setFormData({ ...formData, user: e.target.value })}
              className="w-full border rounded-lg p-2 focus:ring focus:ring-yellow-300"
            >
              <option value="">-- Select User --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username || user.email}
                </option>
              ))}
            </select>
          </div>

          {/* Course Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-2">Select Course</label>
            <select
              value={formData.course}
              onChange={(e) =>
                setFormData({ ...formData, course: e.target.value })
              }
              className="w-full border rounded-lg p-2 focus:ring focus:ring-yellow-300"
            >
              <option value="">-- Select Course --</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          {/* Issue Button */}
          <div className="flex items-end">
            <button
              onClick={handleIssue}
              disabled={loading}
              className={`w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg shadow ${
                loading && "opacity-70 cursor-not-allowed"
              }`}
            >
              {loading ? "Issuing..." : "Issue Certificate"}
            </button>
          </div>
        </div>
      </div>

      {/* Certificates Table */}
      <div className="bg-white shadow-md rounded-2xl p-6 border">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Issued Certificates
        </h3>

        {certificates.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No certificates issued yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-2 px-4 border">#</th>
                  <th className="py-2 px-4 border text-left">User</th>
                  <th className="py-2 px-4 border text-left">Course</th>
                  <th className="py-2 px-4 border">Issued On</th>
                  <th className="py-2 px-4 border">Certificate</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((cert, index) => (
                  <tr
                    key={cert.id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="py-2 px-4 border text-center">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 border">{cert.user_name}</td>
                    <td className="py-2 px-4 border">{cert.course_name}</td>
                    <td className="py-2 px-4 border text-center">
                      {new Date(cert.issue_date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {cert.file ? (
                        <a
                          href={cert.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          Download
                        </a>
                      ) : (
                        <span className="text-gray-400">Not Available</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
