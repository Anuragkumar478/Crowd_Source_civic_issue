import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-center space-x-6">
      <Link to="/" className="hover:underline">Login</Link>
      <Link to="/register" className="hover:underline">Register</Link>
      <Link to="/profile" className="hover:underline">Profile</Link>
    </nav>
  );
}
