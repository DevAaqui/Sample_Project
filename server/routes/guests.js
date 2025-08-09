const express = require("express");
const { body, validationResult } = require("express-validator");
const { auth, requireRole } = require("../middleware/auth");
const {
  getAllGuests,
  getGuestById,
  createGuest,
  updateGuest,
  deleteGuest,
  getGuestMetrics,
  addGuestMetric,
  getLatestGuestsMetrics,
} = require("../controllers/guestController");

const router = express.Router();

// Get all guests
router.get("/", auth, getAllGuests);

// Get guest by ID
router.get("/:id", auth, getGuestById);

// Create new guest
router.post(
  "/",
  auth,
  [
    body("first_name").notEmpty().withMessage("First name is required"),
    body("last_name").notEmpty().withMessage("Last name is required"),
    body("email").optional().isEmail().withMessage("Must be a valid email"),
    body("phone_number")
      .optional()
      .isMobilePhone()
      .withMessage("Invalid phone number"),
    body("dob").optional().isDate().withMessage("Must be a valid date"),
    body("gender")
      .optional()
      .isIn(["Male", "Female", "Other"])
      .withMessage("Gender must be Male, Female, or Other"),
    body("emergency_contact_phone")
      .optional()
      .isMobilePhone()
      .withMessage("Invalid emergency contact phone number"),
    body("baseline_heart_rate")
      .optional()
      .isInt({ min: 40, max: 200 })
      .withMessage("Baseline heart rate must be between 40 and 200"),
    body("safe_hr_max")
      .optional()
      .isInt({ min: 40, max: 200 })
      .withMessage("Safe heart rate max must be between 40 and 200"),
    body("safe_hr_min")
      .optional()
      .isInt({ min: 40, max: 200 })
      .withMessage("Safe heart rate min must be between 40 and 200"),
    body("weight_kg")
      .optional()
      .isFloat({ min: 10, max: 300 })
      .withMessage("Weight must be between 10 and 300 kg"),
    body("height_cm")
      .optional()
      .isFloat({ min: 50, max: 250 })
      .withMessage("Height must be between 50 and 250 cm"),
    body("preferred_units")
      .optional()
      .isIn(["metric", "imperial"])
      .withMessage("Preferred units must be metric or imperial"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await createGuest(req, res);
  }
);

// Update guest
router.put(
  "/:id",
  auth,
  [
    body("first_name")
      .optional()
      .notEmpty()
      .withMessage("First name cannot be empty"),
    body("last_name")
      .optional()
      .notEmpty()
      .withMessage("Last name cannot be empty"),
    body("email").optional().isEmail().withMessage("Must be a valid email"),
    body("phone_number")
      .optional()
      .isMobilePhone()
      .withMessage("Invalid phone number"),
    body("dob").optional().isDate().withMessage("Must be a valid date"),
    body("gender")
      .optional()
      .isIn(["Male", "Female", "Other"])
      .withMessage("Gender must be Male, Female, or Other"),
    body("emergency_contact_phone")
      .optional()
      .isMobilePhone()
      .withMessage("Invalid emergency contact phone number"),
    body("baseline_heart_rate")
      .optional()
      .isInt({ min: 40, max: 200 })
      .withMessage("Baseline heart rate must be between 40 and 200"),
    body("safe_hr_max")
      .optional()
      .isInt({ min: 40, max: 200 })
      .withMessage("Safe heart rate max must be between 40 and 200"),
    body("safe_hr_min")
      .optional()
      .isInt({ min: 40, max: 200 })
      .withMessage("Safe heart rate min must be between 40 and 200"),
    body("weight_kg")
      .optional()
      .isFloat({ min: 10, max: 300 })
      .withMessage("Weight must be between 10 and 300 kg"),
    body("height_cm")
      .optional()
      .isFloat({ min: 50, max: 250 })
      .withMessage("Height must be between 50 and 250 cm"),
    body("preferred_units")
      .optional()
      .isIn(["metric", "imperial"])
      .withMessage("Preferred units must be metric or imperial"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await updateGuest(req, res);
  }
);

// Delete guest
router.delete("/:id", auth, requireRole(["admin", "manager"]), deleteGuest);

// Get guest metrics
router.get("/:id/metrics", auth, getGuestMetrics);

// Add guest metric
router.post("/:id/metrics", auth, addGuestMetric);

// router.get("/metrics/latest", auth, getLatestGuestsMetrics);

router.get("/metrics/latest", getLatestGuestsMetrics);


module.exports = router;
