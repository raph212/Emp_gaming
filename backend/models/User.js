import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  displayName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, default: "" },
  isAdmin: { type: Boolean, default: false },   // <-- NEW FIELD
  scores: {
    snake: { type: Number, default: 0 },
    memoryCards: { type: Number, default: 0 },
    "2048": { type: Number, default: 0 }
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
