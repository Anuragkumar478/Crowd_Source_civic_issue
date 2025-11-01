import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-[#2A7B9B] text-white px-8 py-3 flex items-center justify-between shadow-md">
      {/* LEFT SIDE: BRAND + LINKS */}
      <div className="flex items-center gap-8 flex-wrap">
        {/* 🌆 Brand Name */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-white hover:text-yellow-300 transition duration-300"
        >
          DevelopMyCity
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 flex-wrap text-[15px] px-[50px]">
          <Link to="/" className="hover:underline font-semibold">
            Home
          </Link>

          {/* IF NOT LOGGED IN */}
          {!user && (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}

          {/* IF USER IS LOGGED IN AND ROLE = USER */}
          {user && user.role === "user" && (
            <>
              <Link to="/add-complaint" className="hover:underline">
                Add Complaint
              </Link>
              <Link to="/my-complaints" className="hover:underline">
                My Complaints
              </Link>
            </>
          )}

          {/* IF USER IS ADMIN */}
          {user && user.role === "admin" && (
            <>
              <Link to="/admin-dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link to="/all-complaints" className="hover:underline">
                All Complaints
              </Link>
              <Link to="/track-progress" className="hover:underline">
                Track Progress
              </Link>
              <Link to="/admin-analytics" className="hover:underline">
                Analytics
              </Link>
            </>
          )}
        </div>
      </div>

      {/* RIGHT SIDE: PROFILE + LOGOUT */}
      {user && (
        <div className="flex items-center gap-4">
          <Link to="/profile" className="flex items-center gap-2 hover:underline">
            <span className="font-semibold">{user.name || "Profile"}</span>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
