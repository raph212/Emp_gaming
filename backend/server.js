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

const start = async () => {
  await connectDB();

  const couponRoutes = await import("./routes/couponRoutes.js");
  const userRoutes = await import("./routes/userRoutes.js");
  const scoreRoutes = await import("./routes/scoreRoutes.js");
  const leaderboardRoutes = await import("./routes/leaderboardRoutes.js");
  const { cleanupScores } = await import("./controllers/scoreController.js");

  cleanupScores({},{json:(msg)=>console.log("🧹 Auto Cleanup:", msg)});

  app.use("/api/coupons", couponRoutes.default);
  app.use("/api/users", userRoutes.default);
  app.use("/api/scores", scoreRoutes.default);
  app.use("/api/leaderboard", leaderboardRoutes.default);

  app.get("/", (req, res) => res.send({ status: "ok" }));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

start();