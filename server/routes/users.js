const express = require("express");
const { body, validationResult } = require("express-validator");
const { auth, requireRole } = require("../middleware/auth");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getCurrentUser,
  updateCurrentUser,
  changeUserStatus,
} = require("../controllers/userController");

const router = express.Router();

// Get all users (admin only)
router.get("/", auth, requireRole(["admin"]), getAllUsers);

// Get user by ID (admin only)
router.get("/:id", auth, requireRole(["admin"]), getUserById);

// Create new user (admin only)
router.post(
  "/",
  auth,
  requireRole(["admin"]),
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
    body("phoneNumber")
      .optional()
      .isMobilePhone()
      .withMessage("Invalid phone number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await createUser(req, res);
  }
);

// Update user (admin only)
router.put(
  "/:id",
  auth,
  requireRole(["admin"]),
  [
    body("username")
      .optional()
      .notEmpty()
      .withMessage("Username cannot be empty"),
    body("email").optional().isEmail().withMessage("Must be a valid email"),
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("firstName")
      .optional()
      .notEmpty()
      .withMessage("First name cannot be empty"),
    body("lastName")
      .optional()
      .notEmpty()
      .withMessage("Last name cannot be empty"),
    body("role")
      .optional()
      .isIn(["admin", "manager", "staff"])
      .withMessage("Role must be admin, manager, or staff"),
    body("phoneNumber")
      .optional()
      .isMobilePhone()
      .withMessage("Invalid phone number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await updateUser(req, res);
  }
);

// Delete user (admin only)
router.delete("/:id", auth, requireRole(["admin"]), deleteUser);

// Get current user profile
router.get("/profile/me", auth, getCurrentUser);

// Update current user profile
router.put(
  "/profile/me",
  auth,
  [
    body("username")
      .optional()
      .notEmpty()
      .withMessage("Username cannot be empty"),
    body("email").optional().isEmail().withMessage("Must be a valid email"),
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("firstName")
      .optional()
      .notEmpty()
      .withMessage("First name cannot be empty"),
    body("lastName")
      .optional()
      .notEmpty()
      .withMessage("Last name cannot be empty"),
    body("phoneNumber")
      .optional()
      .isMobilePhone()
      .withMessage("Invalid phone number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await updateCurrentUser(req, res);
  }
);

// Change user status (admin only)
router.patch(
  "/:id/status",
  auth,
  requireRole(["admin"]),
  [body("isActive").isBoolean().withMessage("isActive must be a boolean")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await changeUserStatus(req, res);
  }
);

module.exports = router;
