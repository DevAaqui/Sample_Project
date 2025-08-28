module.exports = (sequelize, DataTypes) => {
  const Guest = sequelize.define(
    "Guest",
    {
      guest_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female", "Other"),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      phone_number: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      emergency_contact_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      emergency_contact_phone: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      known_conditions: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      allergies: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      baseline_heart_rate: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      safe_hr_max: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      safe_hr_min: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      weight_kg: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      height_cm: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      preferred_units: {
        type: DataTypes.ENUM("metric", "imperial"),
        allowNull: true,
      },
      // New field for device allocation
      device_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "wearable_devices",
          key: "device_id",
        },
        comment: "Assigned wearable device ID",
      },
      device_assigned_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "When the device was assigned to this guest",
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
      tableName: "guests",
      timestamps: true,
      indexes: [
        {
          fields: ["email"],
        },
        {
          fields: ["phone_number"],
        },
        // New index for device queries
        {
          fields: ["device_id"],
        },
        // Composite index for device assignment tracking
        {
          fields: ["device_id", "device_assigned_date"],
        },
      ],
    }
  );

  Guest.associate = (models) => {
    // Guest has many WearableDevices (now through device_id)
    Guest.belongsTo(models.WearableDevice, {
      foreignKey: "device_id",
      as: "wearableDevice",
    });

    // Guest has many GuestMetrics
    Guest.hasMany(models.GuestMetric, {
      foreignKey: "guest_id",
      as: "metrics",
    });

    // Guest has many RideSessions
    Guest.hasMany(models.RideSession, {
      foreignKey: "guest_id",
      as: "rideSessions",
    });
  };

  return Guest;
};
