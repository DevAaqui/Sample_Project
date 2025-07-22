module.exports = (sequelize, DataTypes) => {
  const Ride = sequelize.define(
    "Ride",
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
      vehicleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "vehicles",
          key: "id",
        },
      },
      rideType: {
        type: DataTypes.ENUM(
          "pickup",
          "dropoff",
          "shuttle",
          "emergency",
          "maintenance"
        ),
        allowNull: false,
      },
      startLocation: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      endLocation: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(
          "scheduled",
          "in_progress",
          "completed",
          "cancelled"
        ),
        defaultValue: "scheduled",
      },
      distance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      duration: {
        type: DataTypes.INTEGER, // in minutes
        allowNull: true,
      },
      passengerCount: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      driverId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      notes: {
        type: DataTypes.TEXT,
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
      tableName: "rides",
      timestamps: true,
      indexes: [
        {
          fields: ["userId"],
        },
        {
          fields: ["vehicleId"],
        },
        {
          fields: ["driverId"],
        },
        {
          fields: ["status"],
        },
        {
          fields: ["startTime"],
        },
      ],
    }
  );

  Ride.associate = (models) => {
    // Ride belongs to a User (passenger)
    Ride.belongsTo(models.User, {
      foreignKey: "userId",
      as: "passenger",
    });

    // Ride belongs to a Driver (User)
    Ride.belongsTo(models.User, {
      foreignKey: "driverId",
      as: "driver",
    });

    // Ride belongs to a Vehicle
    Ride.belongsTo(models.Vehicle, {
      foreignKey: "vehicleId",
      as: "vehicle",
    });

    // Ride has many Activities
    Ride.hasMany(models.Activity, {
      foreignKey: "rideId",
      as: "activities",
    });
  };

  return Ride;
};
