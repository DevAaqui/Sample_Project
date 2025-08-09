const {
  Guest,
  WearableDevice,
  GuestMetric,
  RideSession,
  Ride,
} = require("../models");
const { Op } = require("sequelize");
const {
  formatTimeDuration,
  calculateHealthScore,
  calculateAge,
} = require("../utils/healthUtils/healthMetricFns");

// Get all guests
const getAllGuests = async (req, res) => {
  try {
    const { page = 1, limit = 10, gender, age_min, age_max } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (gender) whereClause.gender = gender;

    // Age filtering based on DOB
    if (age_min || age_max) {
      const today = new Date();
      if (age_min) {
        const maxDate = new Date(
          today.getFullYear() - age_min,
          today.getMonth(),
          today.getDate()
        );
        whereClause.dob = { [Op.lte]: maxDate };
      }
      if (age_max) {
        const minDate = new Date(
          today.getFullYear() - age_max - 1,
          today.getMonth(),
          today.getDate()
        );
        whereClause.dob = {
          ...whereClause.dob,
          [Op.gte]: minDate,
        };
      }
    }

    const guests = await Guest.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: WearableDevice,
          as: "wearableDevices",
          attributes: [
            "device_id",
            "device_type",
            "device_serial_number",
            "assigned_date",
          ],
        },
        {
          model: GuestMetric,
          as: "metrics",
          attributes: [
            "metric_id",
            "timestamp",
            "heart_rate",
            "blood_pressure",
            "steps",
            "calories_burned",
          ],
          order: [["timestamp", "DESC"]],
          limit: 1, // Get latest metric
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
};

// Get guest by ID
const getGuestById = async (req, res) => {
  try {
    const { id } = req.params;

    const guest = await Guest.findByPk(id, {
      include: [
        {
          model: WearableDevice,
          as: "wearableDevices",
          attributes: [
            "device_id",
            "device_type",
            "device_serial_number",
            "assigned_date",
          ],
        },
        {
          model: GuestMetric,
          as: "metrics",
          attributes: [
            "metric_id",
            "timestamp",
            "heart_rate",
            "blood_pressure",
            "steps",
            "calories_burned",
          ],
          order: [["timestamp", "DESC"]],
          limit: 10, // Get last 10 metrics
        },
        {
          model: RideSession,
          as: "rideSessions",
          attributes: [
            "session_id",
            "start_time",
            "end_time",
            "pre_ride_heart_rate",
            "post_ride_heart_rate",
            "calories_burned",
          ],
          order: [["start_time", "DESC"]],
          limit: 5, // Get last 5 ride sessions
        },
      ],
    });

    if (!guest) {
      return res.status(404).json({ error: "Guest not found" });
    }

    res.json({ guest });
  } catch (error) {
    console.error("Get guest error:", error);
    res.status(500).json({ error: "Failed to get guest" });
  }
};

// Create new guest
const createGuest = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      dob,
      gender,
      email,
      phone_number,
      emergency_contact_name,
      emergency_contact_phone,
      known_conditions,
      allergies,
      baseline_heart_rate,
      safe_hr_max,
      safe_hr_min,
      weight_kg,
      height_cm,
      preferred_units,
    } = req.body;

    const guest = await Guest.create({
      first_name,
      last_name,
      dob,
      gender,
      email,
      phone_number,
      emergency_contact_name,
      emergency_contact_phone,
      known_conditions,
      allergies,
      baseline_heart_rate,
      safe_hr_max,
      safe_hr_min,
      weight_kg,
      height_cm,
      preferred_units,
    });

    res.status(201).json({
      message: "Guest created successfully",
      guest,
    });
  } catch (error) {
    console.error("Create guest error:", error);
    res.status(500).json({ error: "Failed to create guest" });
  }
};

// Update guest
const updateGuest = async (req, res) => {
  try {
    const { id } = req.params;
    const guest = await Guest.findByPk(id);

    if (!guest) {
      return res.status(404).json({ error: "Guest not found" });
    }

    await guest.update(req.body);

    res.json({
      message: "Guest updated successfully",
      guest,
    });
  } catch (error) {
    console.error("Update guest error:", error);
    res.status(500).json({ error: "Failed to update guest" });
  }
};

// Delete guest
const deleteGuest = async (req, res) => {
  try {
    const { id } = req.params;
    const guest = await Guest.findByPk(id);

    if (!guest) {
      return res.status(404).json({ error: "Guest not found" });
    }

    await guest.destroy();

    res.json({ message: "Guest deleted successfully" });
  } catch (error) {
    console.error("Delete guest error:", error);
    res.status(500).json({ error: "Failed to delete guest" });
  }
};

// Get guest metrics
const getGuestMetrics = async (req, res) => {
  try {
    const { id } = req.params;
    const { start_date, end_date, limit = 100 } = req.query;

    const whereClause = { guest_id: id };

    if (start_date || end_date) {
      whereClause.timestamp = {};
      if (start_date) whereClause.timestamp[Op.gte] = new Date(start_date);
      if (end_date) whereClause.timestamp[Op.lte] = new Date(end_date);
    }

    const metrics = await GuestMetric.findAll({
      where: whereClause,
      order: [["timestamp", "DESC"]],
      limit: parseInt(limit),
    });

    res.json({ metrics });
  } catch (error) {
    console.error("Get guest metrics error:", error);
    res.status(500).json({ error: "Failed to get guest metrics" });
  }
};

// Add guest metric
const addGuestMetric = async (req, res) => {
  try {
    const { id } = req.params;
    const { timestamp, heart_rate, blood_pressure, steps, calories_burned } =
      req.body;

    const guest = await Guest.findByPk(id);
    if (!guest) {
      return res.status(404).json({ error: "Guest not found" });
    }

    const metric = await GuestMetric.create({
      guest_id: id,
      timestamp: timestamp || new Date(),
      heart_rate,
      blood_pressure,
      steps,
      calories_burned,
    });

    res.status(201).json({
      message: "Metric added successfully",
      metric,
    });
  } catch (error) {
    console.error("Add guest metric error:", error);
    res.status(500).json({ error: "Failed to add metric" });
  }
};

// Get latest guests with comprehensive data
const getLatestGuestsMetrics = async (req, res) => {
  try {
    // Get pagination parameters from query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const offset = (page - 1) * limit;
    console.log("query>>>>>", req.query);
    console.log("limit>>>>>", limit);
    console.log("offset>>>>>", offset);

    // Get total count for pagination
    const totalCount = await Guest.count();

    // Get all guests with their latest metrics and ride sessions
    const guests = await Guest.findAll({
      include: [
        {
          model: GuestMetric,
          as: "metrics",
          attributes: [
            "metric_id",
            "timestamp",
            "heart_rate",
            "blood_pressure",
            "steps",
            "calories_burned",
          ],
          order: [["timestamp", "DESC"]],
          limit: 1, // Get only the latest metric
        },
        {
          model: RideSession,
          as: "rideSessions",
          attributes: [
            "session_id",
            "start_time",
            "end_time",
            "calories_burned",
            "ride_id",
          ],
          order: [["start_time", "DESC"]],
          limit: 1, // Get only the latest ride session
          include: [
            {
              model: Ride,
              as: "ride",
              attributes: ["ride_name"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: limit,
      offset: offset,
    });

    // Process each guest to calculate required data
    const processedGuests = guests.map((guest) => {
      const latestMetric =
        guest.metrics && guest.metrics.length > 0 ? guest.metrics[0] : null;
      const latestRideSession =
        guest.rideSessions && guest.rideSessions.length > 0
          ? guest.rideSessions[0]
          : null;

      // Calculate age
      const age = calculateAge(guest.dob);

      // Calculate health score
      const healthScore = calculateHealthScore(guest, latestMetric);

      // Get last ride information
      const lastRide = latestRideSession?.ride?.ride_name || "No rides yet";

      // Calculate total time spent (sum of all ride sessions)
      const totalTimeSpent = guest.rideSessions.reduce((total, session) => {
        if (session.start_time && session.end_time) {
          const duration = Math.floor(
            (new Date(session.end_time) - new Date(session.start_time)) /
              (1000 * 60)
          ); // Convert to minutes
          return total + duration;
        }
        return total;
      }, 0);

      return {
        id: guest.guest_id,
        fullName: `${guest.first_name} ${guest.last_name}`,
        age: age,
        healthScore: healthScore,
        lastRide: lastRide, 
        totalTimeSpent: formatTimeDuration(totalTimeSpent),
        email: guest.email,
        gender: guest.gender,
        // Additional health data for debugging
        latestHeartRate: latestMetric?.heart_rate || null,
        latestBloodPressure: latestMetric?.blood_pressure || null,
        latestSteps: latestMetric?.steps || null,
        latestCalories: latestMetric?.calories_burned || null,
        safeHeartRateRange: `${guest.safe_hr_min || 60}-${
          guest.safe_hr_max || 100
        }`,
      }; 
    });

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.json({
      guests: processedGuests,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalCount: totalCount,
        limit: limit,
        hasNextPage: hasNextPage,
        hasPrevPage: hasPrevPage,
        nextPage: hasNextPage ? page + 1 : null,
        prevPage: hasPrevPage ? page - 1 : null,
      },
      message: "Latest guests data retrieved successfully",
    });
  } catch (error) {
    console.error("Get latest guests metrics error:", error);
    res.status(500).json({ error: "Failed to get latest guests metrics" });
  }
};

module.exports = {
  getAllGuests,
  getGuestById,
  createGuest,
  updateGuest,
  deleteGuest,
  getGuestMetrics,
  addGuestMetric,
  getLatestGuestsMetrics,
};
