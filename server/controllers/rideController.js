const { Ride, RideSession, RideMetric, Guest } = require("../models");
const { Op } = require("sequelize");

// Get all rides
const getAllRides = async (req, res) => {
  try {
    const { page = 1, limit = 10, ride_type } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (ride_type) whereClause.ride_type = ride_type;

    const rides = await Ride.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: RideSession,
          as: "rideSessions",
          attributes: ["session_id", "start_time", "end_time"],
          order: [["start_time", "DESC"]],
          limit: 5, // Get last 5 sessions
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["ride_name", "ASC"]],
    });

    res.json({
      rides: rides.rows,
      total: rides.count,
      page: parseInt(page),
      totalPages: Math.ceil(rides.count / limit),
    });
  } catch (error) {
    console.error("Get rides error:", error);
    res.status(500).json({ error: "Failed to get rides" });
  }
};

// Get ride by ID
const getRideById = async (req, res) => {
  try {
    const { id } = req.params;

    const ride = await Ride.findByPk(id, {
      include: [
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
          limit: 10, // Get last 10 sessions
        },
      ],
    });

    if (!ride) {
      return res.status(404).json({ error: "Ride not found" });
    }

    res.json({ ride });
  } catch (error) {
    console.error("Get ride error:", error);
    res.status(500).json({ error: "Failed to get ride" });
  }
};

// Create new ride
const createRide = async (req, res) => {
  try {
    const {
      ride_name,
      ride_type,
      min_height_cm,
      max_heart_rate,
      g_force,
      duration_seconds,
    } = req.body;

    const ride = await Ride.create({
      ride_name,
      ride_type,
      min_height_cm,
      max_heart_rate,
      g_force,
      duration_seconds,
    });

    res.status(201).json({
      message: "Ride created successfully",
      ride,
    });
  } catch (error) {
    console.error("Create ride error:", error);
    res.status(500).json({ error: "Failed to create ride" });
  }
};

// Update ride
const updateRide = async (req, res) => {
  try {
    const { id } = req.params;
    const ride = await Ride.findByPk(id);

    if (!ride) {
      return res.status(404).json({ error: "Ride not found" });
    }

    await ride.update(req.body);

    res.json({
      message: "Ride updated successfully",
      ride,
    });
  } catch (error) {
    console.error("Update ride error:", error);
    res.status(500).json({ error: "Failed to update ride" });
  }
};

// Delete ride
const deleteRide = async (req, res) => {
  try {
    const { id } = req.params;
    const ride = await Ride.findByPk(id);

    if (!ride) {
      return res.status(404).json({ error: "Ride not found" });
    }

    await ride.destroy();

    res.json({ message: "Ride deleted successfully" });
  } catch (error) {
    console.error("Delete ride error:", error);
    res.status(500).json({ error: "Failed to delete ride" });
  }
};

// Get ride sessions
const getRideSessions = async (req, res) => {
  try {
    const { id } = req.params;
    const { start_date, end_date, limit = 50 } = req.query;

    const whereClause = { ride_id: id };

    if (start_date || end_date) {
      whereClause.start_time = {};
      if (start_date) whereClause.start_time[Op.gte] = new Date(start_date);
      if (end_date) whereClause.start_time[Op.lte] = new Date(end_date);
    }

    const sessions = await RideSession.findAll({
      where: whereClause,
      include: [
        {
          model: Guest,
          as: "guest",
          attributes: ["guest_id", "first_name", "last_name"],
        },
      ],
      order: [["start_time", "DESC"]],
      limit: parseInt(limit),
    });

    res.json({ sessions });
  } catch (error) {
    console.error("Get ride sessions error:", error);
    res.status(500).json({ error: "Failed to get ride sessions" });
  }
};

// Create ride session
const createRideSession = async (req, res) => {
  try {
    const { ride_id, guest_id, start_time, pre_ride_heart_rate } = req.body;

    const session = await RideSession.create({
      ride_id,
      guest_id,
      start_time: start_time || new Date(),
      pre_ride_heart_rate,
    });

    res.status(201).json({
      message: "Ride session created successfully",
      session,
    });
  } catch (error) {
    console.error("Create ride session error:", error);
    res.status(500).json({ error: "Failed to create ride session" });
  }
};

// End ride session
const endRideSession = async (req, res) => {
  try {
    const { session_id } = req.params;
    const { end_time, post_ride_heart_rate, calories_burned } = req.body;

    const session = await RideSession.findByPk(session_id);
    if (!session) {
      return res.status(404).json({ error: "Ride session not found" });
    }

    await session.update({
      end_time: end_time || new Date(),
      post_ride_heart_rate,
      calories_burned,
    });

    res.json({
      message: "Ride session ended successfully",
      session,
    });
  } catch (error) {
    console.error("End ride session error:", error);
    res.status(500).json({ error: "Failed to end ride session" });
  }
};

// Add ride metric
const addRideMetric = async (req, res) => {
  try {
    const { session_id } = req.params;
    const { timestamp, heart_rate, g_force } = req.body;

    const session = await RideSession.findByPk(session_id);
    if (!session) {
      return res.status(404).json({ error: "Ride session not found" });
    }

    const metric = await RideMetric.create({
      session_id,
      timestamp: timestamp || new Date(),
      heart_rate,
      g_force,
    });

    res.status(201).json({
      message: "Ride metric added successfully",
      metric,
    });
  } catch (error) {
    console.error("Add ride metric error:", error);
    res.status(500).json({ error: "Failed to add ride metric" });
  }
};

module.exports = {
  getAllRides,
  getRideById,
  createRide,
  updateRide,
  deleteRide,
  getRideSessions,
  createRideSession,
  endRideSession,
  addRideMetric,
};
