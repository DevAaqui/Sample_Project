const express = require("express");
const router = express.Router();
const activityTrackController = require("../controllers/activityTrackController");
// const { authenticateToken } = require("../middleware/auth");

// Dashboard route (no auth required)
router.get("/dashboard", activityTrackController.getActivityTrackingDashboard);

router.get("/enhanced-dashboard", activityTrackController.getEnhancedActivityDashboard);

// Individual metric routes (auth required)
// router.get(
//   "/active-sessions",
//   authenticateToken,
//   activityTrackController.getActiveSessionsCount
// );
// router.get(
//   "/calories-burned",
//   authenticateToken,
//   activityTrackController.getTotalCaloriesBurned
// );
// router.get(
//   "/peak-activity-time",
//   authenticateToken,
//   activityTrackController.getPeakActivityTime
// );
// router.get(
//   "/health-alerts",
//   authenticateToken,
//   activityTrackController.getHealthAlertsCount
// );

// // Additional routes
// router.get(
//   "/guest/:guestId",
//   authenticateToken,
//   activityTrackController.getGuestActivityTracking
// );
// router.get(
//   "/realtime",
//   authenticateToken,
//   activityTrackController.getRealTimeActivityTracking
// );
// router.post(
//   "/refresh",
//   authenticateToken,
//   activityTrackController.refreshActivityTrackingData
// );
// router.get(
//   "/statistics",
//   authenticateToken,
//   activityTrackController.getActivityTrackingStatistics
// );

module.exports = router;
