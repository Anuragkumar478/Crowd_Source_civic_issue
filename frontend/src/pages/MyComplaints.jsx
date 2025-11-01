import { useEffect, useState } from "react";
import api from "../api";
import ComplaintCard from "../components/ComplaintCard";

export default function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const { data } = await api.get("/complaints/my");
        setComplaints(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch complaints");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  if (loading) return <p className="text-center mt-6">Loading your complaints...</p>;
  if (error) return <p className="text-center text-red-600 mt-6">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">My Complaints</h2>
      {complaints.length === 0 ? (
        <p className="text-center text-gray-600">No complaints submitted yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {complaints.map((complaint) => (
            <ComplaintCard key={complaint._id} complaint={complaint} />
          ))}
        </div>
      )}
    </div>
  );
}
