const { Guest, GuestMetric, WearableDevice } = require("../models");
const { Op } = require("sequelize");

// Generate realistic health metrics based on time of day
const generateHealthMetrics = (guestId, deviceId, timestamp) => {
  const hour = new Date(timestamp).getHours();

  // Generate realistic data based on time of day
  let heartRate,
    steps,
    caloriesBurned,
    bloodPressureSystolic,
    bloodPressureDiastolic;
  let stressLevel, activityLevel;

  if (hour >= 6 && hour <= 10) {
    // Morning: Lower activity, waking up
    heartRate = Math.floor(Math.random() * 25) + 60; // 60-85 bpm
    steps = Math.floor(Math.random() * 200) + 50; // 50-250 steps
    caloriesBurned = Math.floor(Math.random() * 15) + 5; // 5-20 calories
    stressLevel = Math.random() > 0.7 ? "Medium" : "Low";
    activityLevel = "Low";
  } else if (hour >= 11 && hour <= 16) {
    // Midday: Higher activity, peak park time
    heartRate = Math.floor(Math.random() * 60) + 80; // 80-140 bpm
    steps = Math.floor(Math.random() * 800) + 200; // 200-1000 steps
    caloriesBurned = Math.floor(Math.random() * 40) + 15; // 15-55 calories
    stressLevel =
      Math.random() > 0.6 ? "Medium" : Math.random() > 0.3 ? "High" : "Low";
    activityLevel = Math.random() > 0.7 ? "High" : "Medium";
  } else if (hour >= 17 && hour <= 21) {
    // Evening: Medium activity, winding down
    heartRate = Math.floor(Math.random() * 50) + 70; // 70-120 bpm
    steps = Math.floor(Math.random() * 600) + 150; // 150-750 steps
    caloriesBurned = Math.floor(Math.random() * 35) + 10; // 10-45 calories
    stressLevel = Math.random() > 0.5 ? "Medium" : "Low";
    activityLevel = Math.random() > 0.6 ? "Medium" : "Low";
  } else {
    // Night: Very low activity, rest time
    heartRate = Math.floor(Math.random() * 20) + 55; // 55-75 bpm
    steps = Math.floor(Math.random() * 100) + 10; // 10-110 steps
    caloriesBurned = Math.floor(Math.random() * 15) + 2; // 2-17 calories
    stressLevel = "Low";
    activityLevel = "Low";
  }

  // Blood pressure varies less dramatically
  bloodPressureSystolic = Math.floor(Math.random() * 30) + 100; // 100-130
  bloodPressureDiastolic = Math.floor(Math.random() * 15) + 60; // 60-75

  return {
    guest_id: guestId,
    device_id: deviceId, // Add device_id to the metrics
    timestamp: timestamp.toISOString(),
    heart_rate: heartRate,
    steps: steps,
    calories_burned: caloriesBurned,
    blood_pressure_systolic: bloodPressureSystolic,
    blood_pressure_diastolic: bloodPressureDiastolic,
    stress_level: stressLevel,
    activity_level: activityLevel,
  };
};

// Calculate time intervals for a guest based on their creation time
const calculateMetricIntervals = (guestCreatedAt, intervalMinutes = 10) => {
  const intervals = [];
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Start from 6 AM today, or current time if it's earlier
  let startTime = new Date(today.getTime() + 6 * 60 * 60 * 1000); // 6:00 AM today

  // If it's before 6 AM, start from current time
  if (now < startTime) {
    startTime = new Date(now.getTime());
  }

  // Generate intervals every 10 minutes until current time
  while (startTime <= now) {
    intervals.push(new Date(startTime));
    startTime = new Date(startTime.getTime() + intervalMinutes * 60 * 1000);
  }

  // If no intervals were created (e.g., it's very early morning), create at least one current metric
  if (intervals.length === 0) {
    intervals.push(new Date(now.getTime()));
  }

  console.log(`   📅 Guest created at: ${guestCreatedAt.toLocaleString()}`);
  console.log(
    `   ⏰ Generating intervals from: ${
      intervals[0]?.toLocaleString() || "N/A"
    }`
  );
  console.log(`    Total intervals to create: ${intervals.length}`);

  return intervals;
};

// Create metrics for a single guest
const createGuestMetrics = async (guest, intervalMinutes = 10) => {
  try {
    const guestCreatedAt = new Date(guest.createdAt);
    console.log(`   🔍 Guest ${guest.first_name} ${guest.last_name}:`);
    console.log(`      Created at: ${guestCreatedAt.toLocaleString()}`);
    console.log(`      Current time: ${new Date().toLocaleString()}`);

    const intervals = calculateMetricIntervals(guestCreatedAt, intervalMinutes);

    if (intervals.length === 0) {
      console.log(
        `   ⚠️  No intervals to create for guest ${guest.first_name} ${guest.last_name}`
      );
      return 0;
    }

    // Get the device_id from the guest's allocated device
    const deviceId = guest.device_id;
    if (!deviceId) {
      console.log(
        `   ⚠️  Guest ${guest.first_name} ${guest.last_name} has no device allocated`
      );
      return 0;
    }

    const metrics = [];

    intervals.forEach((timestamp, index) => {
      const metric = generateHealthMetrics(guest.guest_id, deviceId, timestamp);
      metrics.push(metric);
    });

    // Bulk create all metrics for this guest
    await GuestMetric.bulkCreate(metrics);

    console.log(
      `   ✅ Created ${metrics.length} metrics for ${guest.first_name} ${guest.last_name}`
    );
    console.log(`      Device ID: ${deviceId}`);
    console.log(
      `      Time range: ${intervals[0].toLocaleTimeString()} - ${intervals[
        intervals.length - 1
      ].toLocaleTimeString()}`
    );

    return metrics.length;
  } catch (error) {
    console.error(
      `   ❌ Error creating metrics for guest ${guest.first_name} ${guest.last_name}:`,
      error
    );
    return 0;
  }
};

// Function to simulate real-time health tracking for a single guest
const startRealTimeTracking = (guest, intervalMinutes = 10) => {
  console.log(
    `    Starting real-time tracking for ${guest.first_name} ${guest.last_name}`
  );
  console.log(`      Device ID: ${guest.device_id}`);
  console.log(`      Tracking interval: ${intervalMinutes} minutes`);

  const createNextMetric = async () => {
    try {
      const now = new Date();
      const metric = generateHealthMetrics(
        guest.guest_id,
        guest.device_id,
        now
      );

      await GuestMetric.create(metric);

      console.log(
        `   📊 [${now.toLocaleTimeString()}] Created metric for ${
          guest.first_name
        } ${guest.last_name}`
      );
      console.log(
        `      Heart Rate: ${metric.heart_rate} bpm, Steps: ${metric.steps}, Calories: ${metric.calories_burned}`
      );

      // Schedule next metric creation
      setTimeout(createNextMetric, intervalMinutes * 60 * 1000);
    } catch (error) {
      console.error(
        `   ❌ Error creating metric for ${guest.first_name} ${guest.last_name}:`,
        error
      );
      // Still schedule next metric even if there's an error
      setTimeout(createNextMetric, intervalMinutes * 60 * 1000);
    }
  };

  // Start the tracking cycle
  createNextMetric();

  return {
    guestId: guest.guest_id,
    guestName: `${guest.first_name} ${guest.last_name}`,
    deviceId: guest.device_id,
    startTime: new Date(),
    interval: intervalMinutes,
  };
};

// Function to start real-time tracking for all guests
const startRealTimeTrackingForAllGuests = async (
  guests,
  intervalMinutes = 10
) => {
  console.log(
    `\n Starting real-time health tracking for ${guests.length} guests...`
  );
  console.log(`⏰ Each guest will be tracked every ${intervalMinutes} minutes`);
  console.log(`📱 Simulating wearable device monitoring in real-time`);

  const activeTrackers = new Map(); // Use Map to track active trackers by guest ID

  // Start tracking for each guest
  guests.forEach((guest, index) => {
    // Stagger the start times slightly to avoid all guests creating metrics at exactly the same time
    const delay = index * 1000; // 1 second delay between each guest

    setTimeout(() => {
      const tracker = startRealTimeTracking(guest, intervalMinutes);
      activeTrackers.set(guest.guest_id, tracker);

      console.log(
        `   ✅ Tracker ${index + 1}/${guests.length} started for ${
          guest.first_name
        } ${guest.last_name}`
      );
    }, delay);
  });

  console.log(`\n Real-time tracking started for all guests!`);
  console.log(
    `📊 Metrics will be created every ${intervalMinutes} minutes for each guest`
  );
  console.log(
    `⏰ Script will continue running to simulate continuous monitoring`
  );
  console.log(`🛑 Press Ctrl+C to stop all tracking`);

  return activeTrackers;
};

// Function to check for new guests and start tracking them
const checkForNewGuests = async (activeTrackers, intervalMinutes = 10) => {
  try {
    // Find all guests with devices
    const allGuests = await Guest.findAll({
      attributes: [
        "guest_id",
        "first_name",
        "last_name",
        "createdAt",
        "device_id",
      ],
      where: {
        device_id: {
          [Op.ne]: null,
        },
      },
      order: [["createdAt", "ASC"]],
    });

    // Find new guests that don't have active trackers
    const newGuests = allGuests.filter(
      (guest) => !activeTrackers.has(guest.guest_id)
    );

    if (newGuests.length > 0) {
      console.log(
        `\n🆕 Found ${newGuests.length} new guests to start tracking:`
      );

      newGuests.forEach((guest, index) => {
        console.log(
          `   ${index + 1}. ${guest.first_name} ${guest.last_name} (ID: ${
            guest.guest_id
          })`
        );

        // Start tracking for new guest
        const tracker = startRealTimeTracking(guest, intervalMinutes);
        activeTrackers.set(guest.guest_id, tracker);

        console.log(
          `      ✅ Started tracking for new guest: ${guest.first_name} ${guest.last_name}`
        );
      });

      console.log(` Total active trackers: ${activeTrackers.size}`);
    }

    return newGuests.length;
  } catch (error) {
    console.error("❌ Error checking for new guests:", error);
    return 0;
  }
};

// Function to start continuous monitoring for new guests
const startContinuousGuestMonitoring = async (guests, intervalMinutes = 10) => {
  console.log(`\n Starting real-time health tracking simulation...`);

  // Start real-time tracking for all existing guests
  const activeTrackers = await startRealTimeTrackingForAllGuests(
    guests,
    intervalMinutes
  );

  // Set up periodic checking for new guests (every 2 minutes)
  const newGuestCheckInterval = setInterval(async () => {
    const newGuestsCount = await checkForNewGuests(
      activeTrackers,
      intervalMinutes
    );
    if (newGuestsCount > 0) {
      console.log(
        `\n Successfully added ${newGuestsCount} new guests to tracking!`
      );
    }
  }, 2 * 60 * 1000); // Check every 2 minutes

  console.log(`\n Will check for new guests every 2 minutes automatically`);
  console.log(` New guests will be automatically added to tracking`);

  // Keep the process alive and handle graceful shutdown
  process.on("SIGINT", () => {
    console.log("\n\n Stopping real-time health tracking...");
    console.log(`📊 Stopped tracking for ${activeTrackers.size} guests`);
    clearInterval(newGuestCheckInterval);
    process.exit(0);
  });

  // Keep running indefinitely for continuous tracking
  return new Promise(() => {});
};

// Main function to seed continuous guest metrics
const seedContinuousGuestMetrics = async (intervalMinutes = 10) => {
  try {
    const startTime = new Date();
    const today = startTime.toLocaleDateString();
    const currentTime = startTime.toLocaleTimeString();

    console.log("🔄 Starting Continuous Guest Metrics Seeding");
    console.log(`📅 Today's date: ${today}`);
    console.log(`🕐 Current time: ${currentTime}`);
    console.log(
      `⏱️  Metrics will be created every ${intervalMinutes} minutes from guest creation time`
    );

    // Find all existing guests with their device information
    console.log("\n🔍 Finding all existing guests with devices...");
    const guests = await Guest.findAll({
      attributes: [
        "guest_id",
        "first_name",
        "last_name",
        "createdAt",
        "device_id", // Include device_id from guest
      ],
      where: {
        device_id: {
          [Op.ne]: null, // Only guests with allocated devices
        },
      },
      order: [["createdAt", "ASC"]],
    });

    if (guests.length === 0) {
      console.log("❌ No guests with allocated devices found in the database!");
      console.log(
        "   Please run the guest seeding script first and allocate devices to guests."
      );
      return [];
    }

    console.log(
      `✅ Found ${guests.length} guests with allocated devices in the database`
    );

    // Check if metrics already exist for today
    const todayStart = new Date(
      startTime.getFullYear(),
      startTime.getMonth(),
      startTime.getDate()
    );
    const todayEnd = new Date(
      startTime.getFullYear(),
      startTime.getMonth(),
      startTime.getDate() + 1
    );

    const existingMetricsToday = await GuestMetric.count({
      where: {
        timestamp: {
          [Op.gte]: todayStart,
          [Op.lt]: todayEnd,
        },
      },
    });

    if (existingMetricsToday > 0) {
      console.log(
        `⚠️  Found ${existingMetricsToday} existing metrics for today`
      );
      const clearExisting = process.argv.includes("--force");
      if (!clearExisting) {
        console.log(
          "   Use --force flag to clear existing metrics and recreate"
        );
        console.log("   Or metrics will be added to existing data");
      } else {
        console.log("🗑️  Clearing existing metrics for today...");
        await GuestMetric.destroy({
          where: {
            timestamp: {
              [Op.gte]: todayStart,
              [Op.lt]: todayEnd,
            },
          },
        });
        console.log("✅ Existing metrics cleared");
      }
    }

    // Process each guest for initial metrics
    console.log(`\n📊 Creating initial metrics for ${guests.length} guests...`);
    const results = [];
    let totalMetricsCreated = 0;

    for (let i = 0; i < guests.length; i++) {
      const guest = guests[i];
      console.log(
        `\n🔄 Processing guest ${i + 1}/${guests.length}: ${guest.first_name} ${
          guest.last_name
        }`
      );

      try {
        const metricsCount = await createGuestMetrics(guest, intervalMinutes);
        totalMetricsCreated += metricsCount;

        results.push({
          guestId: guest.guest_id,
          name: `${guest.first_name} ${guest.last_name}`,
          metricsCreated: metricsCount,
          deviceType: guest.wearableDevices?.[0]?.device_type || "None",
          deviceActive: guest.wearableDevices?.[0]?.is_active || false,
        });

        // Show progress
        const progress = (((i + 1) / guests.length) * 100).toFixed(1);
        console.log(
          `   📈 Progress: ${progress}% (${totalMetricsCreated} total metrics created)`
        );
      } catch (error) {
        console.error(
          `❌ Failed to process guest ${guest.first_name} ${guest.last_name}:`,
          error
        );
        results.push({
          guestId: guest.guest_id,
          name: `${guest.first_name} ${guest.last_name}`,
          metricsCreated: 0,
          error: error.message,
        });
      }
    }

    const endTime = new Date();
    const duration = endTime.getTime() - startTime.getTime();

    console.log("\n🎉 Initial guest metrics seeding completed!");
    console.log(`📊 Summary:`);
    console.log(`   Total guests processed: ${guests.length}`);
    console.log(`   Total metrics created: ${totalMetricsCreated}`);
    console.log(
      `   Successful: ${results.filter((r) => r.metricsCreated > 0).length}`
    );
    console.log(
      `   Failed: ${results.filter((r) => r.metricsCreated === 0).length}`
    );
    console.log(`⏱️  Total duration: ${(duration / 1000).toFixed(2)} seconds`);

    // Show metrics distribution
    const successfulResults = results.filter((r) => r.metricsCreated > 0);
    if (successfulResults.length > 0) {
      const avgMetricsPerGuest = (
        totalMetricsCreated / successfulResults.length
      ).toFixed(1);
      console.log(`\n📈 Metrics Distribution:`);
      console.log(`   Average metrics per guest: ${avgMetricsPerGuest}`);
      console.log(
        `   Total time coverage: ${
          intervalMinutes * totalMetricsCreated
        } minutes`
      );
    }

    // Show sample of created metrics
    if (results.length > 0) {
      console.log(`\n📋 Sample of processed guests:`);
      results.slice(0, 5).forEach((result, index) => {
        if (result.metricsCreated > 0) {
          console.log(
            `   ${index + 1}. ${result.name} - ${
              result.metricsCreated
            } metrics - Device: ${result.deviceType} (${
              result.deviceActive ? "Active" : "Inactive"
            })`
          );
        } else {
          console.log(
            `   ${index + 1}. ${result.name} - Failed to create metrics`
          );
        }
      });
      if (results.length > 5) {
        console.log(`   ... and ${results.length - 5} more`);
      }
    }

    // Start real-time tracking if --continuous flag is used
    if (process.argv.includes("--continuous")) {
      console.log(`\n Starting real-time health tracking simulation...`);

      // Start continuous monitoring (includes new guest detection)
      const activeTrackers = await startContinuousGuestMonitoring(
        guests,
        intervalMinutes
      );

      // Keep running indefinitely for continuous tracking
      return new Promise(() => {});
    }

    return results;
  } catch (error) {
    console.error("❌ Error during continuous metrics seeding:", error);
    throw error;
  }
};

// Function to clear today's guest metrics
const clearTodayMetrics = async () => {
  try {
    console.log("��️  Clearing today's guest metrics...");

    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const todayEnd = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const deletedCount = await GuestMetric.destroy({
      where: {
        timestamp: {
          [Op.gte]: todayStart,
          [Op.lt]: todayEnd,
        },
      },
    });

    console.log(`✅ Cleared ${deletedCount} metrics for today`);
    return deletedCount;
  } catch (error) {
    console.error("❌ Error clearing today's metrics:", error);
    throw error;
  }
};

// Function to show current metrics count
const showCurrentMetricsCount = async () => {
  try {
    const totalMetrics = await GuestMetric.count();

    // Get today's count
    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const todayEnd = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const todayMetrics = await GuestMetric.count({
      where: {
        timestamp: {
          [Op.gte]: todayStart,
          [Op.lt]: todayEnd,
        },
      },
    });

    console.log("📊 Current Metrics Count:");
    console.log(`   Total Metrics: ${totalMetrics}`);
    console.log(`   Metrics Today: ${todayMetrics}`);

    return { totalMetrics, todayMetrics };
  } catch (error) {
    console.error("❌ Error getting metrics count:", error);
    return { totalMetrics: 0, todayMetrics: 0 };
  }
};

// Export functions
module.exports = {
  seedContinuousGuestMetrics,
  clearTodayMetrics,
  showCurrentMetricsCount,
};

// If this script is run directly
if (require.main === module) {
  const intervalMinutes = process.argv[2] ? parseInt(process.argv[2]) : 10;

  // Connect to database and run seeding
  const { sequelize } = require("../models");

  sequelize
    .authenticate()
    .then(async () => {
      console.log("✅ Database connected successfully.");

      // Show current metrics count first
      await showCurrentMetricsCount();

      // Clear existing metrics if --force flag is used
      if (process.argv.includes("--force")) {
        console.log(
          "\n⚠️  Force flag detected - will clear existing metrics for today"
        );
        await clearTodayMetrics();
      }

      // Run continuous metrics seeding
      return seedContinuousGuestMetrics(intervalMinutes);
    })
    .then((results) => {
      console.log("\n�� Continuous metrics seeding finished successfully!");
      console.log(`📊 Created metrics for ${results.length} guests`);
      console.log(
        `⏱️  Metrics generated every ${intervalMinutes} minutes from guest creation time`
      );
      console.log(`�� All data timestamped for today!`);
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Continuous metrics seeding failed:", error);
      process.exit(1);
    });
}
