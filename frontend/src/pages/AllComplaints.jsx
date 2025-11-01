import { useEffect, useState } from "react";
import api from "../api";

export default function AllComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await api.get("/admin/complaints");
        setComplaints(res.data);
      } catch (err) {
        console.error("Error fetching complaints:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/admin/complaints/${id}`, { status: newStatus });
      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // 🌀 Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading complaints...
      </div>
    );
  }

  // 🚫 Empty State
  if (complaints.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-gray-500">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076509.png"
          alt="No complaints"
          className="w-32 mb-4 opacity-70"
        />
        <p>No complaints found yet.</p>
      </div>
    );
  }

  // ✅ Main Table
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
        🧾 All Complaints
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Upvotes 👍</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((c) => (
              <tr
                key={c._id}
                className="border-b hover:bg-gray-50 transition-all duration-200"
              >
                <td className="py-3 px-4">{c.user?.name || "Unknown"}</td>
                <td className="py-3 px-4 capitalize">{c.category}</td>
                <td className="py-3 px-4">
                  {c.address}, {c.city}, {c.state}
                </td>

                {/* Status Color */}
                <td
                  className={`py-3 px-4 font-semibold ${
                    c.status === "Resolved"
                      ? "text-green-600"
                      : c.status === "In Progress"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {c.status}
                </td>

                <td className="py-3 px-4 text-center">
                  {c.upvotes?.length || 0}
                </td>

                <td className="py-3 px-4 text-gray-500 text-sm">
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>

                <td className="py-3 px-4">
                <select
  value={c.status || "New"}
  onChange={(e) => handleStatusChange(c._id, e.target.value)}
  className="border border-gray-300 p-1 rounded focus:ring-2 focus:ring-blue-400"
>
  <option value="New">New</option>
<option value="In Progress">In Progress</option>
<option value="Resolved">Resolved</option>

</select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
