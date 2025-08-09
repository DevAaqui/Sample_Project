module.exports = (sequelize, DataTypes) => {
  const WearableDevice = sequelize.define(
    "WearableDevice",
    {
      device_id: {
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
      device_type: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      device_serial_number: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true,
      },
      assigned_date: {
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
      tableName: "wearable_devices",
      timestamps: true,
      indexes: [
        {
          fields: ["guest_id"],
        },
        {
          unique: true,
          fields: ["device_serial_number"],
        },
      ],
    }
  );

  WearableDevice.associate = (models) => {
    // WearableDevice belongs to a Guest
    WearableDevice.belongsTo(models.Guest, {
      foreignKey: "guest_id",
      as: "guest",
    });
  };

  return WearableDevice;
};
