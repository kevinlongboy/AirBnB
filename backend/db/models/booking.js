'use strict';
const { Model } = require('sequelize');

/************ key into pertinent values ************/
const todayRaw = new Date();
const todayISORaw = todayRaw.toISOString();
const todayISO = todayISORaw.slice(0, 10)


module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, { foreignKey: 'userId' })
      Booking.belongsTo(models.Spot, { foreignKey: 'spotId' })

    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        isAfter: "2023-01-01",
      },
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        isAfter: todayISO,
      },
    },
    guests: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        isNumeric: true,
      }
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        isNumeric: true,
      }
    },


  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
