module.exports = (sequelize, DataTypes) => {
  const RideMetric = sequelize.define(
    "RideMetric",
    {
      ride_metric_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      session_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "ride_sessions",
          key: "session_id",
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
      g_force: {
        type: DataTypes.DECIMAL(3, 2),
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
      tableName: "ride_metrics",
      timestamps: true,
      indexes: [
        {
          fields: ["session_id"],
        },
        {
          fields: ["timestamp"],
        },
        {
          fields: ["session_id", "timestamp"],
        },
      ],
    }
  );

  RideMetric.associate = (models) => {
    // RideMetric belongs to a RideSession
    RideMetric.belongsTo(models.RideSession, {
      foreignKey: "session_id",
      as: "rideSession",
    });
  };

  return RideMetric;
};
