module.exports = (sequelize, DataTypes) => {
  const GuestMetric = sequelize.define(
    "GuestMetric",
    {
      metric_id: {
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
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      heart_rate: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      blood_pressure: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      steps: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      calories_burned: {
        type: DataTypes.INTEGER,
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
      tableName: "guest_metrics",
      timestamps: true,
      indexes: [
        {
          fields: ["guest_id"],
        },
        {
          fields: ["timestamp"],
        },
        {
          fields: ["guest_id", "timestamp"],
        },
      ],
    }
  );

  GuestMetric.associate = (models) => {
    // GuestMetric belongs to a Guest
    GuestMetric.belongsTo(models.Guest, {
      foreignKey: "guest_id",
      as: "guest",
    });
  };

  return GuestMetric;
};
