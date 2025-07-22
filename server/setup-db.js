const mysql = require("mysql2/promise");
require("dotenv").config();

async function setupDatabase() {
  try {
    // Create connection without database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
    });

    console.log("✅ Connected to MySQL server");

    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || "safepulse_db";
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`✅ Database '${dbName}' created or already exists`);

    // Use the database - FIXED: Use query instead of execute
    await connection.query(`USE ${dbName}`);

    // Create tables using Sequelize
    const { sequelize } = require("./models");

    // Sync all models
    await sequelize.sync({ force: true });
    console.log("✅ All tables created successfully");

    // Create sample admin user
    const bcrypt = require("bcryptjs");
    const { User } = require("./models");

    const hashedPassword = await bcrypt.hash("admin123", 12);

    await User.create({
      username: "admin",
      email: "admin@safepulse.com",
      password: hashedPassword,
      firstName: "System",
      lastName: "Administrator",
      role: "admin",
      isActive: true,
    });

    console.log("✅ Sample admin user created");
    console.log("   Username: admin");
    console.log("   Email: admin@safepulse.com");
    console.log("   Password: admin123");

    await connection.end();
    await sequelize.close();

    console.log("✅ Database setup completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    process.exit(1);
  }
}

setupDatabase();
