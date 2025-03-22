const express = require("express");
const User = require("../Model/User");
const router = express.Router();

router.post("/signIn", async (req, res) => {
  try {
    const { userName, passWord } = req.body;

    // Use await to resolve the promise
    const findUser = await User.findOne({ Name: userName });

    if (findUser) {
      if (findUser.Password === passWord) {
        return res.json({ message: "success" }); // Fixed typo
      } else {
        return res.json({ message: "PasswordNull" });
      }
    } else {
      return res.json({ message: "userNameNull" });
    }
  } catch (error) {
    console.error("Sign-in error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});
router.post("/signUp", async (req, res) => {
  try {
    const { userName, passWord } = req.body;
    // Check if the username already exists
    const existingUser = await User.findOne({ Name: userName });
    if (existingUser) {
      return res.json({ message: "userNameExists" });
    }
    const newUser = await User({ Name: userName, Password: passWord });
    await newUser.save();

    return res.json({ message: "success" });
  } catch (error) {
    console.error("Sign-up error:", error);
    return res.status(500).json({ message: "serverError" });
  }
});
router.post("/getUserData", async (req, res) => {
  try {
    const { userName } = req.body;

    if (!userName) {
      return res
        .status(400)
        .json({ success: false, message: "Username is required" });
    }

    const user = await User.findOne({ Name: userName });
    if (user) {
      return res.json({
        success: true,
        user,
      });
    } else {
      return res.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
