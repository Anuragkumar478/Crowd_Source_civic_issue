import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🧠 Connect to Database
await connectDB();

// 🔧 Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // frontend URL
    credentials: true, // allow cookies
  })
);

// 🧭 Routes
app.get("/", (req, res) => {
  res.send("🚀 Server is running successfully!");
});
app.use("/api/auth", userRouter);

app.listen(PORT, () => {
  console.log(`✅ Server running on port: ${PORT}`);
});