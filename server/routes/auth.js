const express = require("express");
const { body, validationResult } = require("express-validator");
const { auth } = require("../middleware/auth");
const {
  login,
  register,
  getProfile,
  updateProfile,
  changePassword,
  logout,
} = require("../controllers/authController");

const router = express.Router();

// Login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Must be a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await login(req, res);
  }
);

// Register
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Must be a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("role")
      .optional()
      .isIn(["admin", "manager", "staff"])
      .withMessage("Role must be admin, manager, or staff"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await register(req, res);
  }
);

// Get profile
router.get("/profile", auth, getProfile);

// Update profile
router.put(
  "/profile",
  auth,
  [
    body("username").optional().notEmpty().withMessage("Username cannot be empty"),
    body("email").optional().isEmail().withMessage("Must be a valid email"),
    body("firstName").optional().notEmpty().withMessage("First name cannot be empty"),
    body("lastName").optional().notEmpty().withMessage("Last name cannot be empty"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await updateProfile(req, res);
  }
);

// Change password
router.put(
  "/change-password",
  auth,
  [
    body("currentPassword").notEmpty().withMessage("Current password is required"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await changePassword(req, res);
  }
);

// Logout
router.post("/logout", auth, logout);

module.exports = router;
