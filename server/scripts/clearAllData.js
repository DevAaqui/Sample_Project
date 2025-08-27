const { sequelize } = require("../models");
const { 
  User, 
  Guest, 
  GuestMetric, 
  WearableDevice, 
  Ride, 
  RideMetric, 
  RideSession 
} = require("../models");

/**
 * Clear all data from the database
 * Deletes in the correct order to avoid foreign key constraint issues
 */
const clearAllData = async () => {
  try {
    console.log("=== STARTING DATABASE CLEANUP ===");
    console.log("This will delete ALL data from the database!");
    
    // Get the current timestamp for logging
    const startTime = new Date();
    console.log(`Started at: ${startTime.toISOString()}`);
    
    // Step 1: Clear metrics and session data first (child tables)
    console.log("\n1. Clearing metrics and session data...");
    
    console.log("   - Clearing GuestMetric records...");
    const guestMetricsDeleted = await GuestMetric.destroy({ 
      where: {},
      force: true // Force delete even if paranoid is enabled
    });
    console.log(`     Deleted ${guestMetricsDeleted} guest metric records`);
    
    console.log("   - Clearing RideMetric records...");
    const rideMetricsDeleted = await RideMetric.destroy({ 
      where: {},
      force: true
    });
    console.log(`     Deleted ${rideMetricsDeleted} ride metric records`);
    
    console.log("   - Clearing RideSession records...");
    const rideSessionsDeleted = await RideSession.destroy({ 
      where: {},
      force: true
    });
    console.log(`     Deleted ${rideSessionsDeleted} ride session records`);
    
    // Step 2: Clear wearable devices (depends on guests)
    console.log("\n2. Clearing wearable devices...");
    const wearableDevicesDeleted = await WearableDevice.destroy({ 
      where: {},
      force: true
    });
    console.log(`     Deleted ${wearableDevicesDeleted} wearable device records`);
    
    // Step 3: Clear rides (depends on guests)
    console.log("\n3. Clearing rides...");
    const ridesDeleted = await Ride.destroy({ 
      where: {},
      force: true
    });
    console.log(`     Deleted ${ridesDeleted} ride records`);
    
    // Step 4: Clear guests (depends on users for creation tracking)
    console.log("\n4. Clearing guests...");
    const guestsDeleted = await Guest.destroy({ 
      where: {},
      force: true
    });
    console.log(`     Deleted ${guestsDeleted} guest records`);
    
    // Step 5: Clear users last (parent table)
    console.log("\n5. Clearing users...");
    const usersDeleted = await User.destroy({ 
      where: {},
      force: true
    });
    console.log(`     Deleted ${usersDeleted} user records`);
    
    // Step 6: Reset auto-increment counters
    console.log("\n6. Resetting auto-increment counters...");
    try {
      await sequelize.query('ALTER TABLE users AUTO_INCREMENT = 1');
      await sequelize.query('ALTER TABLE guests AUTO_INCREMENT = 1');
      await sequelize.query('ALTER TABLE wearable_devices AUTO_INCREMENT = 1');
      await sequelize.query('ALTER TABLE guest_metrics AUTO_INCREMENT = 1');
      await sequelize.query('ALTER TABLE rides AUTO_INCREMENT = 1');
      await sequelize.query('ALTER TABLE ride_metrics AUTO_INCREMENT = 1');
      await sequelize.query('ALTER TABLE ride_sessions AUTO_INCREMENT = 1');
      console.log("     Auto-increment counters reset successfully");
    } catch (error) {
      console.log("     Note: Some tables may not support auto-increment reset");
    }
    
    // Summary
    const endTime = new Date();
    const duration = endTime - startTime;
    
    console.log("\n=== DATABASE CLEANUP COMPLETED SUCCESSFULLY! ===");
    console.log(`\nSummary of deleted records:`);
    console.log(`  - Guest Metrics: ${guestMetricsDeleted}`);
    console.log(`  - Ride Metrics: ${rideMetricsDeleted}`);
    console.log(`  - Ride Sessions: ${rideSessionsDeleted}`);
    console.log(`  - Wearable Devices: ${wearableDevicesDeleted}`);
    console.log(`  - Rides: ${ridesDeleted}`);
    console.log(`  - Guests: ${guestsDeleted}`);
    console.log(`  - Users: ${usersDeleted}`);
    console.log(`\nTotal duration: ${duration}ms`);
    console.log(`Completed at: ${endTime.toISOString()}`);
    console.log("\n⚠️  WARNING: All data has been permanently deleted!");
    console.log("   Run your seeding scripts to restore test data.");
    
  } catch (error) {
    console.error("\n❌ ERROR during database cleanup:", error);
    console.error("\nStack trace:", error.stack);
    throw error;
  }
};

/**
 * Verify that all tables are empty
 */
const verifyCleanup = async () => {
  try {
    console.log("\n=== VERIFYING CLEANUP ===");
    
    const counts = {
      users: await User.count(),
      guests: await Guest.count(),
      wearableDevices: await WearableDevice.count(),
      guestMetrics: await GuestMetric.count(),
      rides: await Ride.count(),
      rideMetrics: await RideMetric.count(),
      rideSessions: await RideSession.count()
    };
    
    console.log("Current record counts:");
    Object.entries(counts).forEach(([table, count]) => {
      const status = count === 0 ? "✅" : "❌";
      console.log(`  ${status} ${table}: ${count} records`);
    });
    
    const allEmpty = Object.values(counts).every(count => count === 0);
    
    if (allEmpty) {
      console.log("\n🎉 All tables are successfully cleared!");
    } else {
      console.log("\n⚠️  Some tables still contain data!");
    }
    
    return allEmpty;
    
  } catch (error) {
    console.error("Error verifying cleanup:", error);
    return false;
  }
};

/**
 * Main execution function
 */
const main = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully");
    
    // Perform cleanup
    await clearAllData();
    
    // Verify cleanup
    await verifyCleanup();
    
    console.log("\n✅ Database cleanup completed successfully!");
    process.exit(0);
    
  } catch (error) {
    console.error("\n❌ Database cleanup failed:", error.message);
    process.exit(1);
  }
};

// Export functions for use in other scripts
module.exports = {
  clearAllData,
  verifyCleanup
};

// If this script is run directly
if (require.main === module) {
  // Add a confirmation prompt
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  console.log("⚠️  WARNING: This will delete ALL data from your database!");
  console.log("   This action cannot be undone!");
  console.log("   Make sure you have backups if needed.");
  console.log("");
  
  rl.question("Are you sure you want to continue? Type 'YES' to confirm: ", (answer) => {
    if (answer === 'YES') {
      rl.close();
      main();
    } else {
      console.log("Operation cancelled by user.");
      rl.close();
      process.exit(0);
    }
  });
}