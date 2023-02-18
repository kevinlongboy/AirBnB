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

    /****************************** DEMO ******************************/

    /********** DEMO AS GUEST **********/
    // PAST BOOKINGS
    // Demo books Niles'
    {
      spotId: 2,
      userId: 1, // userId of guest (person renting spot)
      startDate: '2022-12-17',
      endDate: '2022-12-26',
      guests: 2,
      total: 22575,
    },
    // Demo books Gil's
    {
      spotId: 7,
      userId: 1, // userId of guest (person renting spot)
      startDate: '2022-12-30',
      endDate: '2023-01-01',
      guests: 2,
      total: 875,
    },
    // Demo books Kenny's
    {
      spotId: 13,
      userId: 1, // userId of guest (person renting spot)
      startDate: '2023-01-07',
      endDate: '2023-01-08',
      guests: 2,
      total: 155,
    },

    // UPCOMING BOOKINGS
    // Demo books Daphne's
    {
      spotId: 3,
      userId: 1, // userId of guest (person renting spot)
      startDate: '2023-06-23',
      endDate: '2023-06-25',
      guests: 1,
      total: 325,
    },
    // Demo books Frasier's
    {
      spotId: 1,
      userId: 1, // userId of guest (person renting spot)
      startDate: '2023-07-27',
      endDate: '2023-07-30',
      guests: 2,
      total: 3075,
    },

    /********** DEMO AS HOST **********/
    // PAST RESERVATIONS
    // Roz books Pike Place
    {
      spotId: 14,
      userId: 5, // userId of guest (person renting spot)
      startDate: '2022-10-31',
      endDate: '2022-11-01',
      guests: 2,
      total: 275,
    },
    // Niles books Downtown Duplex
    {
      spotId: 15,
      userId: 3, // userId of guest (person renting spot)
      startDate: '2022-12-22',
      endDate: '2022-12-28',
      guests: 2,
      total: 4875,
    },
    // Gil books Pike Place
    {
      spotId: 15,
      userId: 2, // userId of guest (person renting spot)
      startDate: '2022-12-31',
      endDate: '2022-01-01',
      guests: 1,
      total: 875,
    },
    // Gil books Downtown Duplex
    {
      spotId: 14,
      userId: 8, // userId of guest (person renting spot)
      startDate: '2022-12-31',
      endDate: '2023-01-01',
      guests: 2,
      total: 275,
    },
    // Lilith books Downtown Duplex
    {
      spotId: 15,
      userId: 7, // userId of guest (person renting spot)
      startDate: '2022-01-07',
      endDate: '2022-01-09',
      guests: 1,
      total: 1675,
    },

    // UPCOMING RESERVATIONS
    {
      spotId: 14,
      userId: 4, // userId of guest (person renting spot)
      startDate: '2023-06-28',
      endDate: '2023-06-30',
      guests: 2,
      total: 475,
    },
    {
      spotId: 15,
      userId: 2, // userId of guest (person renting spot)
      startDate: '2023-07-03',
      endDate: '2023-07-05',
      guests: 2,
      total: 1675,
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
