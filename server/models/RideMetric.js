module.exports = (sequelize, DataTypes) => {
  const RideMetric = sequelize.define(
    "RideMetric",
    {
      ride_metric_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      session_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "ride_sessions",
          key: "session_id",
        },
      },
      guest_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "guests",
          key: "guest_id",
        },
      },
      device_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "wearable_devices",
          key: "device_id",
        },
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      // Ride-specific metrics
      heart_rate: {
        type: DataTypes.SMALLINT,
        allowNull: true,
        comment: "Heart rate during ride in BPM",
      },
      g_force: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
        comment: "G-force experienced during ride",
      },
      // Additional health metrics similar to guest_metrics
      steps: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Steps taken during ride session",
      },
      calories_burned: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Calories burned during ride session",
      },
      blood_pressure_systolic: {
        type: DataTypes.SMALLINT,
        allowNull: true,
        comment: "Systolic blood pressure in mmHg during ride",
      },
      blood_pressure_diastolic: {
        type: DataTypes.SMALLINT,
        allowNull: true,
        comment: "Diastolic blood pressure in mmHg during ride",
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
      tableName: "ride_metrics",
      timestamps: true,
      indexes: [
        {
          fields: ["session_id"],
        },
        {
          fields: ["guest_id"],
        },
        {
          fields: ["device_id"],
        },
        {
          fields: ["timestamp"],
        },
        {
          fields: ["session_id", "timestamp"],
        },
        {
          fields: ["guest_id", "timestamp"],
        },
        {
          fields: ["guest_id", "session_id"],
        },
        // New indexes for health metrics
        {
          fields: ["heart_rate"],
        },
      ],
    }
  );

  RideMetric.associate = (models) => {
    // RideMetric belongs to a RideSession
    RideMetric.belongsTo(models.RideSession, {
      foreignKey: "session_id",
      as: "rideSession",
    });

    // RideMetric belongs to a Guest
    RideMetric.belongsTo(models.Guest, {
      foreignKey: "guest_id",
      as: "guest",
    });

    // RideMetric belongs to a WearableDevice
    RideMetric.belongsTo(models.WearableDevice, {
      foreignKey: "device_id",
      as: "device",
    });
  };

  return RideMetric;
};
