import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="text-gray-600 text-sm">
      <ol className="flex space-x-2">
        <li>
          <Link to="/" className="text-yellow-600 hover:underline">
            Home
          </Link>
        </li>

        {pathParts.map((part, index) => {
          const path = "/" + pathParts.slice(0, index + 1).join("/");
          const name = part.charAt(0).toUpperCase() + part.slice(1);
          return (
            <li key={path} className="flex items-center space-x-2">
              <span>/</span>
              <Link
                to={path}
                className={`hover:underline ${
                  index === pathParts.length - 1
                    ? "text-gray-800 font-semibold"
                    : "text-yellow-600"
                }`}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
