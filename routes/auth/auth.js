import express from 'express'
import User from "../../models/User.js"

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, fullName, uid, email } = req.body;
    console.log(req.body);

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, fullName, uid, email });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("There was an error while signing up user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
