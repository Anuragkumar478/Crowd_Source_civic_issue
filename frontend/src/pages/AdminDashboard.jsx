import { useEffect, useState } from "react";
import api from "../api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId;

    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchStats();

    // ✅ Real-time auto-refresh every 5 seconds
    intervalId = setInterval(fetchStats, 5000);

    // Cleanup when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  if (loading || !stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      color: "from-blue-500 to-blue-600",
      icon: "👥",
      description: "Registered users"
    },
    {
      title: "Total Complaints",
      value: stats.totalComplaints,
      color: "from-green-500 to-green-600",
      icon: "📝",
      description: "All complaints"
    },
    {
      title: "Pending(new)",
      value: stats.pendingComplaints,
      color: "from-yellow-500 to-yellow-600",
      icon: "⏳",
      description: "Awaiting action"
    },
    {
      title: "In Progress",
      value: stats.inProgressComplaints,
      color: "from-orange-500 to-orange-600",
      icon: "🚧",
      description: "Currently being worked on"
    },
    {
      title: "Resolved",
      value: stats.resolvedComplaints,
      color: "from-purple-500 to-purple-600",
      icon: "✅",
      description: "Completed cases"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Welcome to your administration panel
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {statCards.map((card, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${card.color} text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-h-[140px]`}
            >
              <div className="p-6 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">{card.title}</p>
                    <p className="text-2xl font-bold mt-2">{card.value}</p>
                  </div>
                  <div className="text-3xl opacity-80">{card.icon}</div>
                </div>
                <p className="text-blue-100 text-xs opacity-80 mt-4">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-4 rounded-lg transition-colors duration-200 font-medium text-center">
                Manage Users
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white py-4 px-4 rounded-lg transition-colors duration-200 font-medium text-center">
                View Complaints
              </button>
              <button className="bg-purple-500 hover:bg-purple-600 text-white py-4 px-4 rounded-lg transition-colors duration-200 font-medium text-center">
                Generate Report
              </button>
              <button className="bg-gray-500 hover:bg-gray-600 text-white py-4 px-4 rounded-lg transition-colors duration-200 font-medium text-center">
                Settings
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <p className="text-gray-700 font-medium">New user registered</p>
                </div>
                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                  2 min ago
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <p className="text-gray-700 font-medium">Complaint resolved</p>
                </div>
                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                  1 hour ago
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <p className="text-gray-700 font-medium">New complaint submitted</p>
                </div>
                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                  3 hours ago
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <p className="text-gray-700 font-medium">System backup completed</p>
                </div>
                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                  5 hours ago
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm border-t pt-4">
          Last updated: {new Date().toLocaleTimeString()} • System Status:{" "}
          <span className="text-green-500 font-medium">Operational</span>
        </div>
      </div>
    </div>
  );
}
