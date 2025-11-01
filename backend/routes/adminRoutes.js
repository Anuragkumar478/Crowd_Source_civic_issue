import express from "express";
import {
  getAdminDashboard,
  getAllComplaints,
  updateComplaintadminStatus,
} from "../controllers/adminController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// ✅ Only accessible by admin
router.get("/dashboard", protect, getAdminDashboard);
router.get("/complaints", protect, getAllComplaints);
router.put("/complaints/:id", protect, updateComplaintadminStatus);

export default router;
