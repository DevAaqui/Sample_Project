module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define(
    "Activity",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      guestId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "guests",
          key: "id",
        },
      },
      rideId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "rides",
          key: "id",
        },
      },
      activityType: {
        type: DataTypes.ENUM(
          "login",
          "logout",
          "check_in",
          "check_out",
          "ride_start",
          "ride_end",
          "location_change",
          "system_access",
          "file_access",
          "emergency_call",
          "maintenance_request",
          "safety_report",
          "health_check"
        ),
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ipAddress: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      userAgent: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      deviceInfo: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      metadata: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      severity: {
        type: DataTypes.ENUM("low", "medium", "high", "critical"),
        defaultValue: "low",
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
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
      tableName: "activities",
      timestamps: true,
      indexes: [
        {
          fields: ["userId"],
        },
        {
          fields: ["guestId"],
        },
        {
          fields: ["rideId"],
        },
        {
          fields: ["activityType"],
        },
        {
          fields: ["timestamp"],
        },
        {
          fields: ["severity"],
        },
      ],
    }
  );

  Activity.associate = (models) => {
    // Activity belongs to a User (optional)
    Activity.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    // Activity belongs to a Guest (optional)
    Activity.belongsTo(models.Guest, {
      foreignKey: "guestId",
      as: "guest",
    });

    // Activity belongs to a Ride (optional)
    Activity.belongsTo(models.Ride, {
      foreignKey: "rideId",
      as: "ride",
    });
  };

  return Activity;
};
