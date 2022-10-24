'use strict';

const demoReviews = [
  { // Niles reviews Daphne’s
    spotId: 3,
    userId: 2,
    review: "This is without a doubt the most magnificent home you will ever lay your eyes on, and it's hosted by an absolute goddess that the gods have deigned to bestow on us mere men. Book yourself a stay at this place, only if you feel you are worthy of her presence.",
    stars: 5,
  },
  { // Frasier reviews Roz's
    spotId: 4,
    userId: 1,
    review: "placeholder",
    stars: 5,
  },
  { // Noel reviews Roz's
    spotId: 4,
    userId: 8,
    review: "placeholder",
    stars: 5,
  },
  { // Daphne reviews Roz’s
    spotId: 4,
    userId: 3,
    review: "placeholder",
    stars: 5,
  },
  { // Roz reviews Martin’s
    spotId: 5,
    userId: 4,
    review: "placeholder",
    stars: 5,
  },
  { // Niles reviews Frasier’s
    spotId: 1,
    userId: 2,
    review: "placeholder",
    stars: 4, // Prev: 3.5
  },
  { // Frasier reviews Niles'
    spotId: 2,
    userId: 1,
    review: "placeholder",
    stars: 3,
  },
  { // Roz reviews Frasier's
    spotId: 1,
    userId: 4,
    review: "placeholder",
    stars: 4,
  },
  { // Lilith reviews Frasier's
    spotId: 1,
    userId: 6,
    review: "placeholder",
    stars: 3, // Prev: 3.5
  },
  { // Gil reviews Frasier's
    spotId: 1,
    userId: 7,
    review: "placeholder",
    stars: 4,
  },
  { // Bulldog reviews Roz's
    spotId: 4,
    userId: 9,
    review: "placeholder",
    stars: 4,
  },
  { // Niles reviews Roz's
    spotId: 4,
    userId: 2,
    review: "placeholder",
    stars: 2,
  },
  { // Gertrude reviews Niles'
    spotId: 2,
    userId: 10,
    review: "placeholder",
    stars: 1,
  },
  { // Frasier reviews Lilith's
    spotId: 6,
    userId: 1,
    review: "placeholder",
    stars: 5,
  },
  { // Niles reviews Lilith's
    spotId: 6,
    userId: 2,
    review: "placeholder",
    stars: 5,
  },
  { // Frasier reviews Gil's
    spotId: 7,
    userId: 1,
    review: "placeholder",
    stars: 5,
  },
  { // Frasier reviews Noel's
    spotId: 8,
    userId: 1,
    review: "placeholder",
    stars: 3,
  },
  { // Frasier reviews Bulldog's
    spotId: 9,
    userId: 1,
    review: "placeholder",
    stars: 2,
  },
  { // Daphne reviews Gertrude's
    spotId: 10,
    userId: 3,
    review: "placeholder",
    stars: 5,
  },
  { // Niles reviews Gertrude's
    spotId: 10,
    userId: 2,
    review: "placeholder",
    stars: 5,
  },
  { // Gertrude reviews Martin's
    spotId: 5,
    userId: 10,
    review: "placeholder",
    stars: 5,
  },
  { // Roz reviews Daphne's
    spotId: 3,
    userId: 4,
    review: "placeholder",
    stars: 5,
  },
  { // Roz reviews Gil's
    spotId: 7,
    userId: 4,
    review: "placeholder",
    stars: 4,
  },
  { // Roz reviews Noel's
    spotId: 8,
    userId: 4,
    review: "placeholder",
    stars: 2,
  },
  { // Roz reviews Bulldog's
    spotId: 9,
    userId: 4,
    review: "placeholder",
    stars: 1,
  },
]

let spotIds = [];
demoReviews.forEach(review => spotIds.push(review.spotId))

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Reviews',
      demoReviews,
      {},
    )
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      'Reviews',
      { spotId: { [Op.in]: spotIds } },
      {},
    )
  }
};
