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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🧠 Connect to Database
await connectDB();

// ✅ Create HTTP server for Socket.IO
const server = createServer(app);

// ✅ Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  },
});

// 🔧 Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  // we can use in place of this "http://localhost:5173", "http://localhost:5174"="https://your-frontend.vercel.app"
  cors({
    origin: ["https://your-frontend.vercel.app"],
    credentials: true,
  })
);

// ✅ Store io globally (to emit from routes)
app.set("io", io);

// ✅ Static files and routes
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/auth", userRouter);
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/analytics", adminAnalyticsRoutes);

// 🧭 Default route
app.get("/", (req, res) => {
  res.send("🚀 Server is running successfully!");
});

// 🟢 Socket.io connection listener
io.on("connection", (socket) => {
  console.log("🟢 A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// ✅ Use `server.listen` instead of `app.listen`
server.listen(PORT, () => {
  console.log(`✅ Server running on port: ${PORT}`);
});
