import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  game: String,
  score: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Score", scoreSchema);
