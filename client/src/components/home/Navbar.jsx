// src/components/home/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import Logo from "../../assets/img/Bm Academy logo .png";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

 const navLinks = [
  { name: "Courses", path: "/courses" },
  { name: "SACT Test", path: "https://scat-topaz.vercel.app/Sact.html", external: true },
  { name: "SAT Exam", path: "https://sample-sat.vercel.app/", external: true },
  { name: "About", path: "/about" },
  { name: "Verify Certificate", path: "/verify" },
  { name: "Contact", path: "/contacts" },
];



  // ---------- Check login state ----------
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));

      // Optional: refresh profile data
      fetch(`${import.meta.env.VITE_BASE_URI}users/profile/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(async (res) => {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            if (!res.ok) throw await res.json();
            return res.json();
          } else {
            const text = await res.text();
            throw new Error("Non-JSON response: " + text);
          }
        })
        .then((data) => {
          setUser(data);
          setIsLoggedIn(true);
        })
        .catch(() => {
          // Invalid token → logout
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setIsLoggedIn(false);
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Listen for login/logout in other tabs
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      if (token && userData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  const authButtons = (
    <>
      <Link to="/login">
        <button className="w-[150px] bg-black h-[50px] flex items-center justify-center rounded-xl text-white">
          Login
        </button>
      </Link>
      <Link to="/signup">
        <button className="w-[150px] bg-black h-[50px] flex items-center justify-center rounded-xl text-white">
          Sign Up
        </button>
      </Link>
    </>
  );

  if (loading) return null;

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="flex justify-between items-center h-20 px-6">
        <Link to="/">
          <img
            src={Logo}
            alt="BM Academy"
            className="max-h-24 md:max-h-28 w-auto object-contain"
          />
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-700 hover:text-yellow-500 font-medium transition"
            >
              {link.name}
            </Link>
          ))}

          <div className="flex space-x-4 ml-6">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center"
                >
                  <FaUserCircle
                    size={30}
                    className="text-gray-700 hover:text-yellow-500"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg">
                    <Link
                      to="/dashboard/student"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              authButtons
            )}
          </div>
        </div>

        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setIsOpen(false)} className="focus:outline-none">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col space-y-4 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-yellow-500 font-medium transition"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col space-y-3 mt-4 md:hidden px-4">
          {isLoggedIn ? (
            <div className="flex flex-col space-y-2">
              <Link to="/profile" onClick={() => setIsOpen(false)}>
                <FaUserCircle size={30} className="text-gray-700 hover:text-yellow-500" />
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="text-red-500 font-medium hover:text-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            authButtons
          )}
        </div>
      </div>
    </nav>
  );
}
