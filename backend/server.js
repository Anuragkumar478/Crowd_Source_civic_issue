import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminAnalyticsRoutes from "./routes/adminAnalytics.js";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import { v2 as cloudinary } from 'cloudinary'


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET
});

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🧠 Connect to Database
await connectDB();

// ✅ Create HTTP server for Socket.IO
const server = createServer(app);

const allowedOrigins = [
  "https://crowd-source-civic-i-git-baed32-anurag-kumars-projects-4fdb0a50.vercel.app", // ✅ Your Vercel frontend
  "https://crowd-source-civic-issue-frontend.onrender.com",
    "https://crowd-source-civic-issue-jtso.vercel.app",  // Render frontend (if any)
  "http://localhost:5173", // local dev
];


app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


// ✅ Socket.IO CORS
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ✅ Store io globally (to emit from routes)
app.set("io", io);

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
//app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// ✅ Routes
app.use("/api/auth", userRouter);
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/analytics", adminAnalyticsRoutes);

// 🧭 Default route
app.get("/", (req, res) => {
  res.send("🚀 Crowd Source Civic Issue backend is live on Render!");
});

// 🟢 Socket.io connection listener
io.on("connection", (socket) => {
  console.log("🟢 A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// ✅ Start Server
server.listen(PORT, () => {
  console.log(`✅ Server running on port: ${PORT}`);
});
