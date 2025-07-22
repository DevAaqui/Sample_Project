module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define(
    "Vehicle",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      vehicleNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      make: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      licensePlate: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      vehicleType: {
        type: DataTypes.ENUM(
          "sedan",
          "suv",
          "van",
          "bus",
          "truck",
          "motorcycle"
        ),
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fuelType: {
        type: DataTypes.ENUM("gasoline", "diesel", "electric", "hybrid"),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          "active",
          "maintenance",
          "out_of_service",
          "retired"
        ),
        defaultValue: "active",
      },
      lastMaintenanceDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      nextMaintenanceDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      mileage: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      insuranceExpiry: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      registrationExpiry: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      assignedDriverId: {
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
      tableName: "vehicles",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["vehicleNumber"],
        },
        {
          unique: true,
          fields: ["licensePlate"],
        },
        {
          fields: ["status"],
        },
        {
          fields: ["assignedDriverId"],
        },
      ],
    }
  );

  Vehicle.associate = (models) => {
    // Vehicle belongs to an assigned Driver (User)
    Vehicle.belongsTo(models.User, {
      foreignKey: "assignedDriverId",
      as: "assignedDriver",
    });

    // Vehicle has many Rides
    Vehicle.hasMany(models.Ride, {
      foreignKey: "vehicleId",
      as: "rides",
    });

    // Vehicle has many MaintenanceRecords
    Vehicle.hasMany(models.MaintenanceRecord, {
      foreignKey: "vehicleId",
      as: "maintenanceRecords",
    });
  };

  return Vehicle;
};
