'use strict';

const demoSpotImages = [
  // Frasier’s Queen Anne Condo
  {
    // id: 1,
    spotId: 1,
    url: '../../../assets/images/spot-images/queen-anne-condo/queen-anne-spot-1.jpg',
    preview: true,
  },
  {
    // id: 2,
    spotId: 1,
    url: '../../../assets/images/spot-images/queen-anne-condo/queen-anne-spot-2.jpg',
    preview: true,
  },
  {
    // id: 3,
    spotId: 1,
    url: '../../../assets/images/spot-images/queen-anne-condo/queen-anne-spot-3.jpg',
    preview: true,
  },
  // Niles' Medina Mansion
  {
    // id: 4,
    spotId: 2,
    url: '../../../assets/images/spot-images/medina-mansion/medina-spot-1.jpg',
    preview: true,
  },
  {
    // id: 5,
    spotId: 2,
    url: '../../../assets/images/spot-images/medina-mansion/medina-spot-2.jpg',
    preview: true,
  },
  {
    // id: 6,
    spotId: 2,
    url: '../../../assets/images/spot-images/medina-mansion/medina-spot-3.jpg',
    preview: true,
  },
  {
    // id: 7,
    spotId: 2,
    url: '../../../assets/images/spot-images/medina-mansion/medina-spot-4.jpg',
    preview: true,
  },
  {
    // id: 8,
    spotId: 2,
    url: '../../../assets/images/spot-images/medina-mansion/medina-spot-5.jpg',
    preview: true,
  },
  // Daphne's Belltown Loft
  {
    // id: 9,
    spotId: 3,
    url: '../../../assets/images/spot-images/belltown-loft/belltown-spot-1.jpg',
    preview: true,
  },
  {
    // id: 10,
    spotId: 3,
    url: '../../../assets/images/spot-images/belltown-loft/belltown-spot-2.jpg',
    preview: true,
  },
  {
    // id: 11,
    spotId: 3,
    url: '../../../assets/images/spot-images/belltown-loft/belltown-spot-3.jpg',
    preview: true,
  },
  {
    // id: 12,
    spotId: 3,
    url: '../../../assets/images/spot-images/belltown-loft/belltown-spot-4.jpg',
    preview: true,
  },
  {
    // id: 13,
    spotId: 3,
    url: '../../../assets/images/spot-images/belltown-loft/belltown-spot-5.jpg',
    preview: true,
  },
  {
    // id: 14,
    spotId: 3,
    url: '../../../assets/images/spot-images/belltown-loft/belltown-spot-6.jpg',
    preview: true,
  },
  // Roz's Ballard Apartment
  {
    // id: 15,
    spotId: 4,
    url: '../../../assets/images/spot-images/ballard-apartment/ballard-spot-1.jpg',
    preview: true,
  },
  {
    // id: 16,
    spotId: 4,
    url: '../../../assets/images/spot-images/ballard-apartment/ballard-spot-2.jpg',
    preview: true,
  },
  {
    // id: 17,
    spotId: 4,
    url: '../../../assets/images/spot-images/ballard-apartment/ballard-spot-3.jpg',
    preview: true,
  },
  {
    // id: 18,
    spotId: 4,
    url: '../../../assets/images/spot-images/ballard-apartment/ballard-spot-4.jpg',
    preview: true,
  },
  {
    // id: 19,
    spotId: 4,
    url: '../../../assets/images/spot-images/ballard-apartment/ballard-spot-5.jpg',
    preview: true,
  },
  {
    // id: 20,
    spotId: 4,
    url: '../../../assets/images/spot-images/ballard-apartment/ballard-spot-6.jpg',
    preview: true,
  },
  // Martin's Ballard Apartment
  {
    // id: 21,
    spotId: 5,
    url: '../../../assets/images/spot-images/madrona-house/madrona-spot-1.jpg',
    preview: true,
  },
  {
    // id: 22,
    spotId: 5,
    url: '../../../assets/images/spot-images/madrona-house/madrona-spot-2.jpg',
    preview: true,
  },
  {
    // id: 23,
    spotId: 5,
    url: '../../../assets/images/spot-images/madrona-house/madrona-spot-3.jpg',
    preview: true,
  },
  {
    // id: 24,
    spotId: 5,
    url: '../../../assets/images/spot-images/madrona-house/madrona-spot-4.jpg',
    preview: true,
  },
  {
    // id: 25,
    spotId: 5,
    url: '../../../assets/images/spot-images/madrona-house/madrona-spot-5.jpg',
    preview: true,
  },
  {
    // id: 26,
    spotId: 5,
    url: '../../../assets/images/spot-images/madrona-house/madrona-spot-6.jpg',
    preview: true,
  },
  {
    // id: 27,
    spotId: 5,
    url: '../../../assets/images/spot-images/madrona-house/madrona-spot-7.jpg',
    preview: true,
  },
]

let spotIds = [];
demoSpotImages.forEach(spotImage => {
  if (!spotIds.includes(spotImage.spotId)) {
    spotIds.push(spotImage.spotId)
  }
})

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'SpotImages',
      demoSpotImages
    )
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      'SpotImages',
      { spotId: { [Op.in]: spotIds } }
    )
  }
};
