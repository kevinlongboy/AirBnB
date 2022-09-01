'use strict';

const { Op } = require('sequelize');

const demoReviews = [
  { // Niles reviews Daphne’s
    id: 1,
    spotId: 3,
    userId: 2,
    review: '',
    stars: 5,
  },
  { // Daphne reviews Roz’s
    id: 2,
    spotId: 4,
    userId: 3,
    review: 'I had the loveliest time at Ballard Apartment.',
    stars: 5,
  },
  { // Roz reviews Martin’s
    id: 3,
    spotId: 5,
    userId: 4,
    review: ' ',
    stars: 4.5,
  },
  { // Niles reviews Frasier’s
    id: 4,
    spotId: 1,
    userId: 2,
    review: ' ',
    stars: 3.5,
  },
  { // Frasier reviews Niles'
    id: 5,
    spotId: 2,
    userId: 1,
    review: ' ',
    stars: 3,
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
      'Reviews',
      demoReviews
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
      'Reviews',
      { [Op.or]: demoReviews }
    )
  }
};
