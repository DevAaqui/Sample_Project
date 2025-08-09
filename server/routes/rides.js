const express = require("express");
const { body, validationResult } = require("express-validator");
const { auth, requireRole } = require("../middleware/auth");
const {
  getAllRides,
  getRideById,
  createRide,
  updateRide,
  deleteRide,
  getRideSessions,
  createRideSession,
  endRideSession,
  addRideMetric,
} = require("../controllers/rideController");

const router = express.Router();

// Get all rides
router.get("/", auth, getAllRides);

// Get ride by ID
router.get("/:id", auth, getRideById);

// Create new ride
router.post(
  "/",
  auth,
  requireRole(["admin", "manager"]),
  [
    body("ride_name").notEmpty().withMessage("Ride name is required"),
    body("ride_type")
      .optional()
      .notEmpty()
      .withMessage("Ride type cannot be empty"),
    body("min_height_cm")
      .optional()
      .isFloat({ min: 50, max: 250 })
      .withMessage("Minimum height must be between 50 and 250 cm"),
    body("max_heart_rate")
      .optional()
      .isInt({ min: 40, max: 200 })
      .withMessage("Maximum heart rate must be between 40 and 200"),
    body("g_force")
      .optional()
      .isFloat({ min: 0, max: 10 })
      .withMessage("G-force must be between 0 and 10"),
    body("duration_seconds")
      .optional()
      .isInt({ min: 10, max: 3600 })
      .withMessage("Duration must be between 10 and 3600 seconds"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await createRide(req, res);
  }
);

// Update ride
router.put(
  "/:id",
  auth,
  requireRole(["admin", "manager"]),
  [
    body("ride_name")
      .optional()
      .notEmpty()
      .withMessage("Ride name cannot be empty"),
    body("ride_type")
      .optional()
      .notEmpty()
      .withMessage("Ride type cannot be empty"),
    body("min_height_cm")
      .optional()
      .isFloat({ min: 50, max: 250 })
      .withMessage("Minimum height must be between 50 and 250 cm"),
    body("max_heart_rate")
      .optional()
      .isInt({ min: 40, max: 200 })
      .withMessage("Maximum heart rate must be between 40 and 200"),
    body("g_force")
      .optional()
      .isFloat({ min: 0, max: 10 })
      .withMessage("G-force must be between 0 and 10"),
    body("duration_seconds")
      .optional()
      .isInt({ min: 10, max: 3600 })
      .withMessage("Duration must be between 10 and 3600 seconds"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await updateRide(req, res);
  }
);

// Delete ride
router.delete("/:id", auth, requireRole(["admin"]), deleteRide);

// Get ride sessions
router.get("/:id/sessions", auth, getRideSessions);

// Create ride session
router.post(
  "/sessions",
  auth,
  [
    body("ride_id").isInt().withMessage("Ride ID is required"),
    body("guest_id").isInt().withMessage("Guest ID is required"),
    body("pre_ride_heart_rate")
      .optional()
      .isInt({ min: 40, max: 200 })
      .withMessage("Pre-ride heart rate must be between 40 and 200"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await createRideSession(req, res);
  }
);

// End ride session
router.put(
  "/sessions/:session_id/end",
  auth,
  [
    body("post_ride_heart_rate")
      .optional()
      .isInt({ min: 40, max: 200 })
      .withMessage("Post-ride heart rate must be between 40 and 200"),
    body("calories_burned")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Calories burned must be a positive number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await endRideSession(req, res);
  }
);

// Add ride metric
router.post(
  "/sessions/:session_id/metrics",
  auth,
  [
    body("heart_rate")
      .optional()
      .isInt({ min: 40, max: 200 })
      .withMessage("Heart rate must be between 40 and 200"),
    body("g_force")
      .optional()
      .isFloat({ min: 0, max: 10 })
      .withMessage("G-force must be between 0 and 10"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await addRideMetric(req, res);
  }
);

module.exports = router;
