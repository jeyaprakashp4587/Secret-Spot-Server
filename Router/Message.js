const express = require("express");
const User = require("../Model/User");
const router = express.Router();
const Secret = require("../Model/SecretMsg");

router.post("/postMessage", async (req, res) => {
  const { message, latitude, longitude, messageSender } = req.body;
  console.log(message, latitude, longitude, messageSender);

  if (!message || latitude === undefined || longitude === undefined) {
    return res.status(400).json({
      success: false,
      message: "Message, latitude, and longitude are required.",
    });
  }
  try {
    const newSecret = await Secret({
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      message,
      messageSender,
    });
    await newSecret.save();
    return res.status(200).json({
      success: true,
      message: "Secret message created successfully! 🎉 ",
    });
  } catch (error) {
    console.error("Error creating secret:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.post("/find-secret", async (req, res) => {
  const { latitude, longitude } = req.body;
  console.log(latitude, longitude);
  if (!latitude || !longitude) {
    return res.status(400).json({
      success: false,
      message: "Latitude and longitude are required.",
    });
  }
  try {
    const secrets = await Secret.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 50,
        },
      },
    });
    console.log(secrets);

    if (secrets.length > 0) {
      return res.status(200).json({
        success: true,
        message: "🎉 Secret message found!",
        secrets,
      });
    } else if (secrets.length == 0) {
      return res.status(404).json({
        success: false,
        message: "No secret message found nearby!",
      });
    }
  } catch (error) {
    console.error("Error finding secret:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
