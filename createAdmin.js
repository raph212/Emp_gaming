import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./backend/models/User.js";
import { connectDB } from "./backend/config/db.js";

dotenv.config();

async function createAdmin() {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({ isAdmin: true });
    if (existingAdmin) {
      console.log("✅ Admin already exists:", existingAdmin.displayName);
      process.exit(0);
    }

    const admin = new User({
      displayName: "admin",
      password: "admin123",
      email: "admin@gaminghub.com",
      isAdmin: true,
    });

    await admin.save();
    console.log("🎉 Admin account created successfully!");
    console.log("👉 Username: admin");
    console.log("👉 Password: admin123");
    console.log("👉 Email: admin@gaminghub.com");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
}

createAdmin();
