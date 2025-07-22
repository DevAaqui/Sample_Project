const express = require("express");
const { Vehicle, User } = require("../models");
const { auth } = require("../middleware/auth");

const router = express.Router();

// Get all vehicles
router.get("/", auth, async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({
      include: [
        {
          model: User,
          as: "assignedDriver",
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });
    res.json({ vehicles });
  } catch (error) {
    res.status(500).json({ error: "Failed to get vehicles" });
  }
});

// Create new vehicle
router.post("/", auth, async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json({ vehicle });
  } catch (error) {
    res.status(500).json({ error: "Failed to create vehicle" });
  }
});

module.exports = router;
