const express = require("express");
const { Ride, User, Vehicle } = require("../models");
const { auth } = require("../middleware/auth");

const router = express.Router();

// Get all rides
router.get("/", auth, async (req, res) => {
  try {
    const rides = await Ride.findAll({
      include: [
        {
          model: User,
          as: "passenger",
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: User,
          as: "driver",
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: Vehicle,
          as: "vehicle",
          attributes: ["id", "vehicleNumber", "make", "model"],
        },
      ],
    });
    res.json({ rides });
  } catch (error) {
    res.status(500).json({ error: "Failed to get rides" });
  }
});

// Create new ride
router.post("/", auth, async (req, res) => {
  try {
    const ride = await Ride.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json({ ride });
  } catch (error) {
    res.status(500).json({ error: "Failed to create ride" });
  }
});

module.exports = router;
