
import User from "../models/User.js"



export const register = async (req, res) => {
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
};



export const checkUsername = async (req, res) => {
  try {
    console.log("This was hit");
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
};




