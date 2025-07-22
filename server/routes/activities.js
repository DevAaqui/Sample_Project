const express = require("express");
const { Activity } = require("../models");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const activities = await Activity.findAll();
    res.json({ activities });
  } catch (error) {
    res.status(500).json({ error: "Failed to get activities" });
  }
});

module.exports = router;
