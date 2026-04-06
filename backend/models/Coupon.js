import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  code: { type: String, required: true, unique: true },
  redeemed: { type: Boolean, default: false },
  email: { type: String, default: null },
  issuedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Coupon", couponSchema);
