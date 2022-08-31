'use strict';

const { Op } = require('sequelize');

const reviews = [
  { // Niles reviews Daphne’s
    spotId: 3,
    userId: 2,
    review: '',
    stars: 5,
  },
  { // Daphne reviews Roz’s
    spotId: 4,
    userId: 3,
    review: 'I had the loveliest time at ',
    stars: 5,
  },
  { // Roz reviews Martin’s
    spotId: 5,
    userId: 4,
    review: ' ',
    stars: 4.5,
  },
  { // Niles reviews Frasier’s
    spotId: 1,
    userId: 2,
    review: ' ',
    stars: 3.5,
  },
  { // Frasier reviews Nile’s
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
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
