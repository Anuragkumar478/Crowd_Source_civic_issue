import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-center flex-wrap gap-6">
      {/* Always visible */}
      <Link to="/" className="hover:underline">
        Login
      </Link>
      <Link to="/register" className="hover:underline">
        Register
      </Link>
      <Link to="/profile" className="hover:underline">
        Profile
      </Link>

      {/* Show complaint options only if logged in */}
      {token && (
        <>
          <Link to="/add-complaint" className="hover:underline">
            Add Complaint
          </Link>
          <Link to="/my-complaints" className="hover:underline">
            My Complaints
          </Link>
        </>
      )}

      {/* Logout button */}
      {token && (
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
        >
          Logout
        </button>
      )}
    </nav>
  );
}
