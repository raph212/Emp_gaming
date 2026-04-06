import fs from "fs";
import dotenv from "dotenv";
import { connectDB } from "./backend/config/db.js";
import User from "./backend/models/User.js";
import Score from "./backend/models/Score.js";
import Coupon from "./backend/models/Coupon.js";
dotenv.config();

async function migrate() {
  try {
    await connectDB();
    const raw = fs.readFileSync("./localstorage_backup.json", "utf-8");
    const data = JSON.parse(raw);
    console.log("Loaded backup");

    await User.deleteMany({});
    await Score.deleteMany({});
    await Coupon.deleteMany({});
    console.log("Cleared collections");

    const userMap = new Map();
    for (const u of data.users || []) {
      const newUser = await User.create({
        displayName: u.displayName || u.nickname || "Player",
        password: u.password || "1234",
        email: u.email || "",
        scores: u.scores || {}
      });
      userMap.set(u.displayName, newUser._id);
    }

    for (const s of data.leaderboard || []) {
      const userId = userMap.get(s.displayName);
      if (!userId) continue;
      await Score.create({ userId, game: s.game || 'overall', score: s.score || 0 });
    }

    for (const c of data.coupons || []) {
      const userId = userMap.get(c.displayName) || null;
      await Coupon.create({
        userId,
        code: c.code || ('MIG-' + Math.random().toString(36).substr(2,8).toUpperCase()),
        redeemed: c.redeemed || false,
        email: c.email || ''
      });
    }

    console.log("Migration done");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

migrate();
