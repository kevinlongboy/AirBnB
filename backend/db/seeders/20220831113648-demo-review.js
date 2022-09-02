'use strict';

const Op = Sequelize.Op;

const demoReviews = [
  { // Niles reviews Daphne’s
    spotId: 3,
    userId: 2,
    review: 'Placeholder text for review',
    stars: 5,
  },
  { // Daphne reviews Roz’s
    spotId: 4,
    userId: 3,
    review: 'I had the loveliest time at Ballard Apartment... placeholder text for review',
    stars: 5,
  },
  { // Roz reviews Martin’s
    spotId: 5,
    userId: 4,
    review: 'Placeholder text for review',
    stars: 4.5,
  },
  { // Niles reviews Frasier’s
    spotId: 1,
    userId: 2,
    review: 'Placeholder text for review',
    stars: 3.5,
  },
  { // Frasier reviews Niles'
    spotId: 2,
    userId: 1,
    review: 'Placeholder text for review',
    stars: 3,
  },
]

let spotIds = [];
demoReviews.forEach(review => spotIds.push(review.spotId))

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
      { spotId: { [Op.in]: spotIds } }
    )
  }
};
