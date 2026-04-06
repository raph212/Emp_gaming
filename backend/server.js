import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";

import couponRoutes from "./routes/couponRoutes.js"; // ✅ Coupon routes
import userRoutes from "./routes/userRoutes.js";     // ✅ Users
import scoreRoutes from "./routes/scoreRoutes.js";   // ✅ Scores
import leaderboardRoutes from "./routes/leaderboardRoutes.js"; // ✅ Leaderboard

dotenv.config();
await connectDB();

// 🧹 Auto cleanup on startup
import { cleanupScores } from "./controllers/scoreController.js";
cleanupScores({},{json:(msg)=>console.log("🧹 Auto Cleanup:", msg)});
const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Register routes
app.use("/api/coupons", couponRoutes);
app.use("/api/users", userRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

app.get("/", (req, res) => res.send({ status: "ok" }));

// 🧠 Debug: show all registered routes
app._router.stack
  .filter(r => r.route)
  .forEach(r => console.log(Object.keys(r.route.methods), r.route.path));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
