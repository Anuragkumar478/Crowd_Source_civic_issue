import Complaint from "../models/Complaint.js";
import User from "../models/User.js";

// ✅ Get dashboard summary
export const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalComplaints = await Complaint.countDocuments();
    const resolvedComplaints = await Complaint.countDocuments({ status: "Resolved" });
    const pendingComplaints = await Complaint.countDocuments({ status: "New" });
     const inProgressComplaints = await Complaint.countDocuments({ status: "In Progress" }); // 🟢 add this line

    res.status(200).json({
      totalUsers,
      totalComplaints,
      resolvedComplaints,
      pendingComplaints,
       inProgressComplaints,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all complaints
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("user", "name email");
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update complaint status


export const updateComplaintadminStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;

    // Validate status
    const validStatuses = ["New", "In Progress", "Resolved"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    // ✅ Update only provided fields — skip full document validation
    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { $set: { status, ...(remarks && { remarks }) } },
      { new: true, runValidators: false } // <-- disable re-validation
    );

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Emit socket event if using real-time updates
    const io = req.app.get("io");
    if (io) io.emit("complaintStatusUpdated", complaint);

    res.status(200).json({
      message: "Complaint status updated successfully.",
      complaint,
    });
  } catch (error) {
    console.error("❌ Error updating status:", error);
    res.status(500).json({ message: "Failed to update complaint status." });
  }
};
