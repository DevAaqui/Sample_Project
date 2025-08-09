const { Ride, RideSession, RideMetric, Guest } = require("../models");

// Sample ride data
const rideData = [
  {
    ride_name: "Thunder Mountain",
    ride_type: "Roller Coaster",
    min_height_cm: 120.0,
    max_heart_rate: 160,
    g_force: 3.2,
    duration_seconds: 180,
  },
  {
    ride_name: "Splash Falls",
    ride_type: "Water Ride",
    min_height_cm: 100.0,
    max_heart_rate: 140,
    g_force: 1.5,
    duration_seconds: 120,
  },
  {
    ride_name: "Family Carousel",
    ride_type: "Family Ride",
    min_height_cm: 90.0,
    max_heart_rate: 120,
    g_force: 1.0,
    duration_seconds: 90,
  },
  {
    ride_name: "Extreme Drop",
    ride_type: "Thrill Ride",
    min_height_cm: 140.0,
    max_heart_rate: 180,
    g_force: 4.5,
    duration_seconds: 60,
  },
  {
    ride_name: "Kiddie Train",
    ride_type: "Kids Ride",
    min_height_cm: 80.0,
    max_heart_rate: 110,
    g_force: 0.8,
    duration_seconds: 150,
  },
  {
    ride_name: "Haunted Mansion",
    ride_type: "Dark Ride",
    min_height_cm: 100.0,
    max_heart_rate: 130,
    g_force: 1.2,
    duration_seconds: 300,
  },
  {
    ride_name: "Sky Screamer",
    ride_type: "Thrill Ride",
    min_height_cm: 130.0,
    max_heart_rate: 170,
    g_force: 3.8,
    duration_seconds: 75,
  },
  {
    ride_name: "River Rapids",
    ride_type: "Water Ride",
    min_height_cm: 110.0,
    max_heart_rate: 150,
    g_force: 2.1,
    duration_seconds: 240,
  },
  {
    ride_name: "Merry-Go-Round",
    ride_type: "Family Ride",
    min_height_cm: 85.0,
    max_heart_rate: 115,
    g_force: 0.9,
    duration_seconds: 120,
  },
  {
    ride_name: "Dragon Coaster",
    ride_type: "Roller Coaster",
    min_height_cm: 125.0,
    max_heart_rate: 165,
    g_force: 3.5,
    duration_seconds: 210,
  },
];

// Helper function to get random number between min and max
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to get random date between start and end
const getRandomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

// Helper function to generate random ride sessions
const generateRideSessions = async (rideId, count = 10) => {
  const sessions = [];
  const guests = await Guest.findAll({ attributes: ["guest_id"] });

  if (guests.length === 0) {
    console.log("No guests found. Please seed guests first.");
    return sessions;
  }

  const baseDate = new Date(2024, 0, 1);

  for (let i = 0; i < count; i++) {
    const guest = guests[Math.floor(Math.random() * guests.length)];
    const startTime = getRandomDate(baseDate, new Date());
    const endTime = new Date(
      startTime.getTime() + getRandomNumber(30, 300) * 1000
    ); // 30 seconds to 5 minutes

    const preRideHeartRate = getRandomNumber(60, 120);
    const postRideHeartRate = getRandomNumber(
      preRideHeartRate + 10,
      preRideHeartRate + 50
    );
    const caloriesBurned = getRandomNumber(20, 150);

    sessions.push({
      ride_id: rideId,
      guest_id: guest.guest_id,
      start_time: startTime,
      end_time: endTime,
      pre_ride_heart_rate: preRideHeartRate,
      post_ride_heart_rate: postRideHeartRate,
      calories_burned: caloriesBurned,
    });
  }

  return sessions;
};

// Helper function to generate ride metrics for a session
const generateRideMetrics = (sessionId, startTime, endTime) => {
  const metrics = [];
  const duration = Math.floor((new Date(endTime) - new Date(startTime)) / 1000);
  const interval = Math.floor(duration / 10); // Generate 10 metrics per session

  for (let i = 0; i < 10; i++) {
    const timestamp = new Date(
      new Date(startTime).getTime() + i * interval * 1000
    );
    const heartRate = getRandomNumber(80, 180);
    const gForce = (Math.random() * 4 + 0.5).toFixed(2); // 0.5 to 4.5 g

    metrics.push({
      session_id: sessionId,
      timestamp: timestamp,
      heart_rate: heartRate,
      g_force: parseFloat(gForce),
    });
  }

  return metrics;
};

// Main function to seed rides
const seedRides = async () => {
  try {
    console.log("Starting to seed rides...");

    for (const rideInfo of rideData) {
      // Create ride
      const ride = await Ride.create(rideInfo);
      console.log(`Created ride: ${ride.ride_name} (ID: ${ride.ride_id})`);

      // Generate ride sessions for this ride
      const sessions = await generateRideSessions(
        ride.ride_id,
        getRandomNumber(5, 15)
      );

      if (sessions.length > 0) {
        // Create sessions and get their IDs
        const createdSessions = await RideSession.bulkCreate(sessions);
        console.log(
          `Created ${createdSessions.length} sessions for ${ride.ride_name}`
        );

        // Generate metrics for each created session
        for (const session of createdSessions) {
          const metrics = generateRideMetrics(
            session.session_id,
            session.start_time,
            session.end_time
          );
          await RideMetric.bulkCreate(metrics);
        }
        console.log(`Created metrics for ${createdSessions.length} sessions`);
      }
    }

    console.log("Successfully seeded rides with sessions and metrics!");
  } catch (error) {
    console.error("Error seeding rides:", error);
    throw error;
  }
};

// Function to clear all ride data
const clearRideData = async () => {
  try {
    console.log("Clearing all ride data...");

    // Delete in order due to foreign key constraints
    await RideMetric.destroy({ where: {} });
    await RideSession.destroy({ where: {} });
    await Ride.destroy({ where: {} });

    console.log("All ride data cleared successfully!");
  } catch (error) {
    console.error("Error clearing ride data:", error);
    throw error;
  }
};

// Export functions for use in other scripts
module.exports = {
  seedRides,
  clearRideData,
};

// If this script is run directly
if (require.main === module) {
  // Connect to database and run seeding
  const { sequelize } = require("../models");

  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connected successfully.");
      return seedRides();
    })
    .then(() => {
      console.log("Ride seeding completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Ride seeding failed:", error);
      process.exit(1);
    });
}
