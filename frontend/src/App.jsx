import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddComplaint from "./pages/AddComplaint";
import MyComplaints from "./pages/MyComplaints";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AllComplaints from "./pages/AllComplaints";
import TrackProgress from "./pages/TrackProgress";
import AdminAnalytics from "./pages/AdminAnalytics";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";  // ✅ Add this line
import "react-toastify/dist/ReactToastify.css";   // ✅ Import toast styles

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAdminPage =
    location.pathname.includes("admin") || location.pathname === "/all-complaints";

  const isFullPageLayout = [
    "/my-complaints",
    "/add-complaint",
    "/track-progress",
  ].includes(location.pathname);

  return (
    <>
      <Navbar />
      {isHomePage ? (
        <Home />
      ) : isAdminPage || isFullPageLayout ? (
        <div className="min-h-screen bg-gray-500">
          <Routes>
            {/* Admin */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/all-complaints" element={<AllComplaints />} />
            <Route path="/admin-analytics" element={<AdminAnalytics />} />

            {/* User full width pages */}
            <Route path="/my-complaints" element={<MyComplaints />} />
            <Route path="/add-complaint" element={<AddComplaint />} />
            <Route path="/track-progress" element={<TrackProgress />} />
          </Routes>
        </div>
      ) : (
        // ✅ Centered smaller layout
        <div className="min-h-screen bg-gray-200 flex justify-center items-start pt-10">
          <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      )}

      {/* ✅ ToastContainer added globally */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
