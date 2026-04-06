import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import couponRoutes from "./routes/couponRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
  }
};

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send({ status: "ok" }));

app.use("/api/coupons", couponRoutes);
app.use("/api/users", userRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

const start = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

start();