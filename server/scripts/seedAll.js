const { seedGuests, clearGuestData } = require("./seedGuests");
const { seedRides, clearRideData } = require("./seedRides");
const { User } = require("../models");
const bcrypt = require("bcryptjs");

// Sample admin user data
const adminUsers = [
  {
    username: "admin",
    email: "admin@safepulse.com",
    password: "admin123",
    firstName: "System",
    lastName: "Administrator",
    role: "admin",
    phoneNumber: "555-0001",
    isActive: true,
  },
  {
    username: "manager",
    email: "manager@safepulse.com",
    password: "manager123",
    firstName: "Park",
    lastName: "Manager",
    role: "manager",
    phoneNumber: "555-0002",
    isActive: true,
  },
  {
    username: "staff",
    email: "staff@safepulse.com",
    password: "staff123",
    firstName: "Park",
    lastName: "Staff",
    role: "staff",
    phoneNumber: "555-0003",
    isActive: true,
  },
];

// Function to seed admin users
const seedUsers = async () => {
  try {
    console.log("Starting to seed admin users...");

    for (const userData of adminUsers) {
      // Check if user already exists
      const existingUser = await User.findOne({
        where: {
          [require("sequelize").Op.or]: [
            { email: userData.email },
            { username: userData.username },
          ],
        },
      });

      if (existingUser) {
        console.log(`User ${userData.username} already exists, skipping...`);
        continue;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 12);

      // Create user
      const user = await User.create({
        ...userData,
        password: hashedPassword,
      });

      console.log(`Created user: ${userData.username} (${userData.role})`);
    }

    console.log("Successfully seeded admin users!");
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
};

// Function to clear all user data
const clearUserData = async () => {
  try {
    console.log("Clearing all user data...");
    await User.destroy({ where: {} });
    console.log("All user data cleared successfully!");
  } catch (error) {
    console.error("Error clearing user data:", error);
    throw error;
  }
};

// Main function to seed all data
const seedAll = async (guestCount = 50) => {
  try {
    console.log("=== Starting complete database seeding ===");
    console.log(
      `Seeding with today's date: ${new Date().toISOString().split("T")[0]}`
    );

    // Step 1: Seed admin users
    console.log("\n1. Seeding admin users...");
    await seedUsers();

    // Step 2: Seed guests
    console.log("\n2. Seeding guests...");
    await seedGuests(guestCount);

    // Step 3: Seed rides (depends on guests being seeded first)
    console.log("\n3. Seeding rides...");
    await seedRides();

    console.log("\n=== All seeding completed successfully! ===");
    console.log(`\nData seeded for: ${new Date().toLocaleDateString()}`);
    console.log("\nDefault admin credentials:");
    console.log("Username: admin, Password: admin123");
    console.log("Username: manager, Password: manager123");
    console.log("Username: staff, Password: staff123");
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error;
  }
};

// Function to clear all data
const clearAll = async () => {
  try {
    console.log("=== Clearing all database data ===");

    await clearRideData();
    await clearGuestData();
    await clearUserData();

    console.log("=== All data cleared successfully! ===");
  } catch (error) {
    console.error("Error clearing data:", error);
    throw error;
  }
};

// Export functions
module.exports = {
  seedAll,
  clearAll,
  seedUsers,
  clearUserData,
};

// If this script is run directly
if (require.main === module) {
  const guestCount = process.argv[2] ? parseInt(process.argv[2]) : 50;
  const { sequelize } = require("../models");

  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connected successfully.");
      console.log(`Today's date: ${new Date().toLocaleDateString()}`);
      return seedAll(guestCount);
    })
    .then(() => {
      console.log("Complete seeding finished successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding failed:", error);
      process.exit(1);
    });
}
