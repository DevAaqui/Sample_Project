const {
  Ride,
  RideSession,
  RideMetric,
  Guest,
  WearableDevice,
} = require("../models");
const { Op } = require("sequelize");

// Generate realistic ride metrics based on ride type and time into ride
const generateRideMetrics = (
  guestId,
  deviceId,
  sessionId,
  ride,
  timeIntoRide,
  totalDuration
) => {
  const progress = timeIntoRide / totalDuration; // 0 to 1
  const isThrillRide =
    ride.ride_type === "Roller Coaster" || ride.ride_type === "Thrill Ride";

  // Base heart rate varies by ride type and time
  let baseHeartRate = 70;
  if (isThrillRide) {
    baseHeartRate = 80 + Math.floor(progress * 60); // 80-140 BPM for thrill rides
  } else {
    baseHeartRate = 70 + Math.floor(progress * 30); // 70-100 BPM for family rides
  }

  // Add some randomness
  const heartRate = baseHeartRate + Math.floor(Math.random() * 20) - 10;

  // G-force calculation (higher for thrill rides)
  let gForce = 1.0; // Normal gravity
  if (isThrillRide) {
    if (progress < 0.3) gForce = 1.0 + progress * 2; // Building up
    else if (progress < 0.7)
      gForce = 2.5 + Math.random() * 1.5; // Peak excitement
    else gForce = 1.5 + Math.random() * 1.0; // Winding down
  }

  // Steps and calories based on ride duration and type
  const steps = Math.floor((totalDuration / 60) * (isThrillRide ? 15 : 8)); // Steps per minute
  const caloriesBurned = Math.floor(
    (totalDuration / 60) * (isThrillRide ? 8 : 4)
  ); // Calories per minute

  // Blood pressure varies with excitement
  const bloodPressureSystolic =
    110 + Math.floor(progress * 30) + Math.floor(Math.random() * 20) - 10;
  const bloodPressureDiastolic =
    70 + Math.floor(progress * 15) + Math.floor(Math.random() * 15) - 7;

  return {
    session_id: sessionId,
    guest_id: guestId,
    device_id: deviceId,
    timestamp: new Date(),
    heart_rate: Math.max(60, Math.min(200, heartRate)), // Clamp between 60-200
    g_force: parseFloat(gForce.toFixed(2)),
    steps: steps,
    calories_burned: caloriesBurned,
    blood_pressure_systolic: Math.max(90, Math.min(160, bloodPressureSystolic)),
    blood_pressure_diastolic: Math.max(
      60,
      Math.min(100, bloodPressureDiastolic)
    ),
  };
};

// Create a ride session and generate metrics throughout the ride
const createRideSessionWithMetrics = async (guest, ride, startTime) => {
  try {
    const rideDuration = ride.duration_seconds;
    const endTime = new Date(startTime.getTime() + rideDuration * 1000);

    // Calculate metric interval (every 10th of the ride duration)
    const metricInterval = Math.max(1, Math.floor(rideDuration / 10)); // Minimum 1 second

    console.log(
      `   🎢 Creating ride session for ${guest.first_name} ${guest.last_name}`
    );
    console.log(`      Ride: ${ride.ride_name} (${ride.ride_type})`);
    console.log(`      Duration: ${rideDuration} seconds`);
    console.log(`      Start: ${startTime.toLocaleTimeString()}`);
    console.log(`      End: ${endTime.toLocaleTimeString()}`);
    console.log(`      Metric interval: ${metricInterval} seconds`);

    // Generate pre-ride heart rate (baseline before excitement)
    const preRideHeartRate = 65 + Math.floor(Math.random() * 20); // 65-85 BPM baseline

    // Initialize post-ride heart rate (will be updated later)
    let postRideHeartRate = preRideHeartRate; // Default to pre-ride value

    // Create ride session with pre-ride data
    const rideSession = await RideSession.create({
      ride_id: ride.ride_id,
      guest_id: guest.guest_id,
      start_time: startTime,
      end_time: endTime,
      status: "completed",
      total_duration: rideDuration,
      pre_ride_heart_rate: preRideHeartRate,
      post_ride_heart_rate: postRideHeartRate, // Will be updated after ride
      max_heart_rate: 0,
      avg_heart_rate: 0,
      total_calories_burned: 0,
    });

    console.log(
      `      ✅ Ride session created (ID: ${rideSession.session_id})`
    );
    console.log(`      💓 Pre-ride heart rate: ${preRideHeartRate} BPM`);

    // Generate metrics throughout the ride duration
    const metrics = [];
    let currentTime = new Date(startTime);

    while (currentTime <= endTime) {
      const timeIntoRide = (currentTime.getTime() - startTime.getTime()) / 1000;

      const metric = generateRideMetrics(
        guest.guest_id,
        guest.device_id,
        rideSession.session_id,
        ride,
        timeIntoRide,
        rideDuration
      );

      metric.timestamp = new Date(currentTime);
      metrics.push(metric);

      // Move to next interval
      currentTime = new Date(currentTime.getTime() + metricInterval * 1000);
    }

    // Bulk create all metrics
    if (metrics.length > 0) {
      await RideMetric.bulkCreate(metrics);
      console.log(`      📊 Created ${metrics.length} ride metrics`);

      // Calculate post-ride and aggregated data
      const maxHeartRate = Math.max(...metrics.map((m) => m.heart_rate));
      const avgHeartRate = Math.floor(
        metrics.reduce((sum, m) => sum + m.heart_rate, 0) / metrics.length
      );
      const totalCalories = metrics.reduce(
        (sum, m) => sum + m.calories_burned,
        0
      );

      // Generate post-ride heart rate (elevated after excitement)
      postRideHeartRate = Math.max(
        preRideHeartRate + 20,
        avgHeartRate + Math.floor(Math.random() * 15)
      ); // Elevated but realistic

      // Update session with all calculated data
      await rideSession.update({
        post_ride_heart_rate: postRideHeartRate,
        max_heart_rate: maxHeartRate,
        avg_heart_rate: avgHeartRate,
        total_calories_burned: totalCalories,
      });

      console.log(`      📈 Session updated:`);
      console.log(`          Pre-ride HR: ${preRideHeartRate} BPM`);
      console.log(`         💓 Post-ride HR: ${postRideHeartRate} BPM`);
      console.log(`          Max HR: ${maxHeartRate} BPM`);
      console.log(`          Avg HR: ${avgHeartRate} BPM`);
      console.log(`          Total Calories: ${totalCalories}`);

      // Calculate heart rate change
      const hrChange = postRideHeartRate - preRideHeartRate;
      const hrChangeText = hrChange > 0 ? `+${hrChange}` : `${hrChange}`;
      console.log(`         📊 HR Change: ${hrChangeText} BPM`);
    }

    return {
      sessionId: rideSession.session_id,
      metricsCreated: metrics.length,
      duration: rideDuration,
      interval: metricInterval,
      preRideHR: preRideHeartRate,
      postRideHR: postRideHeartRate, // Now always defined
    };
  } catch (error) {
    console.error(
      `   ❌ Error creating ride session for ${guest.first_name} ${guest.last_name}:`,
      error
    );
    throw error;
  }
};

// Main function to seed ride sessions and metrics
const seedRideSessionsAndMetrics = async (maxSessions = 50) => {
  try {
    console.log("🎢 Starting Ride Sessions and Metrics Seeding");
    console.log(`📊 Target: ${maxSessions} ride sessions`);

    // Get all available rides
    const rides = await Ride.findAll({
      // where: { is_active: true }, // Commented out - column doesn't exist yet
      order: [["ride_id", "ASC"]],
    });

    if (rides.length === 0) {
      console.log("❌ No rides found in the database!");
      return [];
    }

    console.log(`✅ Found ${rides.length} rides`);

    // Get all guests with devices
    const guests = await Guest.findAll({
      where: {
        device_id: { [Op.ne]: null },
      },
      attributes: ["guest_id", "first_name", "last_name", "device_id"],
      order: [["guest_id", "ASC"]],
    });

    if (guests.length === 0) {
      console.log("❌ No guests with devices found!");
      return [];
    }

    console.log(`✅ Found ${guests.length} guests with devices`);

    // Generate ride sessions throughout the day
    const today = new Date();
    const dayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      9,
      0,
      0
    ); // 9 AM
    const dayEnd = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      22,
      0,
      0
    ); // 10 PM

    const results = [];
    let sessionsCreated = 0;

    // Create ride sessions randomly throughout the day
    for (let i = 0; i < maxSessions && sessionsCreated < maxSessions; i++) {
      // Random guest and ride
      const guest = guests[Math.floor(Math.random() * guests.length)];
      const ride = rides[Math.floor(Math.random() * rides.length)];

      // Random start time during park hours
      const randomTime =
        dayStart.getTime() +
        Math.random() * (dayEnd.getTime() - dayStart.getTime());
      const startTime = new Date(randomTime);

      // Check if this guest is already on a ride at this time
      const conflictingSession = await RideSession.findOne({
        where: {
          guest_id: guest.guest_id,
          start_time: { [Op.lte]: startTime },
          end_time: { [Op.gte]: startTime },
        },
      });

      if (conflictingSession) {
        console.log(
          `   ⚠️  Guest ${guest.first_name} ${
            guest.last_name
          } already on ride at ${startTime.toLocaleTimeString()}`
        );
        continue;
      }

      try {
        const result = await createRideSessionWithMetrics(
          guest,
          ride,
          startTime
        );
        results.push({
          guestName: `${guest.first_name} ${guest.last_name}`,
          rideName: ride.ride_name,
          sessionId: result.sessionId,
          metricsCreated: result.metricsCreated,
          duration: result.duration,
          interval: result.interval,
          preRideHR: result.preRideHR,
          postRideHR: result.postRideHR,
        });

        sessionsCreated++;

        // Show progress
        const progress = ((sessionsCreated / maxSessions) * 100).toFixed(1);
        console.log(
          `   📈 Progress: ${progress}% (${sessionsCreated}/${maxSessions} sessions created)`
        );
      } catch (error) {
        console.error(`   ❌ Failed to create ride session:`, error);
      }
    }

    console.log("\n🎉 Ride sessions and metrics seeding completed!");
    console.log(`📊 Summary:`);
    console.log(`   Total sessions created: ${sessionsCreated}`);
    console.log(
      `   Total metrics created: ${results.reduce(
        (sum, r) => sum + r.metricsCreated,
        0
      )}`
    );
    console.log(
      `   Average metrics per session: ${(
        results.reduce((sum, r) => sum + r.metricsCreated, 0) / sessionsCreated
      ).toFixed(1)}`
    );

    // Show sample of created sessions
    if (results.length > 0) {
      console.log(`\n📋 Sample of created ride sessions:`);
      results.slice(0, 5).forEach((result, index) => {
        console.log(
          `   ${index + 1}. ${result.guestName} - ${result.rideName} - ${
            result.metricsCreated
          } metrics`
        );
      });
      if (results.length > 5) {
        console.log(`   ... and ${results.length - 5} more`);
      }
    }

    return results;
  } catch (error) {
    console.error("❌ Error during ride sessions seeding:", error);
    throw error;
  }
};

// Function to clear existing ride data
const clearRideData = async () => {
  try {
    console.log("🗑️  Clearing existing ride sessions and metrics...");

    const deletedMetrics = await RideMetric.destroy({ where: {} });
    const deletedSessions = await RideSession.destroy({ where: {} });

    console.log(
      `✅ Cleared ${deletedMetrics} ride metrics and ${deletedSessions} ride sessions`
    );
    return { metrics: deletedMetrics, sessions: deletedSessions };
  } catch (error) {
    console.error("❌ Error clearing ride data:", error);
    throw error;
  }
};

// Export functions
module.exports = {
  seedRideSessionsAndMetrics,
  clearRideData,
};

// If this script is run directly
if (require.main === module) {
  const maxSessions = process.argv[2] ? parseInt(process.argv[2]) : 50;

  // Connect to database and run seeding
  const { sequelize } = require("../models");

  sequelize
    .authenticate()
    .then(async () => {
      console.log("✅ Database connected successfully.");

      // Clear existing data if --force flag is used
      if (process.argv.includes("--force")) {
        console.log(
          "\n⚠️  Force flag detected - will clear existing ride data"
        );
        await clearRideData();
      }

      // Run ride sessions seeding
      return seedRideSessionsAndMetrics(maxSessions);
    })
    .then((results) => {
      console.log(
        "\n🎉 Ride sessions and metrics seeding finished successfully!"
      );
      console.log(`📊 Created ${results.length} ride sessions`);
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Ride sessions seeding failed:", error);
      process.exit(1);
    });
}
