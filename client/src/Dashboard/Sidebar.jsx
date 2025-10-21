import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, LogOut } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={18} /> },
    { name: "Courses", path: "/dashboard/courses", icon: <BookOpen size={18} /> },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-gray-100 flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        BM Academy
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition 
              ${
                location.pathname === item.path
                  ? "bg-yellow-500 text-black font-semibold"
                  : "hover:bg-gray-700"
              }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        className="m-4 flex items-center gap-3 px-3 py-2 rounded-md bg-red-600 hover:bg-red-500 text-white transition"
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}
