module.exports = (sequelize, DataTypes) => {
  const SafetyReport = sequelize.define(
    "SafetyReport",
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
      reportType: {
        type: DataTypes.ENUM(
          "incident",
          "near_miss",
          "hazard",
          "injury",
          "illness",
          "property_damage",
          "security_breach",
          "environmental",
          "vehicle_accident",
          "other"
        ),
        allowNull: false,
      },
      severity: {
        type: DataTypes.ENUM("low", "medium", "high", "critical"),
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
      location: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      incidentDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      reportedDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.ENUM("open", "investigating", "resolved", "closed"),
        defaultValue: "open",
      },
      assignedTo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      witnesses: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      injuries: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      propertyDamage: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      rootCause: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      correctiveActions: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      attachments: {
        type: DataTypes.JSON,
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
      tableName: "safety_reports",
      timestamps: true,
      indexes: [
        {
          fields: ["userId"],
        },
        {
          fields: ["reportType"],
        },
        {
          fields: ["severity"],
        },
        {
          fields: ["status"],
        },
        {
          fields: ["assignedTo"],
        },
        {
          fields: ["incidentDate"],
        },
        {
          fields: ["reportedDate"],
        },
      ],
    }
  );

  SafetyReport.associate = (models) => {
    // SafetyReport belongs to the User who reported it
    SafetyReport.belongsTo(models.User, {
      foreignKey: "userId",
      as: "reporter",
    });

    // SafetyReport belongs to the User assigned to investigate
    SafetyReport.belongsTo(models.User, {
      foreignKey: "assignedTo",
      as: "assignedToUser",
    });
  };

  return SafetyReport;
};
