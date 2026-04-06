import Coupon from "../models/Coupon.js";
import { sendCouponEmail } from "../utils/mailer.js";

import User from "../models/User.js";


export const generateCoupon = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log("🎟️ Generating coupon for:", userId);

    // 🧠 Support both _id and username
    let user = null;
    if (userId && userId.length === 24) {
      user = await User.findById(userId);
    } else if (userId) {
      user = await User.findOne({ displayName: userId });
    }

    if (!user) {
      return res.status(400).json({ message: "User not found. Use valid ID or username." });
    }

    const code = "COUPON-" + Math.random().toString(36).substr(2, 8).toUpperCase();
    const newCoupon = await Coupon.create({
      userId: user._id,
      code,
      redeemed: false,
      issuedAt: new Date(),
    });

    res.status(201).json({
      message: "Coupon created successfully!",
      code: newCoupon.code,
      user: user.displayName,
      issuedAt: newCoupon.issuedAt,
    });
  } catch (err) {
    console.error("❌ Coupon generation failed:", err);
    res.status(500).json({ message: err.message });
  }
};


export const redeemCoupon = async (req, res) => {
  try {
    const { code, email } = req.body;
    const coupon = await Coupon.findOne({ code });
    if (!coupon) return res.status(400).json({ message: "Invalid coupon" });
    if (coupon.redeemed)
      return res.status(400).json({ message: "Coupon already redeemed" });

    coupon.redeemed = true;
    coupon.email = email;
    await coupon.save();

    await sendCouponEmail(email, code);
    res.json({ message: "Coupon redeemed successfully! Check your email." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find()
      .sort({ issuedAt: -1 })
      .populate("userId", "displayName");
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// ===== Get coupons for a specific user =====
export const getUserCoupons = async (req, res) => {
  try {
    const { userId } = req.params;
    const coupons = await Coupon.find({ userId })
      .sort({ issuedAt: -1 })
      .select("code redeemed issuedAt email");

    if (!coupons.length) {
      return res.status(404).json({ message: "No coupons found for this user." });
    }

    res.json(coupons);
  } catch (err) {
    console.error("❌ Error fetching user coupons:", err);
    res.status(500).json({ message: "Server error while fetching user coupons." });
  }
};


