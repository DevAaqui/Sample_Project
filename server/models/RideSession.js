module.exports = (sequelize, DataTypes) => {
  const RideSession = sequelize.define(
    "RideSession",
    {
      session_id: {
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
      ride_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "rides",
          key: "ride_id",
        },
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      pre_ride_heart_rate: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      post_ride_heart_rate: {
        type: DataTypes.SMALLINT,
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
      tableName: "ride_sessions",
      timestamps: true,
      indexes: [
        {
          fields: ["guest_id"],
        },
        {
          fields: ["ride_id"],
        },
        {
          fields: ["start_time"],
        },
        {
          fields: ["guest_id", "ride_id"],
        },
      ],
    }
  );

  RideSession.associate = (models) => {
    // RideSession belongs to a Guest
    RideSession.belongsTo(models.Guest, {
      foreignKey: "guest_id",
      as: "guest",
    });

    // RideSession belongs to a Ride
    RideSession.belongsTo(models.Ride, {
      foreignKey: "ride_id",
      as: "ride",
    });

    // RideSession has many RideMetrics
    RideSession.hasMany(models.RideMetric, {
      foreignKey: "session_id",
      as: "rideMetrics",
    });
  };

  return RideSession;
};
