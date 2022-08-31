'use strict';

const { Op } = require('sequelize');

const demoBookings = [
  { // Niles books Daphne's
    spotId: 3,
    ownerId: 2, // userId of who is renting spot
    startDate: '2022-09-23',
    endDate: '2022-09-25',
  },
  { // Daphne books Roz's
    spotId: 4,
    ownerId: 3,
    startDate: '2022-11-11',
    endDate: '2022-11-11',
  },
  { // Roz books Martin's
    spotId: 5,
    ownerId: 4,
    startDate: '2022-10-07',
    endDate: '2022-10-13',
  },
]

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert(
      'Bookings',
      demoBookings,
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(
      'Bookings',
      { [Op.or]: demoBookings },
    )
  }
};
