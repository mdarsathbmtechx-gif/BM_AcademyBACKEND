import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Centralized function to store token & user
  const storeUserData = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    window.dispatchEvent(new Event("storage")); // update Navbar immediately
  };

  // ----------------- Normal Email/Password Login -----------------
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/users/login/", {
        email,
        password,
      });

      storeUserData(res.data.token, res.data.user);
      navigate("/dashboard/student");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.error || "Invalid credentials");
    }
  };

  // ----------------- Google Login -----------------
  const handleGoogleLogin = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/users/google-login/",
        { token },
        { headers: { "Content-Type": "application/json" } }
      );

      storeUserData(res.data.token || res.data.access, res.data.user);
      navigate("/dashboard/student");
    } catch (err) {
      console.error("Google login failed:", err.response?.data || err.message);
      alert("Google login failed!");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Email/password login form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-black font-bold rounded-xl"
          >
            Login
          </button>
        </form>

        {/* Google login */}
        <div className="mt-4 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.log("Google login failed")}
          />
        </div>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-yellow-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </section>
  );
};

export default Login;
