import Score from "../models/Score.js";
import User from "../models/User.js";

export const saveScore = async (req, res) => {
  const { userId, game, score } = req.body;
  try {
    await Score.create({ userId, game, score });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const current = user.scores?.[game] || 0;
    if (score > current) {
      user.scores[game] = score;
      await user.save();
    }
    res.json({ message: "Score saved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserScores = async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// ====== CLEANUP ROUTE: Keep only highest score per user per game ======
export const cleanupScores = async (req, res) => {
  try {
    const allScores = await Score.find().sort({ score: -1 }); // highest first
    const seen = new Set();
    let deletedCount = 0;

    for (const s of allScores) {
      const key = `${s.userId}_${s.game}`; // one best per user per game
      if (seen.has(key)) {
        await Score.deleteOne({ _id: s._id }); // delete duplicates
        deletedCount++;
      } else {
        seen.add(key);
      }
    }

    res.json({
      message: `✅ Cleanup completed. Removed ${deletedCount} duplicates. Kept only top score per user per game.`,
      kept: seen.size,
    });
  } catch (err) {
    console.error("❌ Score cleanup error:", err);
    res.status(500).json({ message: "Error during score cleanup." });
  }
};

