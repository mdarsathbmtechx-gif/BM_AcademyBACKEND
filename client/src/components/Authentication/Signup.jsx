import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Centralized function to store token & user
  const storeUserData = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    window.dispatchEvent(new Event("storage")); // update Navbar immediately
  };

  // ----------------- Normal Signup -----------------
  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // 1️⃣ Signup
      await axios.post(
        "${import.meta.env.VITE_BASE_URI}users/signup/",
        { name, email, phone, password, role: "client" },
        { headers: { "Content-Type": "application/json" } }
      );

      // 2️⃣ Auto-login after signup
      const res = await axios.post("${import.meta.env.VITE_BASE_URI}users/login/", {
        email,
        password,
      });

      storeUserData(res.data.token, res.data.user);
      navigate("/dashboard/student");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.error || "Signup failed!");
    }
  };

  // ----------------- Google Signup/Login -----------------
  const handleGoogleLogin = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const res = await axios.post(
        "${import.meta.env.VITE_BASE_URI}users/google-login/",
        { token },
        { headers: { "Content-Type": "application/json" } }
      );

      storeUserData(res.data.token || res.data.access, res.data.user);
      navigate("/dashboard/student");
    } catch (err) {
      console.error("Google signup failed:", err.response?.data || err.message);
      alert("Google signup failed!");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        {/* Normal signup form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-4 border rounded-xl"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 border rounded-xl"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full p-4 border rounded-xl"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-4 border rounded-xl"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-4 border rounded-xl"
          />
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-black font-bold rounded-xl"
          >
            Sign Up
          </button>
        </form>

        {/* Google signup/login */}
        <div className="mt-4 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.log("Google signup failed")}
          />
        </div>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-yellow-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </section>
  );
};

export default Signup;
