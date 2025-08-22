import React, { useState } from "react";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert(`Name: ${fullName}\nEmail: ${email}\nPassword: ${password}`);
    // Integrate your backend signup logic here
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
