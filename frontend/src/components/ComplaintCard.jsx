import { useState } from "react";
import api from "../api"; // Axios instance

export default function ComplaintCard({ complaint }) {
  const [upvotes, setUpvotes] = useState(complaint.upvotes?.length || 0);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  // 🧠 Handle Upvote
  const handleUpvote = async () => {
    try {
      const res = await api.put(`/complaints/${complaint._id}/upvote`);
      setUpvotes(res.data.totalUpvotes); // ✅ use totalUpvotes, not upvotes
      setHasUpvoted(res.data.upvotedByUser); // ✅ handle both add/remove
    } catch (error) {
      console.error("Error upvoting complaint:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* 🖼️ Image */}
      {complaint.imageUrl && (
        <img
          src={complaint.imageUrl}
          alt="Complaint"
          className="w-full h-48 object-cover rounded mb-3"
        />
      )}

      {/* 📍 Info */}
      <h3 className="font-semibold text-lg">
        {complaint.city}, {complaint.state}
      </h3>
      <p className="text-gray-700 text-sm mt-1">{complaint.address}</p>

      {/* 🟢 Status */}
      <p className="mt-2">
        <span className="font-medium">Status:</span>{" "}
        <span
          className={`${
            complaint.status === "resolved"
              ? "text-green-600"
              : complaint.status === "in progress"
              ? "text-yellow-600"
              : "text-red-600"
          } capitalize`}
        >
          {complaint.status}
        </span>
      </p>

      {/* 👍 Upvote Button */}
      <div className="flex justify-between items-center mt-3">
        <button
          onClick={handleUpvote}
          className={`px-3 py-1 rounded text-sm transition-all ${
            hasUpvoted
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          👍 {hasUpvoted ? "Upvoted" : "Upvote"}
        </button>
        <span className="text-gray-700 text-sm font-medium">
          {upvotes} {upvotes === 1 ? "vote" : "votes"}
        </span>
      </div>

      {/* 🕓 Date */}
      <p className="text-xs text-gray-500 mt-2">
        {new Date(complaint.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
