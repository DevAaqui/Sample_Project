const express = require("express");
const { SafetyReport } = require("../models");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const reports = await SafetyReport.findAll();
    res.json({ reports });
  } catch (error) {
    res.status(500).json({ error: "Failed to get safety reports" });
  }
});

module.exports = router;
