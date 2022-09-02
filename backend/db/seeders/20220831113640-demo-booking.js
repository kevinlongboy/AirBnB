'use strict';

const Op = Sequelize.Op;

const demoBookings = [
  // Niles books Daphne's
  {
    spotId: 3,
    userId: 2, // userId of who is renting spot
    startDate: '2022-09-23',
    endDate: '2022-09-25',
  },
  // Daphne books Roz's
  {
    spotId: 4,
    userId: 3,
    startDate: '2022-11-11',
    endDate: '2022-11-11',
  },
  // Roz books Martin's
  {
    spotId: 5,
    userId: 4,
    startDate: '2022-10-07',
    endDate: '2022-10-13',
  },
]

let userIds = [];
demoBookings.forEach(booking => userIds.push(booking.userId))

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
      { userId: { [Op.in]: userIds } }
    )
  }
};
