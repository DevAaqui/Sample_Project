const express = require("express");
const { MaintenanceRecord } = require("../models");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const records = await MaintenanceRecord.findAll();
    res.json({ records });
  } catch (error) {
    res.status(500).json({ error: "Failed to get maintenance records" });
  }
});

module.exports = router;
