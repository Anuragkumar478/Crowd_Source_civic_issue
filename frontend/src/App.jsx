import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-10">
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
