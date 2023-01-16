'use strict';

// template
// {
//   spotId: ,
//   userId: , // userId of guest (person renting spot)
//   startDate: '2022-09-23',
//   endDate: '2022-09-25',
//   guests: ,
//   total: ,
// }

const demoBookings = [

  /********** PAST **********/
  // Niles books Daphne's
  {
    spotId: 3,
    userId: 3, // userId of guest (person renting spot)
    startDate: '2022-09-23',
    endDate: '2022-09-25',
    guests: 1,
    total: 575,
  },
  // Daphne books Roz's
  {
    spotId: 4,
    userId: 4, // userId of guest (person renting spot)
    startDate: '2022-11-11',
    endDate: '2022-11-12',
    guests: 1,
    total: 375,
  },
  // Roz books Martin's
  {
    spotId: 5,
    userId: 5, // userId of guest (person renting spot)
    startDate: '2022-10-07',
    endDate: '2022-10-13',
    guests: 2,
    total: 975,
  },

  /********** UPCOMING **********/
  // Niles books Daphne's
  {
    spotId: 3,
    userId: 3, // userId of guest (person renting spot)
    startDate: '2023-01-23',
    endDate: '2023-01-25',
    guests: 1,
    total: 575,
  },
  // Daphne books Gertrude's
  {
    spotId: 10,
    userId: 4, // userId of guest (person renting spot)
    startDate: '2023-01-23',
    endDate: '2023-01-25',
    guests: 2,
    total: 275,
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
