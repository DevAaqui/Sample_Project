module.exports = (sequelize, DataTypes) => {
  const MaintenanceRecord = sequelize.define(
    "MaintenanceRecord",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      vehicleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "vehicles",
          key: "id",
        },
      },
      systemId: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      maintenanceType: {
        type: DataTypes.ENUM(
          "preventive",
          "corrective",
          "emergency",
          "inspection",
          "upgrade",
          "repair",
          "replacement",
          "cleaning",
          "calibration"
        ),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      scheduledDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      completedDate: {
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
      priority: {
        type: DataTypes.ENUM("low", "medium", "high", "critical"),
        defaultValue: "medium",
      },
      assignedTo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      performedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      partsUsed: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      workHours: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      attachments: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      nextMaintenanceDate: {
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
      tableName: "maintenance_records",
      timestamps: true,
      indexes: [
        {
          fields: ["vehicleId"],
        },
        {
          fields: ["systemId"],
        },
        {
          fields: ["maintenanceType"],
        },
        {
          fields: ["status"],
        },
        {
          fields: ["priority"],
        },
        {
          fields: ["assignedTo"],
        },
        {
          fields: ["performedBy"],
        },
        {
          fields: ["scheduledDate"],
        },
        {
          fields: ["completedDate"],
        },
      ],
    }
  );

  MaintenanceRecord.associate = (models) => {
    // MaintenanceRecord belongs to a Vehicle (optional)
    MaintenanceRecord.belongsTo(models.Vehicle, {
      foreignKey: "vehicleId",
      as: "vehicle",
    });

    // MaintenanceRecord belongs to User assigned to perform it
    MaintenanceRecord.belongsTo(models.User, {
      foreignKey: "assignedTo",
      as: "assignedToUser",
    });

    // MaintenanceRecord belongs to User who performed it
    MaintenanceRecord.belongsTo(models.User, {
      foreignKey: "performedBy",
      as: "performedByUser",
    });
  };

  return MaintenanceRecord;
};
