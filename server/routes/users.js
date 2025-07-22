const express = require("express");
const { body, validationResult } = require("express-validator");
const { User } = require("../models");
const { auth, requireRole } = require("../middleware/auth");

const router = express.Router();

// Get all users (admin/manager only)
router.get("/", auth, requireRole(["admin", "manager"]), async (req, res) => {
  try {
    const { page = 1, limit = 10, role, isActive } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (role) whereClause.role = role;
    if (isActive !== undefined) whereClause.isActive = isActive === "true";

    const users = await User.findAndCountAll({
      where: whereClause,
      attributes: { exclude: ["password"] },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

    res.json({
      users: users.rows,
      total: users.count,
      page: parseInt(page),
      totalPages: Math.ceil(users.count / limit),
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "Failed to get users" });
  }
});

// Get user by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Users can only view their own profile unless they're admin/manager
    if (
      req.user.role !== "admin" &&
      req.user.role !== "manager" &&
      req.user.id !== parseInt(id)
    ) {
      return res.status(403).json({ error: "Access denied" });
    }

    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Failed to get user" });
  }
});

// Create new user (admin only)
router.post(
  "/",
  auth,
  requireRole(["admin"]),
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters"),
    body("email").isEmail().withMessage("Must be a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("role")
      .isIn(["admin", "manager", "staff", "guest"])
      .withMessage("Invalid role"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        username,
        email,
        password,
        firstName,
        lastName,
        role,
        phoneNumber,
      } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({
        where: {
          [require("sequelize").Op.or]: [{ email }, { username }],
        },
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ error: "User with this email or username already exists" });
      }

      // Hash password
      const bcrypt = require("bcryptjs");
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role,
        phoneNumber,
      });

      res.status(201).json({
        message: "User created successfully",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          phoneNumber: user.phoneNumber,
          isActive: user.isActive,
        },
      });
    } catch (error) {
      console.error("Create user error:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  }
);

// Update user (admin/manager or self)
router.put(
  "/:id",
  auth,
  [
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
    body("role")
      .optional()
      .isIn(["admin", "manager", "staff", "guest"])
      .withMessage("Invalid role"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const { firstName, lastName, phoneNumber, role, isActive } = req.body;

      // Check permissions
      if (
        req.user.role !== "admin" &&
        req.user.role !== "manager" &&
        req.user.id !== parseInt(id)
      ) {
        return res.status(403).json({ error: "Access denied" });
      }

      // Only admins can change roles and active status
      if ((role || isActive !== undefined) && req.user.role !== "admin") {
        return res
          .status(403)
          .json({ error: "Only admins can modify roles and active status" });
      }

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const updateData = {};
      if (firstName) updateData.firstName = firstName;
      if (lastName) updateData.lastName = lastName;
      if (phoneNumber) updateData.phoneNumber = phoneNumber;
      if (role) updateData.role = role;
      if (isActive !== undefined) updateData.isActive = isActive;

      await user.update(updateData);

      res.json({
        message: "User updated successfully",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          phoneNumber: user.phoneNumber,
          isActive: user.isActive,
        },
      });
    } catch (error) {
      console.error("Update user error:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  }
);

// Delete user (admin only)
router.delete("/:id", auth, requireRole(["admin"]), async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent self-deletion
    if (req.user.id === parseInt(id)) {
      return res.status(400).json({ error: "Cannot delete your own account" });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;
