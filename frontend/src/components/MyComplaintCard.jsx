import { useState } from "react";
import api from "../api";

export default function MyComplaintCard({ complaint, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  // ✅ Delete complaint handler
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;

    try {
      setIsDeleting(true);
      await api.delete(`/complaints/${complaint._id}`); // backend route
      onDelete(complaint._id); // remove from frontend list
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete complaint");
    } finally {
      setIsDeleting(false);
    }
  };

  // ✅ Badge color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Pending":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-red-100 text-red-800 border-red-200";
    }
  };

  // ✅ Icon for status
  const getStatusIcon = (status) => {
    switch (status) {
      case "Resolved":
        return "✅";
      case "In Progress":
        return "🔄";
      case "Pending":
        return "⏳";
      default:
        return "❌";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
      {/* Image Section */}
      {complaint.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={complaint.imageUrl}
            alt="Complaint"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-3 right-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                complaint.status
              )}`}
            >
              {getStatusIcon(complaint.status)} {complaint.status}
            </span>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="p-6">
        {/* Location */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {complaint.city}, {complaint.state}
            </h3>
            <p className="text-sm text-gray-600 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {complaint.address}
            </p>
          </div>
          {!complaint.imageUrl && (
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                complaint.status
              )}`}
            >
              {getStatusIcon(complaint.status)} {complaint.status}
            </span>
          )}
        </div>

        {/* Date */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {new Date(complaint.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4 border-t border-gray-100">
          {complaint.latitude && complaint.longitude && (
            <a
              href={`https://www.google.com/maps?q=${complaint.latitude},${complaint.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors text-center flex items-center justify-center"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              View Map
            </a>
          )}

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`flex-1 ${
              isDeleting
                ? "bg-red-200 text-gray-600 cursor-not-allowed"
                : "bg-red-50 text-red-600 hover:bg-red-100"
            } py-2 px-3 rounded-lg text-sm font-medium transition-colors`}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
