'use strict';
const { Model } = require('sequelize');
const { Sequelize } = require('.');

module.exports = (sequelize, DataTypes) => {

  class Spot extends Model {

    static associate(models) {
      Spot.belongsTo(models.User, { foreignKey: 'ownerId' });
      Spot.hasMany(models.Booking, { foreignKey: 'spotId' });
      Spot.hasMany(models.SpotImage, { foreignKey: 'spotId' });
      Spot.hasMany(models.Review, { foreignKey: 'spotId' });
    }
  }

  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
        // containsBuildingNumberAndStreetName(value) {
        //   let splitAddress = value.split(' ')
        //   if (splitAddress.length < 2) {
        //     throw new Error("Please enter valid address.")
        //   }

        //   let buildingNumber = parseInt(splitAddress[0]);
        //   if (typeof buildingNumber !== 'number') {
        //     throw new Error("Please enter valid building number.")
        //   }
        //   // let streetName = splitAddress[1];
        //   // let letters = streetName.split('');
        //   // for (let letter of letters) {
        //   //   let isNum = parseInt(letter)
        //   //   if (typeof isNum === 'number') {
        //   //     throw new Error("Please enter valid street name.")
        //   //   }
        //   // }
        // }
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // isAlpha: true,
        len: [2, 50]
      },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      // isAlpha: true,
      // len: [2, 2],
      // should account for non-abbreviation
      // isIn: [['AL', 'AK', 'AZ', 'AR', 'CA', 'CZ', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY']]
      // isValidState(value) {
      //   let states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CZ', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];

      //   if (!states.includes(value)) {
      //     throw new Error("Please enter a valid state.")
      //   }
      // }
      // },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // isAlpha: true,
        len: [2, 50],
      },
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true
      },
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // isAlpha: true,
        len: [2, 50],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 255]
      },
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0
      },
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
