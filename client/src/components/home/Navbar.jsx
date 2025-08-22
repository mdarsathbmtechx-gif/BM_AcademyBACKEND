import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../../assets/img/Bm Academy logo .png";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Courses", path: "/courses" },
    { name: "SACT Test", path: "/sact" },
    { name: "SAT Exam", path: "/sat" },
    { name: "About", path: "/about" },
    { name: "Verify Certificate", path: "/verify" },
    { name: "Contact", path: "/contacts" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/">
          <img
            src={Logo}
            alt="BM Academy"
            className="h-16 sm:h-20 md:h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
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

          {/* Desktop Auth Buttons */}
          <div className="flex space-x-4 ml-6">
            <Link
              to="/login"
              className="px-5 py-2 rounded-2xl bg-yellow-400 text-black font-semibold shadow-md hover:bg-yellow-500 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 rounded-2xl bg-yellow-400 text-black font-semibold shadow-md hover:bg-yellow-500 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setIsOpen(false)} className="focus:outline-none">
            <X size={24} />
          </button>
        </div>

        {/* Mobile Links */}
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

        {/* Mobile Auth Buttons */}
        <div className="flex flex-col space-y-3 px-4 mt-4 border-t pt-4">
          <Link
            to="/login"
            className="w-full px-6 py-2 rounded-2xl bg-yellow-400 text-black font-semibold shadow-md hover:bg-yellow-500 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="w-full px-6 py-2 rounded-2xl bg-yellow-400 text-black font-semibold shadow-md hover:bg-yellow-500 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
