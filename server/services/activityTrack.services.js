const { Guest, GuestMetric, RideSession } = require("../models");
const { Op } = require("sequelize");

/**
 * Get Active Sessions Count
 * Returns the count of currently active guest sessions
 */
const getActiveSessionsCount = async () => {
  try {
    // Check if GuestMetric is properly imported
    if (!GuestMetric) {
      throw new Error("GuestMetric model is not imported");
    }

    // Get sessions that are currently active (within last 24 hours)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Get unique guests with recent activity
    const activeSessions = await GuestMetric.findAll({
      attributes: [
        "guest_id",
        [
          GuestMetric.sequelize.fn(
            "MAX",
            GuestMetric.sequelize.col("timestamp")
          ),
          "lastActivity",
        ],
      ],
      where: {
        timestamp: {
          [Op.gte]: twentyFourHoursAgo,
        },
      },
      group: ["guest_id"],
      having: GuestMetric.sequelize.literal(
        "lastActivity >= :twentyFourHoursAgo"
      ),
      replacements: { twentyFourHoursAgo },
    });

    const activeCount = activeSessions.length;

    // Calculate percentage change from yesterday
    const yesterday = new Date(Date.now() - 48 * 60 * 60 * 1000);
    const dayBeforeYesterday = new Date(Date.now() - 72 * 60 * 60 * 1000);

    const yesterdaySessions = await GuestMetric.findAll({
      attributes: [
        "guest_id",
        [
          GuestMetric.sequelize.fn(
            "MAX",
            GuestMetric.sequelize.col("timestamp")
          ),
          "lastActivity",
        ],
      ],
      where: {
        timestamp: {
          [Op.gte]: dayBeforeYesterday,
          [Op.lt]: yesterday,
        },
      },
      group: ["guest_id"],
    });

    const yesterdayCount = yesterdaySessions.length;
    const percentageChange =
      yesterdayCount > 0
        ? (((activeCount - yesterdayCount) / yesterdayCount) * 100).toFixed(0)
        : 0;

    return {
      title: "Active Sessions",
      current: activeCount,
      percentageChange: percentageChange,
      trend: percentageChange >= 0 ? "positive" : "negative",
    };
  } catch (error) {
    console.error("Error getting active sessions count:", error);
    throw error;
  }
};

/**
 * Get Total Calories Burned
 * Returns the total calories burned by all guests in the last 24 hours
 */
const getTotalCaloriesBurned = async () => {
  try {
    if (!GuestMetric) {
      throw new Error("GuestMetric model is not properly imported");
    }

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Get total calories using Sequelize aggregation
    const totalCalories = await GuestMetric.findOne({
      attributes: [
        [
          GuestMetric.sequelize.fn(
            "SUM",
            GuestMetric.sequelize.col("calories_burned")
          ),
          "totalCalories",
        ],
      ],
      where: {
        timestamp: {
          [Op.gte]: twentyFourHoursAgo,
        },
        calories_burned: {
          [Op.ne]: null,
        },
      },
    });

    const currentCalories =
      parseInt(totalCalories?.dataValues?.totalCalories) || 0;

    // Calculate percentage change from yesterday
    const yesterday = new Date(Date.now() - 48 * 60 * 60 * 1000);
    const dayBeforeYesterday = new Date(Date.now() - 72 * 60 * 60 * 1000);

    const yesterdayCalories = await GuestMetric.findOne({
      attributes: [
        [
          GuestMetric.sequelize.fn(
            "SUM",
            GuestMetric.sequelize.col("calories_burned")
          ),
          "totalCalories",
        ],
      ],
      where: {
        timestamp: {
          [Op.gte]: dayBeforeYesterday,
          [Op.lt]: yesterday,
        },
        calories_burned: {
          [Op.ne]: null,
        },
      },
    });

    const yesterdayTotal =
      parseInt(yesterdayCalories?.dataValues?.totalCalories) || 0;
    const percentageChange =
      yesterdayTotal > 0
        ? (((currentCalories - yesterdayTotal) / yesterdayTotal) * 100).toFixed(
            0
          )
        : 0;

    return {
      title: "Total Calories Burned",
      current: currentCalories,
      percentageChange: percentageChange,
      trend: percentageChange >= 0 ? "positive" : "negative",
    };
  } catch (error) {
    console.error("Error getting total calories burned:", error);
    throw error;
  }
};

/**
 * Get Peak Activity Time
 * Returns the time period with highest activity in the last 24 hours
 */
const getPeakActivityTime = async () => {
  try {
    if (!GuestMetric) {
      throw new Error("GuestMetric model is not properly imported");
    }

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Get activity by hour using Sequelize
    const activityByHour = await GuestMetric.findAll({
      attributes: [
        [
          GuestMetric.sequelize.fn(
            "HOUR",
            GuestMetric.sequelize.col("timestamp")
          ),
          "hour",
        ],
        [
          GuestMetric.sequelize.fn("COUNT", GuestMetric.sequelize.col("*")),
          "activityCount",
        ],
      ],
      where: {
        timestamp: {
          [Op.gte]: twentyFourHoursAgo,
        },
      },
      group: [
        GuestMetric.sequelize.fn(
          "HOUR",
          GuestMetric.sequelize.col("timestamp")
        ),
      ],
      order: [
        [
          GuestMetric.sequelize.fn("COUNT", GuestMetric.sequelize.col("*")),
          "DESC",
        ],
      ],
      limit: 1,
    });

    const peakHour = activityByHour[0]?.dataValues?.hour || 12; // Default to noon if no data
    const peakTime = `${peakHour}:00 ${peakHour >= 12 ? "PM" : "AM"}`;

    // Calculate percentage change from yesterday
    const yesterday = new Date(Date.now() - 48 * 60 * 60 * 1000);
    const dayBeforeYesterday = new Date(Date.now() - 72 * 60 * 60 * 1000);

    const yesterdayPeak = await GuestMetric.findAll({
      attributes: [
        [
          GuestMetric.sequelize.fn(
            "HOUR",
            GuestMetric.sequelize.col("timestamp")
          ),
          "hour",
        ],
        [
          GuestMetric.sequelize.fn("COUNT", GuestMetric.sequelize.col("*")),
          "activityCount",
        ],
      ],
      where: {
        timestamp: {
          [Op.gte]: dayBeforeYesterday,
          [Op.lt]: yesterday,
        },
      },
      group: [
        GuestMetric.sequelize.fn(
          "HOUR",
          GuestMetric.sequelize.col("timestamp")
        ),
      ],
      order: [
        [
          GuestMetric.sequelize.fn("COUNT", GuestMetric.sequelize.col("*")),
          "DESC",
        ],
      ],
      limit: 1,
    });

    const yesterdayPeakHour = yesterdayPeak[0]?.dataValues?.hour || peakHour;
    const percentageChange = yesterdayPeakHour !== peakHour ? -2 : 0; // Simplified calculation

    return {
      title: "Peak Activity Time",
      current: peakTime,
      percentageChange: percentageChange.toString(),
      trend: percentageChange >= 0 ? "positive" : "negative",
    };
  } catch (error) {
    console.error("Error getting peak activity time:", error);
    throw error;
  }
};

/**
 * Get Health Alerts Count
 * Returns the count of active health alerts
 */
const getHealthAlertsCount = async () => {
  try {
    if (!GuestMetric) {
      throw new Error("GuestMetric model is not properly imported");
    }

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Get health alerts using Sequelize with includes
    const healthAlerts = await GuestMetric.findAll({
      include: [
        {
          model: Guest,
          as: "guest",
          attributes: ["guest_id", "first_name", "last_name"],
        },
      ],
      where: {
        timestamp: {
          [Op.gte]: twentyFourHoursAgo,
        },
        [Op.or]: [
          { heart_rate: { [Op.gt]: 100 } }, // High heart rate
          { heart_rate: { [Op.lt]: 60 } }, // Low heart rate
          GuestMetric.sequelize.literal(
            "TIMESTAMPDIFF(MINUTE, timestamp, NOW()) > 30"
          ), // No activity for 30 minutes
        ],
      },
    });

    const currentAlerts = healthAlerts.length;

    // Calculate percentage change from yesterday
    const yesterday = new Date(Date.now() - 48 * 60 * 60 * 1000);
    const dayBeforeYesterday = new Date(Date.now() - 72 * 60 * 60 * 1000);

    const yesterdayAlerts = await GuestMetric.findAll({
      include: [
        {
          model: Guest,
          as: "guest",
          attributes: ["guest_id", "first_name", "last_name"],
        },
      ],
      where: {
        timestamp: {
          [Op.gte]: dayBeforeYesterday,
          [Op.lt]: yesterday,
        },
        [Op.or]: [
          { heart_rate: { [Op.gt]: 100 } },
          { heart_rate: { [Op.lt]: 60 } },
          GuestMetric.sequelize.literal(
            "TIMESTAMPDIFF(MINUTE, timestamp, NOW()) > 30"
          ),
        ],
      },
    });

    const yesterdayCount = yesterdayAlerts.length;
    const percentageChange =
      yesterdayCount > 0
        ? (((currentAlerts - yesterdayCount) / yesterdayCount) * 100).toFixed(0)
        : 0;

    return {
      title: "Health Alerts",
      current: currentAlerts,
      percentageChange: percentageChange,
      trend: percentageChange <= 0 ? "positive" : "negative", // Fewer alerts is better
    };
  } catch (error) {
    console.error("Error getting health alerts count:", error);
    throw error;
  }
};

/**
 * Get All Activity Tracking Dashboard Data
 * Returns data for all four cards in one call
 */
const getActivityTrackingDashboard = async () => {
  try {
    const [activeSessions, caloriesBurned, peakTime, healthAlerts] =
      await Promise.all([
        getActiveSessionsCount(),
        getTotalCaloriesBurned(),
        getPeakActivityTime(),
        getHealthAlertsCount(),
      ]);

    return [activeSessions, caloriesBurned, peakTime, healthAlerts];
  } catch (error) {
    console.error("Error getting activity tracking dashboard:", error);
    throw error;
  }
};

module.exports = {
  getActiveSessionsCount,
  getTotalCaloriesBurned,
  getPeakActivityTime,
  getHealthAlertsCount,
  getActivityTrackingDashboard,
};
