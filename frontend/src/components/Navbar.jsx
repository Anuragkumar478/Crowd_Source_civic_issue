import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364] text-gray-200 px-6 py-3 shadow-lg sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Left: Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-white tracking-wide hover:text-teal-300 transition duration-300"
        >
          Develop<span className="text-teal-400">MyCity</span>
        </Link>

        {/* Hamburger for small screens */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-300 hover:text-white transition"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Right: Nav Links */}
        <div
          className={`flex-col md:flex-row md:flex md:items-center gap-6 absolute md:static bg-[#1b2a33] md:bg-transparent w-full md:w-auto left-0 md:left-auto top-[60px] md:top-auto p-5 md:p-0 transition-all duration-300 ${
            menuOpen ? "flex" : "hidden md:flex"
          }`}
        >
          <Link to="/" className="hover:text-teal-400 transition font-semibold">
            Home
          </Link>

          {!user && (
            <>
              <Link
                to="/login"
                className="hover:text-teal-400 transition font-semibold"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-teal-400 transition font-semibold"
              >
                Register
              </Link>
            </>
          )}

          {/* Citizen */}
          {user && user.role === "user" && (
            <>
              <Link
                to="/add-complaint"
                className="hover:text-teal-400 transition font-semibold"
              >
                Add Complaint
              </Link>
              <Link
                to="/my-complaints"
                className="hover:text-teal-400 transition font-semibold"
              >
                My Complaints
              </Link>
            </>
          )}

          {/* Admin */}
          {user && user.role === "admin" && (
            <>
              <Link
                to="/admin-dashboard"
                className="hover:text-teal-400 transition font-semibold"
              >
                Dashboard
              </Link>
              <Link
                to="/all-complaints"
                className="hover:text-teal-400 transition font-semibold"
              >
                All Complaints
              </Link>
              <Link
                to="/track-progress"
                className="hover:text-teal-400 transition font-semibold"
              >
                Track Progress
              </Link>
              <Link
                to="/admin-analytics"
                className="hover:text-teal-400 transition font-semibold"
              >
                Analytics
              </Link>
            </>
          )}

          {/* Right Section */}
          {user && (
            <div className="flex items-center gap-3 md:ml-6 border-t md:border-none border-gray-600 pt-3 md:pt-0">
              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-teal-400 transition"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-gray-400"
                />
                <span className="font-semibold">{user.name || "Profile"}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 px-3 py-1 rounded-md text-sm font-semibold transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
