'use strict';

const demoSpots = [
  {
    ownerId: 1,
    address: '210 8th Ave N',
    city: 'Seattle',
    state: 'WA',
    country: 'United States of America',
    lat: 47.620224,
    lng: -122.340720,
    name: 'Queen Anne Condo',
    description: 'Eclectic',
    price: 1000
  },
  {
    ownerId: 2,
    address: '1632 77th Ave NE',
    city: 'Medina',
    state: 'WA',
    country: 'United States of America',
    lat: 47.628406,
    lng: -122.237693,
    name: 'Medina Mansion',
    description: 'Modest grandeur',
    price: 2500
  },
  {
    ownerId: 3,
    address: '62 Cedar St',
    city: 'Seattle',
    state: 'WA',
    country: 'United States of America',
    lat: 47.614840,
    lng: -122.352372,
    name: 'Belltown Loft',
    description: 'Stylish with plenty of character',
    price: 200
  },
  {
    ownerId: 4,
    address: '2428 NW Market St',
    city: 'Seattle',
    state: 'WA',
    country: 'United States of America',
    lat: 47.668678,
    lng: -122.386955,
    name: 'Ballard Apartment',
    description: 'Cozy and inviting',
    price: 300
  },
  {
    ownerId: 5,
    address: '1541 Grand Ave',
    city: 'Seattle',
    state: 'WA',
    country: 'United States of America',
    lat: 47.614102,
    lng: -122.283928,
    name: 'Madrona House',
    description: 'Classic comfort',
    price: 150
  },
]

let ownerIds = [];
demoSpots.forEach(spot => ownerIds.push(spot.ownerId))

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Spots',
      demoSpots,
      {},
    )
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      'Spots',
      { ownerId: { [Op.in]: ownerIds } },
      {}
    )
  }
};
