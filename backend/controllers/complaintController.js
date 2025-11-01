// controllers/complaintController.js
import Complaint from '../models/Complaint.js';
import path from 'path';
import fs from 'fs';

// 🟢 Create Complaint
export const createComplaint = async (req, res) => {
  try {
    const { city, state, address } = req.body;

    if (!city || !state || !address) {
      return res.status(400).json({ message: 'City, state, and address are required.' });
    }

    // Handle uploaded file (if any)
    let imageUrl = '';
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const complaint = await Complaint.create({
      user: req.user._id,
      city,
      state,
      address,
      imageUrl
    });

    res.status(201).json({
      message: 'Complaint submitted successfully.',
      complaint
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
    const complaints = await Complaint.find({ user: req.user._id }).sort({ createdAt: -1 });
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

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found.' });
    }

    res.status(200).json({
      message: 'Complaint status updated successfully.',
      complaint
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
    const complaint = await Complaint.findOneAndDelete({ _id: id, user: req.user._id });

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found or not authorized.' });
    }

    // Delete image from uploads folder if exists
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
