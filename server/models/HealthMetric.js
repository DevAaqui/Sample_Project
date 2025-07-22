module.exports = (sequelize, DataTypes) => {
  const HealthMetric = sequelize.define(
    "HealthMetric",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      metricType: {
        type: DataTypes.ENUM(
          "heart_rate",
          "blood_pressure",
          "temperature",
          "oxygen_saturation",
          "respiratory_rate",
          "blood_glucose",
          "weight",
          "bmi",
          "steps",
          "sleep_hours",
          "stress_level",
          "mood",
          "fatigue_level"
        ),
        allowNull: false,
      },
      value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      source: {
        type: DataTypes.ENUM("manual", "device", "app", "system"),
        defaultValue: "manual",
      },
      deviceId: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("normal", "warning", "critical", "error"),
        defaultValue: "normal",
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      metadata: {
        type: DataTypes.JSON,
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
      tableName: "health_metrics",
      timestamps: true,
      indexes: [
        {
          fields: ["userId"],
        },
        {
          fields: ["metricType"],
        },
        {
          fields: ["timestamp"],
        },
        {
          fields: ["status"],
        },
        {
          fields: ["source"],
        },
      ],
    }
  );

  HealthMetric.associate = (models) => {
    // HealthMetric belongs to a User
    HealthMetric.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return HealthMetric;
};
