import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/auth/profile");
        setUser(data);
      } catch (err) {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await api.post("/auth/logout");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with gradient */}
          <div className={`p-6 text-center ${isAdmin ? "bg-gradient-to-r from-purple-500 to-indigo-600" : "bg-gradient-to-r from-blue-500 to-purple-600"}`}>
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-lg">
              <span className={`text-3xl font-bold ${isAdmin ? "text-purple-600" : "text-blue-500"}`}>
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">{user?.name}</h1>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white bg-opacity-20 text-white text-sm">
              {user?.role}
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium text-gray-900 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-3">
            {!isAdmin ? (
              <>
                <button
                  onClick={() => navigate("/my-complaints")}
                  className="w-full bg-white border border-blue-500 text-blue-500 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
                >
                  <span>View My Complaints</span>
                </button>

                <button
                  onClick={() => navigate("/add-complaint")}
                  className="w-full bg-white border border-green-500 text-green-500 py-3 px-4 rounded-lg hover:bg-green-50 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
                >
                  <span>Add New Complaint</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/admin-dashboard")}
                  className="w-full bg-white border border-purple-500 text-purple-500 py-3 px-4 rounded-lg hover:bg-purple-50 transition-colors duration-200 font-medium"
                >
                  Dashboard
                </button>

                <button
                  onClick={() => navigate("/all-complaints")}
                  className="w-full bg-white border border-blue-500 text-blue-500 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium"
                >
                  All Complaints
                </button>

                <button
                  onClick={() => navigate("/track-progress")}
                  className="w-full bg-white border border-indigo-500 text-indigo-500 py-3 px-4 rounded-lg hover:bg-indigo-50 transition-colors duration-200 font-medium"
                >
                  Track Progress
                </button>

                <button
                  onClick={() => navigate("/admin-analytics")}
                  className="w-full bg-white border border-green-500 text-green-500 py-3 px-4 rounded-lg hover:bg-green-50 transition-colors duration-200 font-medium"
                >
                  Analytics
                </button>
              </>
            )}

            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Member since {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}
