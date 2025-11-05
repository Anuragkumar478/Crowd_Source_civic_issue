import { useEffect, useState } from "react";
import io from "socket.io-client";
import api from "../api";
import ComplaintCard from "../components/ComplaintCard";

const socket = io("https://crowd-source-civic-issue.onrender.com", {
  transports: ["websocket"], // important for Render
}); // connect to backend

export default function TrackProgress() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await api.get("/admin/complaints"); // or "/complaints" if user route
        setComplaints(res.data);
      } catch (err) {
        console.error("Error fetching complaints:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  // ✅ Listen for live status updates
  useEffect(() => {
    socket.on("statusUpdated", (data) => {
      setComplaints((prev) =>
        prev.map((c) =>
          c._id === data.id ? { ...c, status: data.status } : c
        )
      );
    });

    return () => socket.off("statusUpdated");
  }, []);

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading complaints...
      </div>
    );
  }

  // 🚫 No complaints
  if (complaints.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-gray-500">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076509.png"
          alt="No data"
          className="w-32 mb-4 opacity-70"
        />
        <p>No complaints found yet.</p>
      </div>
    );
  }

  // ✅ Main UI
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
        📋 Track Complaint Progress
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {complaints.map((complaint) => (
          <ComplaintCard key={complaint._id} complaint={complaint} />
        ))}
      </div>
    </div>
  );
}
