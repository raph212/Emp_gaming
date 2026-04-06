import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

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
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => res.send({ status: "ok" }));

const start = async () => {
  await connectDB();

  const couponRoutes = (await import("./routes/couponRoutes.js")).default;
  const userRoutes = (await import("./routes/userRoutes.js")).default;
  const scoreRoutes = (await import("./routes/scoreRoutes.js")).default;
  const leaderboardRoutes = (await import("./routes/leaderboardRoutes.js")).default;

  app.use("/api/coupons", couponRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/scores", scoreRoutes);
  app.use("/api/leaderboard", leaderboardRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

start();