const express = require("express");
const { body, validationResult } = require("express-validator");
const { Guest, User } = require("../models");
const { auth, requireRole } = require("../middleware/auth");

const router = express.Router();

// Get all guests
router.get("/", auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, hostId } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (status) whereClause.status = status;
    if (hostId) whereClause.hostId = hostId;

    // Regular users can only see guests they're hosting
    if (req.user.role !== "admin" && req.user.role !== "manager") {
      whereClause.hostId = req.user.id;
    }

    const guests = await Guest.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: "host",
          attributes: ["id", "firstName", "lastName", "email"],
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

    res.json({
      guests: guests.rows,
      total: guests.count,
      page: parseInt(page),
      totalPages: Math.ceil(guests.count / limit),
    });
  } catch (error) {
    console.error("Get guests error:", error);
    res.status(500).json({ error: "Failed to get guests" });
  }
});

// Get guest by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const guest = await Guest.findByPk(id, {
      include: [
        {
          model: User,
          as: "host",
          attributes: ["id", "firstName", "lastName", "email"],
        },
      ],
    });

    if (!guest) {
      return res.status(404).json({ error: "Guest not found" });
    }

    // Check permissions
    if (
      req.user.role !== "admin" &&
      req.user.role !== "manager" &&
      guest.hostId !== req.user.id
    ) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json({ guest });
  } catch (error) {
    console.error("Get guest error:", error);
    res.status(500).json({ error: "Failed to get guest" });
  }
});

// Create new guest
router.post(
  "/",
  auth,
  [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("email").optional().isEmail().withMessage("Must be a valid email"),
    body("phoneNumber")
      .optional()
      .isMobilePhone()
      .withMessage("Invalid phone number"),
    body("company")
      .optional()
      .notEmpty()
      .withMessage("Company cannot be empty"),
    body("purpose")
      .optional()
      .notEmpty()
      .withMessage("Purpose cannot be empty"),
    body("accessLevel")
      .optional()
      .isIn(["restricted", "limited", "full"])
      .withMessage("Invalid access level"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        company,
        purpose,
        accessLevel,
        notes,
      } = req.body;

      // Generate unique badge number
      const badgeNumber = `G${Date.now()}${Math.floor(Math.random() * 1000)}`;

      const guest = await Guest.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        company,
        purpose,
        hostId: req.user.id,
        accessLevel: accessLevel || "restricted",
        notes,
        badgeNumber,
      });

      res.status(201).json({
        message: "Guest created successfully",
        guest,
      });
    } catch (error) {
      console.error("Create guest error:", error);
      res.status(500).json({ error: "Failed to create guest" });
    }
  }
);

// Update guest
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
    body("email").optional().isEmail().withMessage("Must be a valid email"),
    body("phoneNumber")
      .optional()
      .isMobilePhone()
      .withMessage("Invalid phone number"),
    body("accessLevel")
      .optional()
      .isIn(["restricted", "limited", "full"])
      .withMessage("Invalid access level"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        company,
        purpose,
        accessLevel,
        notes,
      } = req.body;

      const guest = await Guest.findByPk(id);
      if (!guest) {
        return res.status(404).json({ error: "Guest not found" });
      }

      // Check permissions
      if (
        req.user.role !== "admin" &&
        req.user.role !== "manager" &&
        guest.hostId !== req.user.id
      ) {
        return res.status(403).json({ error: "Access denied" });
      }

      const updateData = {};
      if (firstName) updateData.firstName = firstName;
      if (lastName) updateData.lastName = lastName;
      if (email) updateData.email = email;
      if (phoneNumber) updateData.phoneNumber = phoneNumber;
      if (company) updateData.company = company;
      if (purpose) updateData.purpose = purpose;
      if (accessLevel) updateData.accessLevel = accessLevel;
      if (notes) updateData.notes = notes;

      await guest.update(updateData);

      res.json({
        message: "Guest updated successfully",
        guest,
      });
    } catch (error) {
      console.error("Update guest error:", error);
      res.status(500).json({ error: "Failed to update guest" });
    }
  }
);

// Check in guest
router.post("/:id/checkin", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const guest = await Guest.findByPk(id);
    if (!guest) {
      return res.status(404).json({ error: "Guest not found" });
    }

    // Check permissions
    if (
      req.user.role !== "admin" &&
      req.user.role !== "manager" &&
      guest.hostId !== req.user.id
    ) {
      return res.status(403).json({ error: "Access denied" });
    }

    if (guest.status === "checked_in") {
      return res.status(400).json({ error: "Guest is already checked in" });
    }

    await guest.update({
      status: "checked_in",
      checkInTime: new Date(),
    });

    res.json({
      message: "Guest checked in successfully",
      guest,
    });
  } catch (error) {
    console.error("Check in guest error:", error);
    res.status(500).json({ error: "Failed to check in guest" });
  }
});

// Check out guest
router.post("/:id/checkout", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const guest = await Guest.findByPk(id);
    if (!guest) {
      return res.status(404).json({ error: "Guest not found" });
    }

    // Check permissions
    if (
      req.user.role !== "admin" &&
      req.user.role !== "manager" &&
      guest.hostId !== req.user.id
    ) {
      return res.status(403).json({ error: "Access denied" });
    }

    if (guest.status !== "checked_in") {
      return res.status(400).json({ error: "Guest is not checked in" });
    }

    await guest.update({
      status: "checked_out",
      checkOutTime: new Date(),
    });

    res.json({
      message: "Guest checked out successfully",
      guest,
    });
  } catch (error) {
    console.error("Check out guest error:", error);
    res.status(500).json({ error: "Failed to check out guest" });
  }
});

// Delete guest
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const guest = await Guest.findByPk(id);
    if (!guest) {
      return res.status(404).json({ error: "Guest not found" });
    }

    // Check permissions
    if (
      req.user.role !== "admin" &&
      req.user.role !== "manager" &&
      guest.hostId !== req.user.id
    ) {
      return res.status(403).json({ error: "Access denied" });
    }

    await guest.destroy();

    res.json({ message: "Guest deleted successfully" });
  } catch (error) {
    console.error("Delete guest error:", error);
    res.status(500).json({ error: "Failed to delete guest" });
  }
});

module.exports = router;
