import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
   description: {
      type:String,
      required: true,
    trim: true
   },

  // 🏷️ Category tagging
  category: {
    type: String,
    enum: [
    'Road',
    'Water',
    'Waste Management',
    'Electricity',
    'Street Lighting',
    'Drainage & Sewage',
    'Pollution',
    'Public Safety',
    'Public Transport',
    'Public Infrastructure',
    'Other'
  ],
    required: true,
  },

  priority:{
    type:String,
    enum:[
      'Low',
      'Medium',
      'High'
    ],
    default: 'Low',
  },

   summary:{
    type:String,
    trim : true,
  },

  imageUrl: {
    type: String,
  },

  // 🌍 Location Fields
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
  },

  status: {
    type: String,
    enum: ['New', 'In Progress', 'Resolved'],
    default: 'New',
  },

 

  // 🧠 Crowd validation: users who upvoted this complaint
  upvotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;
