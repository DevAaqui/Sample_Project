const express = require("express");
const { Alert } = require("../models");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const alerts = await Alert.findAll();
    res.json({ alerts });
  } catch (error) {
    res.status(500).json({ error: "Failed to get alerts" });
  }
});

module.exports = router;
