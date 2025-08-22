import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Email: ${email}\nPassword: ${password}`);
    // Integrate your backend login logic here
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex items-start justify-center pt-28 px-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-yellow-600 mb-6 text-center">
          🎓 Login to BM Academy
        </h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="📧 Enter your email"
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="🔒 Enter your password"
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-4 bg-yellow-500 text-black font-bold rounded-xl shadow hover:bg-yellow-400 transition"
          >
            ✅ Login
          </button>
        </form>
         <div className="mt-4 text-center text-sm text-gray-600">
           <Link to="/forgotpassword"className="px-5 py-2 rounded-2xl bg-yellow-400 text-black font-semibold shadow-md hover:bg-yellow-500 transition">
            Forgot Password
          </Link> */
          <span className="mx-2">|</span>
          <a href="/signup" className="text-yellow-600 hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </section>
  );
};
export default Login;
