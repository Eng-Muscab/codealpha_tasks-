import Users from "../models/Users.js";

// POST /api/users/register
export const registerUser = async (req, res) => {
  try {
    console.log("Register body:", req.body);
    const { username, full_name, password } = req.body;

    if (!username || !full_name || !password)
      return res.status(400).json({ message: "All fields required" });

    const existing = await Users.findOne({ username });
    if (existing) return res.status(400).json({ message: "Username exists" });

    const user = await Users.create({ username, full_name, password });
    res.status(201).json(user);
  } catch (err) {
    console.error("Register error:", err); // ← log the exact error
    res.status(500).json({ message: err.message });
  }
};

// POST /api/users/login
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username, password });
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found or wrong password" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
