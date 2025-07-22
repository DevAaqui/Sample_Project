const express = require("express");
const { HealthMetric } = require("../models");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const metrics = await HealthMetric.findAll();
    res.json({ metrics });
  } catch (error) {
    res.status(500).json({ error: "Failed to get health metrics" });
  }
});

module.exports = router;
