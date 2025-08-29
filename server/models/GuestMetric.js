module.exports = (sequelize, DataTypes) => {
  const GuestMetric = sequelize.define(
    "GuestMetric",
    {
      metric_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
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
      heart_rate: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      steps: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      calories_burned: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      // New columns added
      blood_pressure_systolic: {
        type: DataTypes.SMALLINT,
        allowNull: true,
        comment: "Systolic blood pressure in mmHg",
      },
      blood_pressure_diastolic: {
        type: DataTypes.SMALLINT,
        allowNull: true,
        comment: "Diastolic blood pressure in mmHg",
      },
      stress_level: {
        type: DataTypes.ENUM("Low", "Medium", "High"),
        allowNull: true,
        comment: "Stress level assessment",
      },
      activity_level: {
        type: DataTypes.ENUM("Low", "Medium", "High"),
        allowNull: true,
        comment: "Activity level assessment",
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
      tableName: "guest_metrics",
      timestamps: true,
      indexes: [
        {
          fields: ["guest_id"],
        },
        {
          fields: ["timestamp"],
        },
        {
          fields: ["guest_id", "timestamp"],
        },
        // New index for stress level queries
        {
          fields: ["stress_level"],
        },
        // New index for activity level queries
        {
          fields: ["activity_level"],
        },
      ],
    }
  );

  GuestMetric.associate = (models) => {
    // GuestMetric belongs to a Guest
    GuestMetric.belongsTo(models.Guest, {
      foreignKey: "guest_id",
      as: "guest",
    });
  };

  return GuestMetric;
};
