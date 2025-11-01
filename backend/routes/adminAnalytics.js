// routes/adminAnalytics.js
import express from "express";
import Complaint from "../models/Complaint.js";

const router = express.Router();

// 📊 Complaints by category
router.get("/by-category", async (req, res) => {
  try {
    const data = await Complaint.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🌆 Complaints by city
router.get("/by-city", async (req, res) => {
  try {
    const data = await Complaint.aggregate([
      { $group: { _id: "$city", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🗺️ Complaints by state
router.get("/by-state", async (req, res) => {
  try {
    const data = await Complaint.aggregate([
      { $group: { _id: "$state", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ⚙️ Complaints by status (New, In Progress, Resolved)
router.get("/by-status", async (req, res) => {
  try {
    const data = await Complaint.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
