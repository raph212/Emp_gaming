import express from "express";
import { getTopScores } from "../controllers/leaderboardController.js";
const router = express.Router();
router.get("/", getTopScores);
export default router;
