module.exports = (sequelize, DataTypes) => {
  const Alert = sequelize.define(
    "Alert",
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
      alertType: {
        type: DataTypes.ENUM(
          "safety",
          "health",
          "security",
          "maintenance",
          "system",
          "emergency",
          "weather",
          "traffic",
          "schedule",
          "reminder"
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
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("active", "acknowledged", "resolved", "dismissed"),
        defaultValue: "active",
      },
      acknowledgedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      acknowledgedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      resolvedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      resolvedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      metadata: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      expiresAt: {
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
      tableName: "alerts",
      timestamps: true,
      indexes: [
        {
          fields: ["userId"],
        },
        {
          fields: ["guestId"],
        },
        {
          fields: ["alertType"],
        },
        {
          fields: ["severity"],
        },
        {
          fields: ["status"],
        },
        {
          fields: ["createdAt"],
        },
      ],
    }
  );

  Alert.associate = (models) => {
    // Alert belongs to a User (optional)
    Alert.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    // Alert belongs to a Guest (optional)
    Alert.belongsTo(models.Guest, {
      foreignKey: "guestId",
      as: "guest",
    });

    // Alert belongs to User who acknowledged it
    Alert.belongsTo(models.User, {
      foreignKey: "acknowledgedBy",
      as: "acknowledgedByUser",
    });

    // Alert belongs to User who resolved it
    Alert.belongsTo(models.User, {
      foreignKey: "resolvedBy",
      as: "resolvedByUser",
    });
  };

  return Alert;
};
