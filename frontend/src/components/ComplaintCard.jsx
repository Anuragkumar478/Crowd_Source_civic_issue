export default function ComplaintCard({ complaint }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {complaint.imageUrl && (
        <img
          src={complaint.imageUrl}
          alt="Complaint"
          className="w-full h-48 object-cover rounded mb-3"
        />
      )}
      <h3 className="font-semibold text-lg">{complaint.city}, {complaint.state}</h3>
      <p className="text-gray-700 text-sm mt-1">{complaint.address}</p>
      <p className="mt-2">
        <span className="font-medium">Status:</span>{" "}
        <span
          className={`${
            complaint.status === "Resolved"
              ? "text-green-600"
              : complaint.status === "In Progress"
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {complaint.status}
        </span>
      </p>
      <p className="text-xs text-gray-500 mt-2">
        {new Date(complaint.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
