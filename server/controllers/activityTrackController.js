const activityTrackServices = require("../services/activityTrack.services");

/**
 * Get Activity Tracking Dashboard
 * @route GET /api/activity-track/dashboard
 * @access Public (no authentication required)
 */
const getActivityTrackingDashboard = async (req, res) => {
  try {
    const dashboardData =
      await activityTrackServices.getActivityTrackingDashboard();

    res.status(200).json({
      success: true,
      data: dashboardData,
      message: "Activity tracking dashboard data retrieved successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Controller Error - getActivityTrackingDashboard:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch activity tracking dashboard data",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Get Active Sessions Count
 * @route GET /api/activity-track/active-sessions
 * @access Private
 */
const getActiveSessionsCount = async (req, res) => {
  try {
    const activeSessions = await activityTrackServices.getActiveSessionsCount();

    res.status(200).json({
      success: true,
      data: activeSessions,
      message: "Active sessions data retrieved successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Controller Error - getActiveSessionsCount:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch active sessions data",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Get Total Calories Burned
 * @route GET /api/activity-track/calories-burned
 * @access Private
 */
const getTotalCaloriesBurned = async (req, res) => {
  try {
    const caloriesData = await activityTrackServices.getTotalCaloriesBurned();

    res.status(200).json({
      success: true,
      data: caloriesData,
      message: "Calories burned data retrieved successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Controller Error - getTotalCaloriesBurned:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch calories burned data",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Get Peak Activity Time
 * @route GET /api/activity-track/peak-activity-time
 * @access Private
 */
const getPeakActivityTime = async (req, res) => {
  try {
    const peakTimeData = await activityTrackServices.getPeakActivityTime();

    res.status(200).json({
      success: true,
      data: peakTimeData,
      message: "Peak activity time data retrieved successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Controller Error - getPeakActivityTime:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch peak activity time data",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Get Health Alerts Count
 * @route GET /api/activity-track/health-alerts
 * @access Private
 */
const getHealthAlertsCount = async (req, res) => {
  try {
    const healthAlerts = await activityTrackServices.getHealthAlertsCount();

    res.status(200).json({
      success: true,
      data: healthAlerts,
      message: "Health alerts data retrieved successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Controller Error - getHealthAlertsCount:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch health alerts data",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Get Activity Tracking Data for Specific Guest
 * @route GET /api/activity-track/guest/:guestId
 * @access Private
 */
const getGuestActivityTracking = async (req, res) => {
  try {
    const { guestId } = req.params;
    const { startDate, endDate, timeRange } = req.query;

    // Validate guestId
    if (!guestId) {
      return res.status(400).json({
        success: false,
        message: "Guest ID is required",
        timestamp: new Date().toISOString(),
      });
    }

    // For now, return a placeholder response
    // You can implement individual guest tracking logic later
    res.status(200).json({
      success: true,
      data: {
        guestId,
        message:
          "Individual guest activity tracking endpoint - implementation pending",
        requestedParams: { startDate, endDate, timeRange },
      },
      message: "Guest activity tracking endpoint accessed successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Controller Error - getGuestActivityTracking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch guest activity tracking data",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Get Real-time Activity Tracking Updates
 * @route GET /api/activity-track/realtime
 * @access Private
 */
const getRealTimeActivityTracking = async (req, res) => {
  try {
    const realtimeData =
      await activityTrackServices.getActivityTrackingDashboard();

    res.status(200).json({
      success: true,
      data: realtimeData,
      message: "Real-time activity tracking data retrieved successfully",
      timestamp: new Date().toISOString(),
      isRealTime: true,
    });
  } catch (error) {
    console.error("Controller Error - getRealTimeActivityTracking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch real-time activity tracking data",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Manually Refresh Activity Tracking Data
 * @route POST /api/activity-track/refresh
 * @access Private
 */
const refreshActivityTrackingData = async (req, res) => {
  try {
    // Force refresh of all activity tracking data
    const refreshedData =
      await activityTrackServices.getActivityTrackingDashboard();

    res.status(200).json({
      success: true,
      data: refreshedData,
      message: "Activity tracking data refreshed successfully",
      refreshedAt: new Date().toISOString(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Controller Error - refreshActivityTrackingData:", error);
    res.status(500).json({
      success: false,
      message: "Failed to refresh activity tracking data",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Get Activity Tracking Statistics
 * @route GET /api/activity-track/statistics
 * @access Private
 */
const getActivityTrackingStatistics = async (req, res) => {
  try {
    const { timeRange = "24h" } = req.query;

    // Get all dashboard data
    const dashboardData =
      await activityTrackServices.getActivityTrackingDashboard();

    // Calculate additional statistics
    const statistics = {
      ...dashboardData,
      timeRange,
      totalGuests: dashboardData.activeSessions.current,
      averageCaloriesPerGuest:
        dashboardData.caloriesBurned.current > 0 &&
        dashboardData.activeSessions.current > 0
          ? Math.round(
              dashboardData.caloriesBurned.current /
                dashboardData.activeSessions.current
            )
          : 0,
      alertRate:
        dashboardData.activeSessions.current > 0
          ? (
              (dashboardData.healthAlerts.current /
                dashboardData.activeSessions.current) *
              100
            ).toFixed(1)
          : 0,
    };

    res.status(200).json({
      success: true,
      data: statistics,
      message: "Activity tracking statistics retrieved successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Controller Error - getActivityTrackingStatistics:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch activity tracking statistics",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

module.exports = {
  getActivityTrackingDashboard,
  getActiveSessionsCount,
  getTotalCaloriesBurned,
  getPeakActivityTime,
  getHealthAlertsCount,
  getGuestActivityTracking,
  getRealTimeActivityTracking,
  refreshActivityTrackingData,
  getActivityTrackingStatistics,
};
