const { Guest, WearableDevice } = require("../models");
const { Op } = require("sequelize");

// Sample data arrays for generating random guests
const firstNames = [
  "John",
  "Jane",
  "Michael",
  "Sarah",
  "David",
  "Emily",
  "Robert",
  "Lisa",
  "James",
  "Maria",
  "William",
  "Jennifer",
  "Richard",
  "Linda",
  "Joseph",
  "Patricia",
  "Thomas",
  "Barbara",
  "Christopher",
  "Elizabeth",
  "Daniel",
  "Susan",
  "Matthew",
  "Jessica",
  "Anthony",
  "Sarah",
  "Mark",
  "Karen",
  "Donald",
  "Nancy",
  "Steven",
  "Betty",
  "Paul",
  "Helen",
  "Andrew",
  "Sandra",
  "Joshua",
  "Donna",
  "Kenneth",
  "Carol",
  "Kevin",
  "Ruth",
  "Brian",
  "Sharon",
  "George",
  "Michelle",
  "Timothy",
  "Laura",
  "Ronald",
  "Emily",
  "Jason",
  "Kimberly",
  "Edward",
  "Deborah",
  "Jeffrey",
  "Dorothy",
  "Ryan",
  "Lisa",
  "Jacob",
  "Nancy",
  "Gary",
  "Karen",
  "Nicholas",
  "Betty",
  "Eric",
  "Helen",
  "Jonathan",
  "Sandra",
  "Stephen",
  "Donna",
  "Larry",
  "Carol",
  "Justin",
  "Ruth",
  "Scott",
  "Julie",
  "Brandon",
  "Joyce",
  "Benjamin",
  "Virginia",
  "Samuel",
  "Victoria",
  "Frank",
  "Kelly",
  "Gregory",
  "Lauren",
  "Raymond",
  "Joan",
  "Alexander",
  "Evelyn",
  "Patrick",
  "Judith",
  "Jack",
  "Megan",
  "Dennis",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
  "King",
  "Wright",
  "Scott",
  "Torres",
  "Nguyen",
  "Hill",
  "Flores",
  "Green",
  "Adams",
  "Nelson",
  "Baker",
  "Hall",
  "Rivera",
  "Campbell",
  "Mitchell",
  "Carter",
  "Roberts",
  "Gomez",
  "Phillips",
  "Evans",
  "Turner",
  "Diaz",
  "Parker",
  "Cruz",
  "Edwards",
  "Collins",
  "Reyes",
  "Stewart",
  "Morris",
  "Morales",
  "Murphy",
  "Cook",
  "Rogers",
  "Gutierrez",
  "Ortiz",
  "Morgan",
  "Cooper",
  "Peterson",
  "Bailey",
  "Reed",
  "Kelly",
  "Howard",
  "Ramos",
  "Kim",
  "Cox",
  "Ward",
  "Richardson",
  "Watson",
  "Brooks",
  "Chavez",
  "Wood",
  "James",
  "Bennett",
  "Gray",
  "Mendoza",
  "Ruiz",
  "Hughes",
  "Price",
  "Alvarez",
  "Castillo",
  "Sanders",
  "Patel",
  "Myers",
  "Long",
  "Ross",
  "Foster",
  "Jimenez",
];

// Generate random data functions
const generateRandomName = () => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return { firstName, lastName };
};

const generateRandomDOB = () => {
  const start = new Date(1960, 0, 1);
  const end = new Date(2010, 11, 31);
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return randomDate.toISOString().split("T")[0];
};

const generateRandomGender = () => {
  // Use the exact ENUM values from the Guest model: "Male", "Female", "Other"
  const genders = ["Male", "Female", "Other"];
  return genders[Math.floor(Math.random() * genders.length)];
};

const generateEmail = (firstName, lastName) => {
  const domains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "icloud.com",
  ];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const randomNum = Math.floor(Math.random() * 1000);
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNum}@${domain}`;
};

const generatePhoneNumber = () => {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const prefix = Math.floor(Math.random() * 900) + 100;
  const lineNumber = Math.floor(Math.random() * 9000) + 1000;
  return `${areaCode}-${prefix}-${lineNumber}`;
};

const generateHealthData = () => {
  const baselineHeartRate = Math.floor(Math.random() * 40) + 60; // 60-100 bpm
  const safeHrMax = baselineHeartRate + Math.floor(Math.random() * 30) + 20; // 20-50 above baseline
  const safeHrMin = Math.max(
    60,
    baselineHeartRate - Math.floor(Math.random() * 20) - 10
  ); // 10-30 below baseline

  return {
    baseline_heart_rate: baselineHeartRate,
    safe_hr_max: safeHrMax,
    safe_hr_min: safeHrMin,
    weight_kg: Math.floor(Math.random() * 60) + 40, // 40-100 kg
    height_cm: Math.floor(Math.random() * 50) + 150, // 150-200 cm
    preferred_units: Math.random() > 0.5 ? "metric" : "imperial",
  };
};

const generateEmergencyContact = () => {
  const contactNames = ["Spouse", "Parent", "Sibling", "Friend", "Guardian"];
  const contactName =
    contactNames[Math.floor(Math.random() * contactNames.length)];
  const contactPhone = generatePhoneNumber();

  return {
    emergency_contact_name: contactName,
    emergency_contact_phone: contactPhone,
  };
};

const generateMedicalInfo = () => {
  const conditions = [
    "None",
    "Asthma",
    "Diabetes",
    "Hypertension",
    "Heart Condition",
    "Allergies",
  ];
  const allergies = [
    "None",
    "Peanuts",
    "Shellfish",
    "Dairy",
    "Gluten",
    "Medications",
  ];

  return {
    known_conditions:
      Math.random() > 0.7
        ? conditions[Math.floor(Math.random() * conditions.length)]
        : "None",
    allergies:
      Math.random() > 0.8
        ? allergies[Math.floor(Math.random() * allergies.length)]
        : "None",
  };
};

// Function to find and allocate an available wearable device
const findAndAllocateDevice = async () => {
  try {
    // Find first available device that is active and available
    const availableDevice = await WearableDevice.findOne({
      where: {
        is_active: true,
        device_status: "Available",
      },
      order: [["device_id", "ASC"]], // Get the first available device
    });

    if (!availableDevice) {
      throw new Error(
        "No available wearable devices found. Please seed devices first."
      );
    }

    // Update device status to "In Use" and set assigned_date
    await availableDevice.update({
      device_status: "In Use",
      assigned_date: new Date(),
    });

    return availableDevice.device_id;
  } catch (error) {
    console.error("❌ Error finding/allocating device:", error);
    throw error;
  }
};

// Create a single guest and allocate device
const createSingleGuest = async (guestNumber, totalGuests) => {
  try {
    // Generate guest data
    const { firstName, lastName } = generateRandomName();
    const dob = generateRandomDOB();
    const gender = generateRandomGender();
    const email = generateEmail(firstName, lastName);
    const phoneNumber = generatePhoneNumber();
    const healthData = generateHealthData();
    const emergencyContact = generateEmergencyContact();
    const medicalInfo = generateMedicalInfo();

    // Get current timestamp for this guest
    const currentTime = new Date();

    console.log(
      `\n🔄 Creating Guest ${guestNumber}/${totalGuests} at ${currentTime.toLocaleTimeString()}`
    );
    console.log(`    Guest: ${firstName} ${lastName}`);

    // Find and allocate an available device first
    console.log(`   📱 Finding available tracking device...`);
    const deviceId = await findAndAllocateDevice();
    console.log(`   ✅ Device allocated: ID ${deviceId}`);

    // Create guest with device allocation
    const guest = await Guest.create({
      first_name: firstName,
      last_name: lastName,
      dob: dob,
      gender: gender,
      email: email,
      phone_number: phoneNumber,
      emergency_contact_name: emergencyContact.emergency_contact_name,
      emergency_contact_phone: emergencyContact.emergency_contact_phone,
      known_conditions: medicalInfo.known_conditions,
      allergies: medicalInfo.allergies,
      baseline_heart_rate: healthData.baseline_heart_rate,
      safe_hr_max: healthData.safe_hr_max,
      safe_hr_min: healthData.safe_hr_min,
      weight_kg: healthData.weight_kg,
      height_cm: healthData.height_cm,
      preferred_units: healthData.preferred_units,
      device_id: deviceId,
      device_assigned_date: currentTime,
      createdAt: currentTime,
      updatedAt: currentTime,
    });

    console.log(`   ✅ Guest created with ID: ${guest.guest_id}`);
    console.log(
      `    Device ID ${deviceId} assigned to guest ${guest.guest_id}`
    );

    const result = {
      guestId: guest.guest_id,
      name: `${firstName} ${lastName}`,
      deviceId: deviceId,
      timestamp: currentTime.toISOString(),
      guestNumber: guestNumber,
    };

    console.log(
      `   🎉 Guest ${guestNumber} completed: ${firstName} ${lastName}`
    );
    console.log(
      `   📈 Progress: ${((guestNumber / totalGuests) * 100).toFixed(1)}%`
    );

    return result;
  } catch (error) {
    console.error(`❌ Error creating guest ${guestNumber}:`, error);
    throw error;
  }
};

// Progressive seeding function with setTimeout
const seedGuestsProgressive = async (totalGuests = 10, intervalMinutes = 1) => {
  return new Promise((resolve, reject) => {
    try {
      const today = new Date();
      const todayDate = today.toLocaleDateString();
      const todayTime = today.toLocaleTimeString();

      console.log(
        "🚀 Starting Progressive Guest Seeding with Device Allocation"
      );
      console.log(`📅 Today's date: ${todayDate}`);
      console.log(`🕐 Current time: ${todayTime}`);
      console.log(`📋 Total guests to create: ${totalGuests}`);
      console.log(`⏱️  Interval between guests: ${intervalMinutes} minute(s)`);
      console.log(
        `⏰ Estimated completion time: ${totalGuests * intervalMinutes} minutes`
      );
      console.log(`🕐 Started at: ${today.toLocaleString()}`);

      const results = [];
      const intervalMs = intervalMinutes * 60 * 1000;
      let currentGuest = 1;

      const processNextGuest = async () => {
        try {
          if (currentGuest <= totalGuests) {
            const result = await createSingleGuest(currentGuest, totalGuests);
            results.push(result);

            if (currentGuest < totalGuests) {
              // Schedule next guest
              const nextStartTime = new Date(Date.now() + intervalMs);
              console.log(
                `\n⏳ Next guest will be created at: ${nextStartTime.toLocaleString()}`
              );
              console.log(`   (${intervalMinutes} minute interval)`);

              setTimeout(processNextGuest, intervalMs);
            } else {
              // All guests completed
              const endTime = new Date();
              const totalDuration = (
                (endTime.getTime() - today.getTime()) /
                (1000 * 60)
              ).toFixed(1);

              console.log("\n🎉 Progressive seeding completed successfully!");
              console.log(`📊 Summary:`);
              console.log(
                `   Total guests created: ${results.length}/${totalGuests}`
              );
              console.log(`   Successful: ${results.length}`);
              console.log(`   Failed: ${totalGuests - results.length}`);
              console.log(`   All data timestamped for: ${todayDate}`);
              console.log(`🕐 Started at: ${todayTime}`);
              console.log(`⏱️  Total duration: ${totalDuration} minutes`);

              // Verify today's data
              console.log(`\n🔍 Verifying today's data...`);
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

              const todayGuests = await Guest.count({
                where: {
                  createdAt: {
                    [Op.gte]: todayStart,
                    [Op.lt]: todayEnd,
                  },
                },
              });

              const todayDevices = await WearableDevice.count({
                where: {
                  assigned_date: {
                    [Op.gte]: todayStart,
                    [Op.lt]: todayEnd,
                  },
                },
              });

              console.log(`   ✅ Guests created today: ${todayGuests}`);
              console.log(`   ✅ Devices assigned today: ${todayDevices}`);

              // Show sample of created guests
              if (results.length > 0) {
                console.log(
                  `\n📋 Sample of created guests (all timestamped for today):`
                );
                results.slice(0, 5).forEach((result, index) => {
                  const timestamp = new Date(result.timestamp).toLocaleString();
                  console.log(
                    `   ${index + 1}. ${result.name} (ID: ${
                      result.guestId
                    }) - Device: ${result.deviceId} - ${timestamp}`
                  );
                });
                if (results.length > 5) {
                  console.log(`   ... and ${results.length - 5} more`);
                }
              }

              resolve(results);
            }

            currentGuest++;
          }
        } catch (error) {
          console.error(`❌ Error processing guest ${currentGuest}:`, error);
          // Continue with next guest instead of stopping
          currentGuest++;
          if (currentGuest <= totalGuests) {
            setTimeout(processNextGuest, intervalMs);
          } else {
            reject(error);
          }
        }
      };

      // Start the first guest
      processNextGuest();
    } catch (error) {
      reject(error);
    }
  });
};

// Function to clear all guest data (devices remain but status reset)
const clearGuestData = async () => {
  try {
    console.log("🗑️  Clearing all guest data...");

    // Reset device statuses back to "Available" for devices that were assigned to guests
    await WearableDevice.update(
      {
        device_status: "Available",
        assigned_date: null,
      },
      {
        where: {
          device_status: "In Use",
        },
      }
    );

    // Delete all guests
    await Guest.destroy({ where: {} });

    console.log("✅ All guest data cleared and devices reset to available!");
  } catch (error) {
    console.error("❌ Error clearing data:", error);
    throw error;
  }
};

// Function to show current guest and device count
const showCurrentCounts = async () => {
  try {
    const guestCount = await Guest.count();
    const deviceCount = await WearableDevice.count();
    const availableDevices = await WearableDevice.count({
      where: {
        is_active: true,
        device_status: "Available",
      },
    });
    const assignedDevices = await WearableDevice.count({
      where: {
        device_status: "In Use",
      },
    });

    // Get today's counts
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

    const todayGuests = await Guest.count({
      where: {
        createdAt: {
          [Op.gte]: todayStart,
          [Op.lt]: todayEnd,
        },
      },
    });

    const todayDeviceAssignments = await WearableDevice.count({
      where: {
        assigned_date: {
          [Op.gte]: todayStart,
          [Op.lt]: todayEnd,
        },
      },
    });

    console.log("📊 Current Database Counts:");
    console.log(`   Total Guests: ${guestCount}`);
    console.log(`   Total Wearable Devices: ${deviceCount}`);
    console.log(`   Available Devices: ${availableDevices}`);
    console.log(`   Assigned Devices: ${assignedDevices}`);
    console.log(`   Guests Created Today: ${todayGuests}`);
    console.log(`   Device Assignments Today: ${todayDeviceAssignments}`);

    return {
      guestCount,
      deviceCount,
      availableDevices,
      assignedDevices,
      todayGuests,
      todayDeviceAssignments,
    };
  } catch (error) {
    console.error("❌ Error getting counts:", error);
    return {
      guestCount: 0,
      deviceCount: 0,
      availableDevices: 0,
      assignedDevices: 0,
      todayGuests: 0,
      todayDeviceAssignments: 0,
    };
  }
};

// Export functions
module.exports = {
  seedGuestsProgressive,
  clearGuestData,
  showCurrentCounts,
};

// If this script is run directly
if (require.main === module) {
  const totalGuests = process.argv[2] ? parseInt(process.argv[2]) : 5;
  const intervalMinutes = process.argv[3] ? parseInt(process.argv[3]) : 1;

  // Connect to database and run progressive seeding
  const { sequelize } = require("../models");

  sequelize
    .authenticate()
    .then(async () => {
      console.log("✅ Database connected successfully.");

      // Show current counts first
      await showCurrentCounts();

      // Check if we have enough available devices
      const { availableDevices } = await showCurrentCounts();
      if (availableDevices < totalGuests) {
        console.error(
          `❌ Not enough available devices! Need ${totalGuests}, but only ${availableDevices} available.`
        );
        console.log(
          "💡 Please run the wearable device seeding script first to create more devices."
        );
        process.exit(1);
      }

      // Ask for confirmation if clearing existing data
      if (process.argv.includes("--clear")) {
        console.log("\n⚠️  Clearing existing guest data first...");
        await clearGuestData();
      }

      // Run progressive seeding
      return seedGuestsProgressive(totalGuests, intervalMinutes);
    })
    .then((results) => {
      console.log("\n🎯 Progressive seeding finished successfully!");
      console.log(
        `📋 Created ${results.length} guests with allocated tracking devices`
      );
      console.log(`📅 All data is timestamped for today!`);
      console.log(
        `⏱️  Guests were created one by one at ${
          process.argv[3] || 1
        } minute intervals`
      );
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Progressive seeding failed:", error);
      process.exit(1);
    });
}
