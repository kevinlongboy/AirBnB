'use strict';

const demoReviews = [
  { // Niles reviews Daphne’s
    spotId: 3,
    userId: 2,
    review: 'Placeholder text: Niles reviews Daphne',
    stars: 5,
  },
  { // Daphne reviews Roz’s
    spotId: 4,
    userId: 3,
    review: "I had the loveliest time at Ballard. The host was so welcoming and made me feel right at home. All the little touches [...] As my Grammy Moon would say [...]",
    stars: 5,
  },
  { // Roz reviews Martin’s
    spotId: 5,
    userId: 4,
    review: 'Placeholder text: Roz reviews Martin',
    stars: 5, // Prev: 4.5
  },
  { // Niles reviews Frasier’s
    spotId: 1,
    userId: 2,
    review: 'Placeholder text: Niles Reviews Frasier',
    stars: 4, // Prev: 3.5
  },
  { // Frasier reviews Niles'
    spotId: 2,
    userId: 1,
    review: 'Placeholder text: Frasier reviews Niles',
    stars: 3,
  },
  { // Lilith reviews Frasier's
    spotId: 1,
    userId: 6,
    review: 'Placeholder text: Lilith reviews Frasier',
    stars: 3, // Prev: 3.5
  },
  { // Gil reviews Frasier's
    spotId: 1,
    userId: 7,
    review: 'Placeholder text: Gil reviews Frasier. My,',
    stars: 4, // Prev: 3.5
  },
  { // Noel reviews Roz's
    spotId: 4,
    userId: 8,
    review: 'Placeholder text: Noel reviews Roz',
    stars: 5,
  },
  { // Bulldog reviews Roz's
    spotId: 4,
    userId: 9,
    review: 'not bad . wouldve given this place another star if the host was willing to make my stay a little more "comfortable" if you get my meaning !',
    stars: 4, // Prev: 4.5
  },
  { // Gertrude reviews Niles'
    spotId: 2,
    userId: 10,
    review: "don't bother wasting yer money 'ere. The hosts are couple of stuck up phony art lovers who keep all their good liquor locked away from their payin' guests. Yer be'er off staying somewhere halfway decent like me flat in Eastlake",
    stars: 1,
  },
  { // Frasier reviews Lilith's
    spotId: 6,
    userId: 1,
    review: 'Placeholder text: Frasier reviews Lilith',
    stars: 5,
  },
  { // Niles reviews Lilith's
    spotId: 6,
    userId: 2,
    review: 'Placeholder text: Niles reviews Lilith',
    stars: 5,
  },
  { // Frasier reviews Gil's
    spotId: 7,
    userId: 1,
    review: 'Placeholder text: Frasier reviews Gil',
    stars: 5, // Prev: 4.5
  },
  { // Frasier reviews Noel's
    spotId: 8,
    userId: 1,
    review: 'Placeholder text: Frasier reviews Noel',
    stars: 3,
  },
  { // Frasier reviews Bulldog's
    spotId: 9,
    userId: 1,
    review: 'Placeholder text: Frasier reviews Bulldog',
    stars: 2,
  },
  { // Daphne reviews Gertrude's
    spotId: 10,
    userId: 3,
    review: 'Placeholder text: Daphne reviews Gertrude',
    stars: 5,
  },
  { // Niles reviews Gertrude's
    spotId: 10,
    userId: 2,
    review: 'What a lovely home this was! And the host was like no other. In fact, the whole experience brought to mind visions of my own bed the moment we arrived!',
    stars: 5,
  },
  { // Gertrude reviews Martin's
    spotId: 5,
    userId: 10,
    review: 'Placeholder text: Gertrude reviews Martin',
    stars: 5,
  },
  { // Roz reviews Daphne's
    spotId: 3,
    userId: 4,
    review: 'Placeholder text: Roz reviews Daphne',
    stars: 5,
  },
  { // Roz reviews Gil's
    spotId: 7,
    userId: 4,
    review: 'Placeholder text: Roz reviews Gil',
    stars: 4,
  },
  { // Roz reviews Noel's
    spotId: 8,
    userId: 4,
    review: 'Placeholder text: Roz reviews Noel',
    stars: 2,
  },
  { // Roz reviews Bulldog's
    spotId: 9,
    userId: 4,
    review: "Ugh. This place is DISGUSTING. I don't know why I even bothered staying here. The room was a total mess and the host kept hitting on me the entire time I was there. Save yourself the headache and STAY SOMEWHERE ELSE.",
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
