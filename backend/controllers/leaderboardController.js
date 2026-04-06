import Score from "../models/Score.js";


export const getTopScores = async (req, res) => {
  try {
    const topScores = await Score.find()
      .sort({ score: -1 })
      .limit(20)
      .populate("userId", "displayName")
      .lean(); // Convert to plain JS objects (safer for filtering)

    // ✅ Filter out scores where userId is null (user deleted)
    const filteredScores = topScores.filter((entry) => entry.userId !== null);

    res.json(filteredScores);
  } catch (err) {
    console.error("❌ Leaderboard fetch error:", err);
    res.status(500).json({ message: "Error fetching leaderboard." });
  }
};
