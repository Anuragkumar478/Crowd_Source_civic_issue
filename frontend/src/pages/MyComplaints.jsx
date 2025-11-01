import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import MyComplaintCard from "../components/MyComplaintCard"; // ✅ import your card

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch all complaints of logged-in user
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const { data } = await api.get("/mycomplaints");
        setComplaints(data);
      } catch (err) {
        setError("Failed to load complaints");
        toast.error("Failed to load complaints");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  if (loading)
    return (
      <div className="text-center text-lg font-medium text-gray-600 mt-10">
        Loading your complaints...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-lg font-medium text-red-600 mt-10">
        {error}
      </div>
    );

  if (complaints.length === 0)
    return (
      <div className="text-center text-lg font-medium text-gray-600 mt-10">
        You haven’t submitted any complaints yet.
      </div>
    );

  // ✅ Delete handler to update state after card delete
  const handleDelete = (id) => {
    setComplaints((prev) => prev.filter((c) => c._id !== id));
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        My Complaints
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {complaints.map((complaint) => (
          <MyComplaintCard
            key={complaint._id}
            complaint={complaint}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default MyComplaints;
