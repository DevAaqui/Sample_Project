const { Ride } = require("../models");

// Sample ride data arrays
const rideTypes = [
  "Roller Coaster",
  "Water Ride",
  "Family Ride",
  "Thrill Ride",
  "Dark Ride",
  "Spinning Ride",
  "Flying Ride",
  "Drop Tower",
  "Carousel",
  "Ferris Wheel",
  "Bumper Cars",
  "Tea Cups",
  "Log Flume",
  "River Rapids",
  "Swing Ride",
  "Pirate Ship",
  "Haunted House",
  "Maze",
  "Mini Golf",
  "Go-Karts",
];

const rideNames = [
  // Roller Coasters
  "Thunder Bolt",
  "Dragon's Fury",
  "Speed Demon",
  "Mountain Express",
  "Twisted Steel",
  "Velocity X",
  "Cobra's Strike",
  "Phantom Force",
  "Lightning Strike",
  "Storm Chaser",
  "Raptor's Flight",
  "Cyclone",
  "Tornado",
  "Hurricane",
  "Tsunami",
  "Earthquake",
  "Volcano",
  "Avalanche",
  "Blizzard",
  "Thunderstorm",

  // Water Rides
  "Splash Mountain",
  "River Adventure",
  "Tidal Wave",
  "Ocean Explorer",
  "Coral Reef",
  "Deep Blue",
  "Waterfall",
  "Rapid River",
  "Canyon Rapids",
  "Mountain Stream",
  "Lake Adventure",
  "Bay Explorer",
  "Harbor Cruise",
  "Island Hopper",
  "Beach Blaster",

  // Family Rides
  "Magic Carpet",
  "Flying Dutchman",
  "Treasure Hunt",
  "Castle Quest",
  "Dragon's Lair",
  "Fairy Tale",
  "Enchanted Forest",
  "Wizard's Tower",
  "Knight's Quest",
  "Princess Carousel",
  "Royal Carriage",
  "Golden Chariot",
  "Silver Star",
  "Crystal Palace",
  "Emerald City",

  // Thrill Rides
  "Free Fall",
  "Sky Drop",
  "Gravity Defier",
  "Adrenaline Rush",
  "Fear Factor",
  "Extreme Edge",
  "Dare Devil",
  "Risk Taker",
  "Thrill Seeker",
  "Adventure Quest",
  "Expedition X",
  "Discovery Zone",
  "Explorer's Path",
  "Pioneer's Trail",
  "Trail Blazer",

  // Dark Rides
  "Haunted Mansion",
  "Ghost Train",
  "Phantom Manor",
  "Spirit World",
  "Shadow Realm",
  "Nightmare Express",
  "Dream Weaver",
  "Fantasy Land",
  "Wonder World",
  "Magic Kingdom",
  "Enchanted Realm",
  "Mystical Forest",
  "Secret Garden",
  "Hidden Valley",
  "Lost World",

  // Spinning Rides
  "Whirlwind",
  "Spinner",
  "Tornado",
  "Cyclone",
  "Vortex",
  "Spiral",
  "Helix",
  "Corkscrew",
  "Screwball",
  "Twister",
  "Spinner",
  "Rotator",
  "Revolver",
  "Spinner",
  "Whirler",

  // Flying Rides
  "Sky Rider",
  "Air Force",
  "Flying Ace",
  "Wing Commander",
  "Sky Captain",
  "Air Admiral",
  "Flight Master",
  "Sky Pilot",
  "Air Marshal",
  "Flight Captain",
  "Sky Navigator",
  "Air Controller",
  "Flight Engineer",
  "Sky Mechanic",
  "Air Technician",
];

// Generate random ride data
const generateRideData = (index) => {
  const rideType = rideTypes[Math.floor(Math.random() * rideTypes.length)];
  const rideName = rideNames[index % rideNames.length];

  // Generate realistic specifications based on ride type
  let minHeight, maxHeartRate, gForce, duration;

  if (rideType === "Roller Coaster") {
    minHeight = Math.floor(Math.random() * 30) + 120; // 120-150 cm
    maxHeartRate = Math.floor(Math.random() * 40) + 140; // 140-180 bpm
    gForce = (Math.random() * 3 + 2).toFixed(2); // 2.0-5.0 G
    duration = Math.floor(Math.random() * 120) + 60; // 60-180 seconds
  } else if (rideType === "Water Ride") {
    minHeight = Math.floor(Math.random() * 20) + 100; // 100-120 cm
    maxHeartRate = Math.floor(Math.random() * 30) + 110; // 110-140 bpm
    gForce = (Math.random() * 1.5 + 0.5).toFixed(2); // 0.5-2.0 G
    duration = Math.floor(Math.random() * 180) + 120; // 120-300 seconds
  } else if (rideType === "Thrill Ride") {
    minHeight = Math.floor(Math.random() * 25) + 130; // 130-155 cm
    maxHeartRate = Math.floor(Math.random() * 35) + 130; // 130-165 bpm
    gForce = (Math.random() * 2.5 + 1.5).toFixed(2); // 1.5-4.0 G
    duration = Math.floor(Math.random() * 90) + 45; // 45-135 seconds
  } else if (rideType === "Drop Tower") {
    minHeight = Math.floor(Math.random() * 20) + 140; // 140-160 cm
    maxHeartRate = Math.floor(Math.random() * 30) + 150; // 150-180 bpm
    gForce = (Math.random() * 2 + 1).toFixed(2); // 1.0-3.0 G
    duration = Math.floor(Math.random() * 60) + 30; // 30-90 seconds
  } else if (rideType === "Family Ride") {
    minHeight = Math.floor(Math.random() * 15) + 80; // 80-95 cm
    maxHeartRate = Math.floor(Math.random() * 20) + 90; // 90-110 bpm
    gForce = (Math.random() * 0.5 + 0.2).toFixed(2); // 0.2-0.7 G
    duration = Math.floor(Math.random() * 300) + 180; // 180-480 seconds
  } else {
    // Default values for other ride types
    minHeight = Math.floor(Math.random() * 25) + 100; // 100-125 cm
    maxHeartRate = Math.floor(Math.random() * 25) + 100; // 100-125 bpm
    gForce = (Math.random() * 1.5 + 0.5).toFixed(2); // 0.5-2.0 G
    duration = Math.floor(Math.random() * 150) + 90; // 90-240 seconds
  }

  return {
    ride_name: rideName,
    ride_type: rideType,
    min_height_cm: minHeight,
    max_heart_rate: maxHeartRate,
    g_force: parseFloat(gForce),
    duration_seconds: duration,
  };
};

// Main seeding function
const seedRides = async (rideCount = 100) => {
  try {
    const startTime = new Date();
    console.log("�� Starting Amusement Park Ride Seeding");
    console.log(`📅 Today's date: ${startTime.toLocaleDateString()}`);
    console.log(`🕐 Current time: ${startTime.toLocaleTimeString()}`);
    console.log(`🎯 Total rides to create: ${rideCount}`);

    const results = [];

    for (let i = 1; i <= rideCount; i++) {
      try {
        const rideData = generateRideData(i - 1);

        // Create ride
        const ride = await Ride.create(rideData);

        results.push({
          rideId: ride.ride_id,
          name: ride.ride_name,
          type: ride.ride_type,
          minHeight: ride.min_height_cm,
          maxHeartRate: ride.max_heart_rate,
          gForce: ride.g_force,
          duration: ride.duration_seconds,
        });

        // Show progress every 20 rides
        if (i % 20 === 0 || i === rideCount) {
          const progress = ((i / rideCount) * 100).toFixed(1);
          console.log(`✅ Created ${i}/${rideCount} rides (${progress}%)`);
        }
      } catch (error) {
        console.error(`❌ Error creating ride ${i}:`, error);
        // Continue with next ride instead of stopping
        continue;
      }
    }

    const endTime = new Date();
    const duration = endTime.getTime() - startTime.getTime();

    console.log("\n🎉 Ride seeding completed successfully!");
    console.log(`📊 Summary:`);
    console.log(`   Total rides created: ${results.length}/${rideCount}`);
    console.log(`   Successful: ${results.length}`);
    console.log(`   Failed: ${rideCount - results.length}`);
    console.log(`⏱️  Total duration: ${(duration / 1000).toFixed(2)} seconds`);

    // Show ride type distribution
    const typeDistribution = {};
    results.forEach((ride) => {
      typeDistribution[ride.type] = (typeDistribution[ride.type] || 0) + 1;
    });

    console.log(`\n📈 Ride Type Distribution:`);
    Object.entries(typeDistribution).forEach(([type, count]) => {
      const percentage = ((count / results.length) * 100).toFixed(1);
      console.log(`   ${type}: ${count} rides (${percentage}%)`);
    });

    // Show sample of created rides
    if (results.length > 0) {
      console.log(`\n🎢 Sample of created rides:`);
      results.slice(0, 10).forEach((ride, index) => {
        console.log(`   ${index + 1}. ${ride.name} (${ride.type})`);
        console.log(
          `      Min Height: ${ride.minHeight}cm | Max HR: ${ride.maxHeartRate}bpm | G-Force: ${ride.gForce}G | Duration: ${ride.duration}s`
        );
      });
      if (results.length > 10) {
        console.log(`   ... and ${results.length - 10} more rides`);
      }
    }

    return results;
  } catch (error) {
    console.error("❌ Error during ride seeding:", error);
    throw error;
  }
};

// Function to clear all ride data
const clearRideData = async () => {
  try {
    console.log("🗑️  Clearing all ride data...");

    // Delete in order due to foreign key constraints
    await Ride.destroy({ where: {} });

    console.log("✅ All ride data cleared successfully!");
  } catch (error) {
    console.error("❌ Error clearing ride data:", error);
    throw error;
  }
};

// Function to show current ride count
const showCurrentRideCount = async () => {
  try {
    const rideCount = await Ride.count();

    console.log("�� Current Ride Count:");
    console.log(`   Total Rides: ${rideCount}`);

    return { rideCount };
  } catch (error) {
    console.error("❌ Error getting ride count:", error);
    return { rideCount: 0 };
  }
};

// Export functions
module.exports = {
  seedRides,
  clearRideData,
  showCurrentRideCount,
};

// If this script is run directly
if (require.main === module) {
  const rideCount = process.argv[2] ? parseInt(process.argv[2]) : 100;

  // Connect to database and run seeding
  const { sequelize } = require("../models");

  sequelize
    .authenticate()
    .then(async () => {
      console.log("✅ Database connected successfully.");

      // Show current ride count first
      await showCurrentRideCount();

      // Ask for confirmation if clearing existing data
      if (process.argv.includes("--clear")) {
        console.log("\n⚠️  Clearing existing ride data first...");
        await clearRideData();
      }

      // Run ride seeding
      return seedRides(rideCount);
    })
    .then((results) => {
      console.log("\n🎯 Ride seeding finished successfully!");
      console.log(`🎢 Created ${results.length} amusement park rides`);
      console.log(`📅 All rides are ready for today's operations!`);
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Ride seeding failed:", error);
      process.exit(1);
    });
}
