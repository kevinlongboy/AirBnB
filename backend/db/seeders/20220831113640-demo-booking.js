'use strict';

const demoBookings = [
  // PAST
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
    endDate: '2022-11-12',
  },
  // Roz books Martin's
  {
    spotId: 5,
    userId: 4,
    startDate: '2022-10-07',
    endDate: '2022-10-13',
  },

  // UPCOMING
  // Niles books Daphne's
  {
    spotId: 3,
    userId: 2, // userId of who is renting spot
    startDate: '2023-01-23',
    endDate: '2023-01-25',
  },
]

let userIds = [];
demoBookings.forEach(booking => userIds.push(booking.userId))

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Bookings',
      demoBookings,
      {},
    )
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      'Bookings',
      { userId: { [Op.in]: userIds } },
      {}
    )
  }
};
