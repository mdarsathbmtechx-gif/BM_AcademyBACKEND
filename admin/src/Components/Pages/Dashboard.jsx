// src/Components/Dashboard.jsx
import React from "react";
import Navbar from "../Layout/Sidebar";

export default function Dashboard() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          Welcome to Admin Dashboard
        </h2>
        <p>This is your protected admin area.</p>
      </div>
    </div>
  );
}
