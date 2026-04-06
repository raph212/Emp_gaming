import User from "../models/User.js";

export const registerUser = async (req, res) => {
  const { displayName, password, email } = req.body;
  try {
    const existing = await User.findOne({ displayName });
    if (existing) return res.status(400).json({ message: "User exists" });

    const newUser = await User.create({ displayName, password, email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { displayName, password } = req.body;
  try {
    const user = await User.findOne({ displayName });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.password !== password)
      return res.status(401).json({ message: "Invalid password" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
