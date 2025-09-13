import React, { useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student"); // default role

  const handleSignup = async (e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    // ✅ Use plain axios (no Authorization header) for signup
    await axios.post("http://127.0.0.1:8000/api/users/signup/", {
      username: fullName, // must match Django’s expected field
      email,
      password,
      role, // only if backend supports it
    });

    // ✅ Use plain axios again for login
    const loginRes = await axios.post("http://127.0.0.1:8000/api/token/", {
      username: fullName,
      password,
    });

    // Store tokens in localStorage
    localStorage.setItem("access_token", loginRes.data.access);
    localStorage.setItem("refresh_token", loginRes.data.refresh);
    localStorage.setItem("role", role);

    // ✅ Now navigation works based on role
    if (role === "admin") navigate("/dashboard/admin");
    else navigate("/dashboard/student");

  } catch (err) {
    console.error(err.response?.data || err);
    alert("Signup failed!");
  }
};


  return (
    <section className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex items-start justify-center pt-28 px-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-yellow-600 mb-6 text-center">
          🎓 Sign Up for BM Academy
        </h2>
        <form className="space-y-4" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="👤 Full Name"
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="📧 Email Address"
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="🔒 Password"
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="🔒 Confirm Password"
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {/* Role selection */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full py-4 bg-yellow-500 text-black font-bold rounded-xl shadow hover:bg-yellow-400 transition"
          >
            ✅ Sign Up
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-yellow-600 hover:underline">
            Login here
          </a>
        </div>
      </div>
    </section>
  );
};

export default Signup;
