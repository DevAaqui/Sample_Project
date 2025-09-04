const { Guest, GuestMetric, RideSession, RideMetric } = require("../models");
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

    // Get total calories from both guest_metrics and ride_metrics
    const [guestCalories, rideCalories] = await Promise.all([
      // Guest metrics calories
      GuestMetric.findOne({
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
      }),
      // Ride metrics calories
      RideMetric.findOne({
        attributes: [
          [
            RideMetric.sequelize.fn(
              "SUM",
              RideMetric.sequelize.col("calories_burned")
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
      }),
    ]);

    // Calculate combined total calories
    const totalCaloriesBurned =
      (parseInt(guestCalories?.dataValues?.totalCalories) || 0) +
      (parseInt(rideCalories?.dataValues?.totalCalories) || 0);

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
        ? (
            ((totalCaloriesBurned - yesterdayTotal) / yesterdayTotal) *
            100
          ).toFixed(0)
        : 0;

    return {
      title: "Total Calories Burned",
      current: totalCaloriesBurned,
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

/**
 * Get Activity Distribution
 * Returns the distribution of different activity types
 */
const getActivityDistribution = async () => {
  try {
    if (!GuestMetric) {
      throw new Error("GuestMetric model is not properly imported");
    }

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Get total activities count
    const totalActivities = await GuestMetric.count({
      where: {
        timestamp: {
          [Op.gte]: twentyFourHoursAgo,
        },
      },
    });

    // Get rides count (assuming rides have specific characteristics)
    const ridesCount = await GuestMetric.count({
      where: {
        timestamp: {
          [Op.gte]: twentyFourHoursAgo,
        },
        // You might need to adjust this based on your data structure
        // For now, assuming rides have higher heart rate or specific activity type
        heart_rate: {
          [Op.gt]: 100,
        },
      },
    });

    // Get rest periods count (low activity periods)
    const restCount = await GuestMetric.count({
      where: {
        timestamp: {
          [Op.gte]: twentyFourHoursAgo,
        },
        heart_rate: {
          [Op.lte]: 80,
        },
        steps: {
          [Op.lte]: 100,
        },
      },
    });

    // Get food & beverage count (assuming based on time patterns or specific metrics)
    const foodCount = await GuestMetric.count({
      where: {
        timestamp: {
          [Op.gte]: twentyFourHoursAgo,
        },
        // You might need to adjust this based on your data structure
        // For now, using a time-based approach (meal times)
        [Op.or]: [
          GuestMetric.sequelize.literal("HOUR(timestamp) BETWEEN 7 AND 9"),
          GuestMetric.sequelize.literal("HOUR(timestamp) BETWEEN 12 AND 14"),
          GuestMetric.sequelize.literal("HOUR(timestamp) BETWEEN 18 AND 20"),
        ],
      },
    });

    // Calculate percentages
    const ridesPercentage =
      totalActivities > 0
        ? Math.round((ridesCount / totalActivities) * 100)
        : 0;
    const restPercentage =
      totalActivities > 0 ? Math.round((restCount / totalActivities) * 100) : 0;
    const foodPercentage =
      totalActivities > 0 ? Math.round((foodCount / totalActivities) * 100) : 0;

    return {
      rides: {
        count: ridesCount,
        percentage: ridesPercentage,
        color: "blue",
      },
      restPeriods: {
        count: restCount,
        percentage: restPercentage,
        color: "green",
      },
      foodBeverage: {
        count: foodCount,
        percentage: foodPercentage,
        color: "yellow",
      },
      totalActivities: totalActivities,
    };
  } catch (error) {
    console.error("Error getting activity distribution:", error);
    throw error;
  }
};

/**
 * Get Peak Activity Hours
 * Returns the hours with highest activity levels
 */
const getPeakActivityHours = async () => {
  try {
    if (!GuestMetric) {
      throw new Error("GuestMetric model is not properly imported");
    }

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Get activity by hour with more detailed analysis
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
        [
          GuestMetric.sequelize.fn(
            "AVG",
            GuestMetric.sequelize.col("heart_rate")
          ),
          "avgHeartRate",
        ],
        [
          GuestMetric.sequelize.fn("SUM", GuestMetric.sequelize.col("steps")),
          "totalSteps",
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
      limit: 10, // Get top 10 hours
    });

    // Calculate activity levels and percentages
    const maxActivity = Math.max(
      ...activityByHour.map((h) => parseInt(h.dataValues.activityCount))
    );

    const peakHours = activityByHour.map((hour) => {
      const hourData = hour.dataValues;
      const activityCount = parseInt(hourData.activityCount);
      const percentage =
        maxActivity > 0 ? Math.round((activityCount / maxActivity) * 100) : 0;

      // Determine activity level based on percentage
      let activityLevel = "Low";
      if (percentage >= 80) activityLevel = "Very High";
      else if (percentage >= 60) activityLevel = "High";
      else if (percentage >= 40) activityLevel = "Medium";

      // Format hour to 12-hour format
      const hour24 = parseInt(hourData.hour);
      const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
      const ampm = hour24 >= 12 ? "PM" : "AM";
      const formattedHour = `${hour12}:00 ${ampm}`;

      return {
        hour: formattedHour,
        activity: activityLevel,
        percentage: percentage,
        count: activityCount,
        avgHeartRate: Math.round(hourData.avgHeartRate || 0),
        totalSteps: hourData.totalSteps || 0,
      };
    });

    return peakHours;
  } catch (error) {
    console.error("Error getting peak activity hours:", error);
    throw error;
  }
};

/**
 * Get Enhanced Activity Tracking Dashboard
 * Returns comprehensive data including distribution and peak hours
 */
const getEnhancedActivityDashboard = async () => {
  try {
    const [activityDistribution, peakHours] = await Promise.all([
      getActivityDistribution(),
      getPeakActivityHours(),
    ]);

    return {
      activityDistribution,
      peakActivityHours: peakHours,
    };
  } catch (error) {
    console.error("Error getting enhanced activity dashboard:", error);
    throw error;
  }
};

module.exports = {
  getActiveSessionsCount,
  getTotalCaloriesBurned,
  getPeakActivityTime,
  getHealthAlertsCount,
  getActivityTrackingDashboard,
  getActivityDistribution,
  getPeakActivityHours,
  getEnhancedActivityDashboard,
};
