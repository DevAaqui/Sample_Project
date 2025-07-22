module.exports = (sequelize, DataTypes) => {
  const Guest = sequelize.define(
    "Guest",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      company: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      purpose: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      hostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      checkInTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      checkOutTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("pending", "checked_in", "checked_out", "expired"),
        defaultValue: "pending",
      },
      badgeNumber: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true,
      },
      accessLevel: {
        type: DataTypes.ENUM("restricted", "limited", "full"),
        defaultValue: "restricted",
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
      tableName: "guests",
      timestamps: true,
      indexes: [
        {
          fields: ["hostId"],
        },
        {
          fields: ["status"],
        },
        {
          unique: true,
          fields: ["badgeNumber"],
        },
      ],
    }
  );

  Guest.associate = (models) => {
    // Guest belongs to a Host (User)
    Guest.belongsTo(models.User, {
      foreignKey: "hostId",
      as: "host",
    });

    // Guest has many Activities
    Guest.hasMany(models.Activity, {
      foreignKey: "guestId",
      as: "activities",
    });

    // Guest has many Alerts
    Guest.hasMany(models.Alert, {
      foreignKey: "guestId",
      as: "alerts",
    });
  };

  return Guest;
};
