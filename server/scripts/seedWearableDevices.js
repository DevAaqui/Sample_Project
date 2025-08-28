const { WearableDevice } = require("../models");

// Sample device data arrays
const deviceTypes = [
  "SmartWatch",
  "FitnessBand",
  "HealthMonitor",
  "ActivityTracker",
  "GPS Tracker",
  "Biometric Sensor",
  "Motion Detector",
  "Vital Signs Monitor",
  "Activity Monitor",
  "Health Tracker",
];

const deviceBrands = [
  "FitTech",
  "HealthSync",
  "VitalCore",
  "MotionSense",
  "BioTrack",
  "HealthFlow",
  "VitalWatch",
  "ActivitySync",
  "HealthMonitor",
  "BioSync",
];

const deviceModels = [
  "Pro X1",
  "Elite 2024",
  "Premium Plus",
  "Advanced Series",
  "Smart Edition",
  "Professional",
  "Enterprise",
  "Standard",
  "Basic",
  "Lite",
];

// Generate random device data
const generateDeviceData = (index) => {
  const deviceType =
    deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
  const brand = deviceBrands[Math.floor(Math.random() * deviceBrands.length)];
  const model = deviceModels[Math.floor(Math.random() * deviceModels.length)];

  // Generate unique serial number
  const serialNumber = `DEV-${brand.toUpperCase().substr(0, 3)}-${model
    .replace(/\s+/g, "")
    .toUpperCase()}-${(index + 1).toString().padStart(4, "0")}`;

  // Random battery level (1-100)
  const batteryLevel = Math.floor(Math.random() * 100) + 1;

  // Most devices are active by default
  const isActive = Math.random() > 0.1; // 90% chance of being active

  // Random firmware version
  const majorVersion = Math.floor(Math.random() * 5) + 1;
  const minorVersion = Math.floor(Math.random() * 10);
  const patchVersion = Math.floor(Math.random() * 10);
  const firmwareVersion = `v${majorVersion}.${minorVersion}.${patchVersion}`;

  // Random device status - use exact ENUM values from your model
  const deviceStatuses = [
    "Available",
    "In Use",
    "Maintenance",
    "Reserved",
    "Testing",
  ];
  const deviceStatus =
    deviceStatuses[Math.floor(Math.random() * deviceStatuses.length)];

  // Random last sync time (within last 24 hours)
  const now = new Date();
  const lastSyncHours = Math.floor(Math.random() * 24);
  const lastSyncMinutes = Math.floor(Math.random() * 60);
  const lastSync = new Date(
    now.getTime() - lastSyncHours * 60 * 60 * 1000 - lastSyncMinutes * 60 * 1000
  );

  return {
    device_type: deviceType,
    device_serial_number: serialNumber,
    device_brand: brand,
    device_model: model,
    battery_level: batteryLevel,
    is_active: isActive,
    device_status: deviceStatus,
    firmware_version: firmwareVersion,
    last_sync: lastSync.toISOString(),
    assigned_date: null, // Will be set when assigned to a guest
    // Note: device_id, createdAt, and updatedAt are handled automatically
  };
};

// Main seeding function
const seedWearableDevices = async (deviceCount = 500) => {
  try {
    const startTime = new Date();
    console.log("📱 Starting Wearable Device Seeding");
    console.log(`📅 Today's date: ${startTime.toLocaleDateString()}`);
    console.log(`🕐 Current time: ${startTime.toLocaleTimeString()}`);
    console.log(`🎯 Total devices to create: ${deviceCount}`);

    const results = [];

    for (let i = 1; i <= deviceCount; i++) {
      try {
        const deviceData = generateDeviceData(i - 1);

        // Create device
        const device = await WearableDevice.create(deviceData);

        results.push({
          deviceId: device.device_id,
          serialNumber: device.device_serial_number,
          type: device.device_type,
          brand: device.device_brand,
          model: device.device_model,
          batteryLevel: device.battery_level,
          isActive: device.is_active,
          status: device.device_status,
        });

        // Show progress every 50 devices
        if (i % 50 === 0 || i === deviceCount) {
          const progress = ((i / deviceCount) * 100).toFixed(1);
          console.log(`✅ Created ${i}/${deviceCount} devices (${progress}%)`);
        }
      } catch (error) {
        console.error(`❌ Error creating device ${i}:`, error);
        // Continue with next device instead of stopping
        continue;
      }
    }

    const endTime = new Date();
    const duration = endTime.getTime() - startTime.getTime();

    console.log("\n🎉 Wearable device seeding completed successfully!");
    console.log(`📊 Summary:`);
    console.log(`   Total devices created: ${results.length}/${deviceCount}`);
    console.log(`   Successful: ${results.length}`);
    console.log(`   Failed: ${deviceCount - results.length}`);
    console.log(`⏱️  Total duration: ${(duration / 1000).toFixed(2)} seconds`);

    // Show device type distribution
    const typeDistribution = {};
    results.forEach((device) => {
      typeDistribution[device.type] = (typeDistribution[device.type] || 0) + 1;
    });

    console.log(`\n📈 Device Type Distribution:`);
    Object.entries(typeDistribution).forEach(([type, count]) => {
      const percentage = ((count / results.length) * 100).toFixed(1);
      console.log(`   ${type}: ${count} devices (${percentage}%)`);
    });

    // Show brand distribution
    const brandDistribution = {};
    results.forEach((device) => {
      brandDistribution[device.brand] =
        (brandDistribution[device.brand] || 0) + 1;
    });

    console.log(`\n🏷️  Brand Distribution:`);
    Object.entries(brandDistribution).forEach(([brand, count]) => {
      const percentage = ((count / results.length) * 100).toFixed(1);
      console.log(`   ${brand}: ${count} devices (${percentage}%)`);
    });

    // Show status distribution
    const statusDistribution = {};
    results.forEach((device) => {
      statusDistribution[device.status] =
        (statusDistribution[device.status] || 0) + 1;
    });

    console.log(`\n📊 Device Status Distribution:`);
    Object.entries(statusDistribution).forEach(([status, count]) => {
      const percentage = ((count / results.length) * 100).toFixed(1);
      console.log(`   ${status}: ${count} devices (${percentage}%)`);
    });

    // Show sample of created devices
    if (results.length > 0) {
      console.log(`\n📱 Sample of created devices:`);
      results.slice(0, 10).forEach((device, index) => {
        console.log(
          `   ${index + 1}. ${device.brand} ${device.model} (${device.type})`
        );
        console.log(
          `      Serial: ${device.serialNumber} | Battery: ${
            device.batteryLevel
          }% | Status: ${device.status} | Active: ${
            device.isActive ? "Yes" : "No"
          }`
        );
      });
      if (results.length > 10) {
        console.log(`   ... and ${results.length - 10} more devices`);
      }
    }

    return results;
  } catch (error) {
    console.error("❌ Error during device seeding:", error);
    throw error;
  }
};

// Function to clear all device data
const clearDeviceData = async () => {
  try {
    console.log("🗑️  Clearing all wearable device data...");

    const deletedCount = await WearableDevice.destroy({ where: {} });

    console.log(`✅ Cleared ${deletedCount} wearable devices`);
    return deletedCount;
  } catch (error) {
    console.error("❌ Error clearing device data:", error);
    throw error;
  }
};

// Function to show current device count
const showCurrentDeviceCount = async () => {
  try {
    const totalDevices = await WearableDevice.count();

    // Get count by status
    const availableDevices = await WearableDevice.count({
      where: { device_status: "Available" },
    });

    const activeDevices = await WearableDevice.count({
      where: { is_active: true },
    });

    console.log("📊 Current Device Count:");
    console.log(`   Total Devices: ${totalDevices}`);
    console.log(`   Available Devices: ${availableDevices}`);
    console.log(`   Active Devices: ${activeDevices}`);

    return { totalDevices, availableDevices, activeDevices };
  } catch (error) {
    console.error("❌ Error getting device count:", error);
    return { totalDevices: 0, availableDevices: 0, activeDevices: 0 };
  }
};

// Export functions
module.exports = {
  seedWearableDevices,
  clearDeviceData,
  showCurrentDeviceCount,
};

// If this script is run directly
if (require.main === module) {
  const deviceCount = process.argv[2] ? parseInt(process.argv[2]) : 500;

  // Connect to database and run seeding
  const { sequelize } = require("../models");

  sequelize
    .authenticate()
    .then(async () => {
      console.log("✅ Database connected successfully.");

      // Show current device count first
      await showCurrentDeviceCount();

      // Ask for confirmation if clearing existing data
      if (process.argv.includes("--clear")) {
        console.log("\n⚠️  Clearing existing device data first...");
        await clearDeviceData();
      }

      // Run device seeding
      return seedWearableDevices(deviceCount);
    })
    .then((results) => {
      console.log("\n🎯 Device seeding finished successfully!");
      console.log(`📱 Created ${results.length} wearable devices`);
      console.log(`🏪 All devices are ready for allocation to guests!`);
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Device seeding failed:", error);
      process.exit(1);
    });
}
