import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  createComplaint,
  getAllComplaints,
  getMyComplaints,
  updateComplaintStatus,
  deleteComplaint,
  toggleUpvote
} from '../controllers/complaintController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// ✅ Multer setup for image uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}${path.extname(file.originalname)}`);
//   },
// });
// ✅ Multer setup for in-memory uploads (for Cloudinary)
const storage = multer.memoryStorage();// store in RAM instead of disk
const upload = multer({ storage });

// ✅ Routes
router.post('/', protect, upload.single('image'), createComplaint);
router.get('/', protect, getAllComplaints);
router.get('/my', protect, getMyComplaints);
router.put('/:id', protect, updateComplaintStatus);
router.delete('/:id', protect, deleteComplaint);
router.put('/:id/upvote', protect, toggleUpvote);

export default router;
