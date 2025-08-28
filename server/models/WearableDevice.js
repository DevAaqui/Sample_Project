module.exports = (sequelize, DataTypes) => {
  const WearableDevice = sequelize.define(
    "WearableDevice",
    {
      device_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
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
      device_brand: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: "Device manufacturer brand",
      },
      device_model: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: "Device model name",
      },
      assigned_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: "Whether the device is currently active and tracking",
      },
      device_status: {
        type: DataTypes.ENUM(
          "Available",
          "In Use",
          "Maintenance",
          "Reserved",
          "Testing"
        ),
        allowNull: false,
        defaultValue: "Available",
        comment: "Current status of the device",
      },
      battery_level: {
        type: DataTypes.SMALLINT,
        allowNull: true,
        comment: "Battery level percentage (1-100)",
      },
      firmware_version: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: "Current firmware version",
      },
      last_sync: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "Last time device synced data",
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
          unique: true,
          fields: ["device_serial_number"],
        },
        {
          fields: ["is_active"],
        },
        {
          fields: ["device_status"],
        },
        {
          fields: ["device_type"],
        },
        {
          fields: ["device_brand"],
        },
      ],
    }
  );

  // Remove guest association since devices are now completely independent
  // WearableDevice.associate = (models) => {
  //   // No more guest association
  // };

  return WearableDevice;
};
