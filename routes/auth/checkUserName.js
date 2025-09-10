
import express from 'express';
import User from '../../models/User';

const router = express.Router();

router.get('/check-username', async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({
        message: "username is required"
      })
    }

    const existingUsername = await User.findOne({ username: username.toLowerCase() })

    if (existingUsername) {
      return res.json({ available: false })
    } else {
      return res.json({ available: true })
    }
  } catch (error) {
    console.log("Cannot match username: ", error);
    res.status(500).json({ message: "Error checking username", available: false })

  }
});
export default router;
