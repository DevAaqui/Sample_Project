module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 50],
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "manager", "staff", "guest"),
        defaultValue: "staff",
      },
      phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "users",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
        {
          unique: true,
          fields: ["username"],
        },
      ],
    }
  );

  User.associate = (models) => {
    // User has many Rides
    User.hasMany(models.Ride, {
      foreignKey: "userId",
      as: "rides",
    });

    // User has many Alerts
    User.hasMany(models.Alert, {
      foreignKey: "userId",
      as: "alerts",
    });

    // User has many Activities
    User.hasMany(models.Activity, {
      foreignKey: "userId",
      as: "activities",
    });

    // User has many HealthMetrics
    User.hasMany(models.HealthMetric, {
      foreignKey: "userId",
      as: "healthMetrics",
    });

    // User has many SafetyReports
    User.hasMany(models.SafetyReport, {
      foreignKey: "userId",
      as: "safetyReports",
    });
  };

  return User;
};
