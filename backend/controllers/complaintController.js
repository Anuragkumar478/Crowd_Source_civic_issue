import axios from "axios"
import Complaint from '../models/Complaint.js';
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

import path from 'path';
import fs from 'fs';

// 🟢 Create Complaint


export const createComplaint = async (req, res) => {
  try {
    console.log("🔥 CREATE COMPLAINT CONTROLLER CALLED");
    const { city, state, address, description, latitude, longitude } = req.body;

    console.log("REQ.BODY:", req.body);

console.log({
  city,
  state,
  address,
  description,
  latitude,
  longitude
});
    
    // ✅ Validation
    // if (!city || !state || !address || !description) {
    //   return res.status(400).json({ message: 'All fields are required.' });
    // }
    if (!city) {
  return res.status(400).json({
    message: "City is required."
  });
}

if (!state) {
  return res.status(400).json({
    message: "State is required."
  });
}

if (!address) {
  return res.status(400).json({
    message: "Address is required."
  });
}

if (!description) {
  return res.status(400).json({
    message: "Description is required."
  });
}

    const aiResponse = await axios.post(
            "http://127.0.0.1:8000/analyze",
            {
                description: description
            }
        );

          



    let imageUrl = '';
    
    

    // ✅ Upload image to Cloudinary if provided
    if (req.file) {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "crowd-source-complaints" },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return res.status(500).json({ message: "Image upload failed." });
          }

          imageUrl = result.secure_url;
         

          // ✅ Create Complaint after successful upload
          const complaint = await Complaint.create({
            user: req.user._id,
            city,
            state,
            address,
            description,
            category:aiResponse.data.category,
            priority:aiResponse.data.priority,
            summary:aiResponse.data.summary,
            imageUrl,
            location: {
              latitude: latitude ? parseFloat(latitude) : undefined,
              longitude: longitude ? parseFloat(longitude) : undefined,
            },
          });

          const io = req.app.get("io");
          io.emit("complaintCreated", complaint); // ✅ Realtime update

          return res.status(201).json({
            message: "Complaint submitted successfully.",
            complaint,
          });
        }
      );

      // ✅ Stream the file buffer to Cloudinary
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    } else {
      // ✅ If no image, create complaint normally
      const complaint = await Complaint.create({
         user: req.user._id,
            city,
            state,
            address,
            description,
            category:aiResponse.data.category,
            priority:aiResponse.data.priority,
            summary:aiResponse.data.summary,
        location: {
          latitude: latitude ? parseFloat(latitude) : undefined,
          longitude: longitude ? parseFloat(longitude) : undefined,
        },
      });

      const io = req.app.get("io");
      io.emit("complaintCreated", complaint);

      return res.status(201).json({
        message: "Complaint submitted successfully (no image).",
        complaint,
      });
    }
  } catch (error) {
    console.error("Error creating complaint:", error);
    res
      .status(500)
      .json({ message: "Server error while creating complaint." });
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
