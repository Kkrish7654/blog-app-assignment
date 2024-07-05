// src/components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const handleLogout = () => {
    // Clear the authentication token (or any other logout logic)
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
    <header className="bg-transparent py-4 text-gray-800">
      <nav className="flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">BlogApp</Link>
        </div>
        <ul className="flex items-center space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/post-blog" className="hover:text-gray-600">
              Post Blog
            </Link>
          </li>
          <li>
            <Link to="/my-blog" className="hover:text-gray-600">
              My Blog
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
