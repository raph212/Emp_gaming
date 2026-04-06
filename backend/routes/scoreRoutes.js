import express from "express";
import { saveScore, getUserScores ,cleanupScores } from "../controllers/scoreController.js";
const router = express.Router();
router.post("/", saveScore);
router.get("/:userId", getUserScores);
router.delete("/cleanup", cleanupScores);
export default router;
