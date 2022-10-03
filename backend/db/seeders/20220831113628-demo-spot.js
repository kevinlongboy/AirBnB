'use strict';

const demoSpots = [
  {
    ownerId: 1, // Frasier
    address: '159 S Jackson St #600',
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
    ownerId: 2, // Niles
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
    ownerId: 3, // Daphne
    address: '62 Cedar St',
    city: 'Seattle',
    state: 'WA',
    country: 'United States of America',
    lat: 47.614840,
    lng: -122.352372,
    name: 'Belltown Loft',
    description: 'Stylish with plenty of character',
    price: 250
  },
  {
    ownerId: 4, // Roz
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
    ownerId: 5, // Martin
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
  {
    ownerId: 6, // Lilith
    address: '925 Westlake Avenue North',
    city: 'Seattle',
    state: 'WA',
    country: 'United States of America',
    lat: 47.614102,
    lng: -122.283928,
    name: 'South Lake Union Suite',
    description: 'Smart sophistication',
    price: 500
  },
  {
    ownerId: 7, // Gil
    address: '1530 Belmont Ave',
    city: 'Seattle',
    state: 'WA',
    country: 'United States of America',
    lat: 47.614102,
    lng: -122.283928,
    name: 'Capitol Hill Abode',
    description: 'Fabulous with exquisite taste',
    price: 400
  },
  {
    ownerId: 8, // Noel
    address: '520 Occidental Ave S',
    city: 'Seattle',
    state: 'WA',
    country: 'United States of America',
    lat: 47.614102,
    lng: -122.283928,
    name: 'Chinatown-Intl. Room',
    description: 'Out of this world',
    price: 150
  },
  {
    ownerId: 9, // Bulldog
    address: '1801 S Jackson St',
    city: 'Seattle',
    state: 'WA',
    country: 'United States of America',
    lat: 47.614102,
    lng: -122.283928,
    name: 'SoDo Shared Space',
    description: 'Rambunctious and unperturbed',
    price: 75
  },
  {
    ownerId: 10, // Gertrude
    address: '2371 Franklin Ave E',
    city: 'Seattle',
    state: 'WA',
    country: 'United States of America',
    lat: 47.614102,
    lng: -122.283928,
    name: 'Eastlake Flat',
    description: 'Insistent and opinionated',
    price: 100
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
