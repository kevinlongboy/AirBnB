'use strict';

const demoReviewImages = [
  // Niles reviews Daphne’s
  {
    // id: 1,
    reviewId: 1,
    url: '../../../assets/images/review-images/belltown-loft/belltown-review-1.jpg',
  },
  {
    // id: 2,
    reviewId: 1,
    url: '../../../assets/images/review-images/belltown-loft/belltown-review-2.jpg',
  },
  {
    // id: 3,
    reviewId: 1,
    url: '../../../assets/images/review-images/belltown-loft/belltown-review-3.jpg',
  },
  // Daphne reviews Roz’s
  {
    // id: 4,
    reviewId: 2,
    url: '../../../assets/images/review-images/ballard-apartment/ballard-review-1.jpg',
  },
  {
    // id: 5,
    reviewId: 2,
    url: '../../../assets/images/review-images/ballard-apartment/ballard-review-2.jpg',
  },
  // Roz reviews Martin’s
  {
    // id: 6,
    reviewId: 3,
    url: '../../../assets/images/review-images/madrona-house/madrona-review-1.jpg',
  },
  {
    // id: 7,
    reviewId: 3,
    url: '../../../assets/images/review-images/madrona-house/madrona-review-2.jpg',
  },
  {
    // id: 8,
    reviewId: 3,
    url: '../../../assets/images/review-images/madrona-house/madrona-review-3.jpg',
  },
  {
    // id: 9,
    reviewId: 3,
    url: '../../../assets/images/review-images/madrona-house/madrona-review-4.jpg',
  },
  {
    // id: 10,
    reviewId: 3,
    url: '../../../assets/images/review-images/madrona-house/madrona-review-5.jpg',
  },
  {
    // id: 11,
    reviewId: 3,
    url: '../../../assets/images/review-images/madrona-house/madrona-review-6.jpg',
  },
  {
    // id: 12,
    reviewId: 3,
    url: '../../../assets/images/review-images/madrona-house/madrona-review-7.jpg',
  },
  {
    // id: 13,
    reviewId: 3,
    url: '../../../assets/images/review-images/madrona-house/madrona-review-8.jpg',
  },
  // Niles reviews Frasier’s
  {
    // id: 14,
    reviewId: 4,
    url: '../../../assets/images/review-images/queen-anne-condo/queen-anne-review-1.jpg',
  },
  {
    // id: 15,
    reviewId: 4,
    url: '../../../assets/images/review-images/queen-anne-condo/queen-anne-review-2.jpg',
  },
  {
    // id: 16,
    reviewId: 4,
    url: '../../../assets/images/review-images/queen-anne-condo/queen-anne-review-3.jpg',
  },
  // Frasier's reviews Niles'
  {
    // id: 17,
    reviewId: 5,
    url: '../../../assets/images/review-images/medina-mansion/medina-review-1.jpeg',
  },
  {
    // id: 18,
    reviewId: 5,
    url: '../../../assets/images/review-images/medina-mansion/medina-review-2.jpeg',
  },
]

let reviewIds = [];
demoReviewImages.forEach(reviewImage => {
  if (!reviewIds.includes(reviewImage.reviewId)) {
    reviewIds.push(reviewImage.reviewId)
  }
})

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'ReviewImages',
      demoReviewImages
    )
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      'ReviewImages',
      { reviewId: { [Op.in]: reviewIds } }
    )
  }
};
