require("dotenv").config();
const {
  Guest,
  WearableDevice,
  GuestMetric,
  RideSession,
  Ride,
  RideMetric,
} = require("../models");
const { Op } = require("sequelize");
const {
  formatTimeDuration,
  calculateHealthScore,
  calculateAge,
  calculateStressLevel,
  determineHealthStatus,
  calculateTemperature,
  getHeartRateColor,
  getStressLevelColor,
  getHealthStatusColor,
  calculateSummaryStats,
  calculateEnhancedHealthScore,
  calculateComprehensiveHealthMetrics,
  calculateComprehensiveRideMetrics,
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

    // Get all guests with their metrics, ride sessions, and wearable device
    const guests = await Guest.findAll({
      include: [
        {
          model: GuestMetric,
          as: "metrics",
          attributes: [
            "metric_id",
            "timestamp",
            "heart_rate",
            "blood_pressure_systolic",
            "blood_pressure_diastolic",
            "steps",
            "calories_burned",
            "stress_level",
            "activity_level",
          ],
          order: [["timestamp", "DESC"]],
          // Remove limit to get all metrics for calculations
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
            "pre_ride_heart_rate",
            "post_ride_heart_rate",
            // Remove max_heart_rate and avg_heart_rate as they don't exist in RideSession
          ],
          order: [["start_time", "DESC"]],
          // Remove limit to get all ride sessions for calculations
          include: [
            {
              model: Ride,
              as: "ride",
              attributes: ["ride_name"],
            },
            {
              model: RideMetric,
              as: "rideMetrics",
              attributes: [
                "heart_rate",
                "g_force",
                "steps",
                "calories_burned",
                "blood_pressure_systolic",
                "blood_pressure_diastolic",
                "timestamp",
              ],
              order: [["timestamp", "ASC"]], // Order by timestamp to track progression
            },
          ],
        },
        {
          model: WearableDevice,
          as: "wearableDevice",
          attributes: [
            "device_id",
            "device_type",
            "device_serial_number",
            "is_active",
            "device_status",
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: limit,
      offset: offset,
    });

    // Process each guest to calculate comprehensive health metrics
    const processedGuests = guests.map((guest) => {
      const metrics = guest.metrics || [];
      const rideSessions = guest.rideSessions || [];
      const wearableDevice = guest.wearableDevice;

      // Calculate comprehensive health metrics from guest metrics
      const healthMetrics = calculateComprehensiveHealthMetrics(metrics);

      // Calculate comprehensive ride metrics
      const rideMetrics = calculateComprehensiveRideMetrics(rideSessions);

      // Calculate age
      const age = calculateAge(guest.dob);

      // Calculate enhanced health score using comprehensive metrics
      const healthScore = calculateEnhancedHealthScore(
        guest,
        healthMetrics,
        rideMetrics
      );

      // Get last ride information
      const lastRide =
        rideSessions.length > 0
          ? rideSessions[0]?.ride?.ride_name
          : "No rides yet";

      // Calculate total time spent (sum of all ride sessions)
      const totalTimeSpent = rideSessions.reduce((total, session) => {
        if (session.start_time && session.end_time) {
          const duration = Math.floor(
            (new Date(session.end_time) - new Date(session.start_time)) /
              (1000 * 60)
          ); // Convert to minutes
          return total + duration;
        }
        return total;
      }, 0);

      // Calculate total calories burned from all ride sessions
      const totalCaloriesBurned = rideSessions.reduce((total, session) => {
        return total + (session?.calories_burned || 0);
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

        // Device information
        deviceId: guest.device_id,
        deviceType: wearableDevice?.device_type || "No device",
        deviceStatus: wearableDevice?.device_status || "Unknown",
        deviceActive: wearableDevice?.is_active || false,
        deviceAssignedDate: guest.device_assigned_date,

        // Comprehensive Health Metrics
        healthMetrics: healthMetrics,

        // Comprehensive Ride Metrics
        rideMetrics: rideMetrics,

        // Heart rate safety range
        safeHeartRateRange: `${guest.safe_hr_min || 60}-${
          guest.safe_hr_max || 100
        }`,

        // Ride session summary
        totalRideSessions: rideSessions.length,
        totalCaloriesBurned: totalCaloriesBurned,

        // Additional guest data
        weight: guest.weight_kg,
        height: guest.height_cm,
        preferredUnits: guest.preferred_units,
        knownConditions: guest.known_conditions,
        allergies: guest.allergies,
        baselineHeartRate: guest.baseline_heart_rate,
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

const getLatestHealthMetrics = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const offset = (page - 1) * limit;

    const totalCount = await Guest.count();
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

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
      ],
      order: [["createdAt", "DESC"]],
      limit: limit,
      offset: offset,
    });

    // Process guests to include calculated health data
    const processedGuests = guests.map((guest) => {
      const latestMetric =
        guest.metrics && guest.metrics.length > 0 ? guest.metrics[0] : null;

      // Calculate age
      const age = calculateAge(guest.dob);

      // Calculate health score based on metrics
      const healthScore = calculateHealthScore(guest, latestMetric);

      // Determine stress level based on heart rate and other factors
      const stressLevel = calculateStressLevel(latestMetric);

      // Determine overall health status
      const healthStatus = determineHealthStatus(healthScore, latestMetric);

      // Calculate temperature (simulated based on health score and stress)
      const temperature = calculateTemperature(healthScore, stressLevel);

      // Format blood pressure
      const bloodPressure = latestMetric?.blood_pressure || "N/A";

      // Format heart rate with color coding
      const heartRate = latestMetric?.heart_rate || 0;
      const heartRateColor = getHeartRateColor(heartRate);

      return {
        id: guest.guest_id,
        initials: `${guest.first_name.charAt(0)}${guest.last_name.charAt(0)}`,
        fullName: `${guest.first_name} ${guest.last_name}`,
        age: age,
        heartRate: {
          value: heartRate,
          color: heartRateColor,
          unit: "bpm",
        },
        bloodPressure: bloodPressure,
        temperature: temperature,
        stressLevel: {
          value: stressLevel,
          color: getStressLevelColor(stressLevel),
        },
        healthStatus: {
          value: healthStatus,
          color: getHealthStatusColor(healthStatus),
        },
        lastCheck: latestMetric?.createdAt || guest.createdAt,
        // Include raw metric data for additional processing
        rawMetrics: latestMetric,
      };
    });

    // Calculate summary statistics
    const summaryStats = calculateSummaryStats(processedGuests);

    res.json({
      guests: processedGuests,
      summaryStats: summaryStats,
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
    });
  } catch (error) {
    console.error("Get latest health metrics error:", error);
    res.status(500).json({ error: "Failed to get latest health metrics" });
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
  getLatestHealthMetrics,
};
