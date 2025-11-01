import Complaint from '../models/Complaint.js';
import path from 'path';
import fs from 'fs';

// 🟢 Create Complaint
export const createComplaint = async (req, res) => {
  try {
    const { city, state, address, category, latitude, longitude } = req.body;

    // ✅ Validation
    if (!city || !state || !address || !category) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    let imageUrl = '';
if (req.file) {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
}

    // ✅ Create Complaint
    const complaint = await Complaint.create({
      user: req.user._id,
      city,
      state,
      address,
      category,
      imageUrl,
      location: {
        latitude: latitude ? parseFloat(latitude) : undefined,
        longitude: longitude ? parseFloat(longitude) : undefined,
      },
    });

     const io = req.app.get("io");
    io.emit("complaintCreated", complaint); // ✅ Realtime update

    res.status(201).json({
      message: 'Complaint submitted successfully.',
      complaint,
    });
  } catch (error) {
    console.error('Error creating complaint:', error);
    res.status(500).json({ message: 'Server error while creating complaint.' });
  }
};

// 🟡 Get all complaints (Admin or overview)
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ message: 'Failed to fetch complaints.' });
  }
};

// 🔵 Get user’s own complaints
export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    console.error('Error fetching user complaints:', error);
    res.status(500).json({ message: 'Failed to fetch your complaints.' });
  }
};

// 🟣 Update complaint status (Admin)
export const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['New', 'In Progress', 'Resolved'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const complaint = await Complaint.findByIdAndUpdate(id, { status }, { new: true });

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found.' });
    }

     // ✅ Emit real-time status update
    const io = req.app.get("io");
    io.emit("complaintStatusUpdated", complaint);

    res.status(200).json({
      message: 'Complaint status updated successfully.',
      complaint,
    });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Failed to update complaint status.' });
  }
};

// 🔴 Delete complaint
export const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await Complaint.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found or not authorized.' });
    }

    // 🗑️ Delete image if exists
    if (complaint.imageUrl) {
      const imagePath = path.join(process.cwd(), complaint.imageUrl);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    res.json({ message: 'Complaint deleted successfully.' });
  } catch (error) {
    console.error('Error deleting complaint:', error);
    res.status(500).json({ message: 'Server error while deleting complaint.' });
  }
};

// 🟢 Upvote or remove upvote from a complaint
export const toggleUpvote = async (req, res) => {
  try {
    const { id } = req.params; // complaint ID
    const userId = req.user._id;

    const complaint = await Complaint.findById(id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    // Check if user already upvoted
    const hasUpvoted = complaint.upvotes.includes(userId);

    if (hasUpvoted) {
      // Remove upvote
      complaint.upvotes = complaint.upvotes.filter(
        (uid) => uid.toString() !== userId.toString()
      );
    } else {
      // Add upvote
      complaint.upvotes.push(userId);
    }

   await complaint.save({ validateBeforeSave: false });


     // ✅ Emit real-time upvote change
    const io = req.app.get("io");
    io.emit("complaintUpvoted", {
      id: complaint._id,
      totalUpvotes: complaint.upvotes.length,
    });


    res.status(200).json({
      message: hasUpvoted
        ? "Upvote removed successfully"
        : "Upvote added successfully",
      totalUpvotes: complaint.upvotes.length,
      upvotedByUser: !hasUpvoted,
    });
  } catch (error) {
    console.error("Error toggling upvote:", error);
    res.status(500).json({ message: "Server error while updating upvote." });
  }
};
