import express from "express";
import {
  generateCoupon,
  redeemCoupon,
  listCoupons,
  getUserCoupons,
} from "../controllers/couponController.js";

const router = express.Router();

router.post("/generate", generateCoupon);
router.post("/redeem", redeemCoupon);
router.get("/", listCoupons);
router.get("/user/:userId", getUserCoupons); // ✅ NEW

export default router;
