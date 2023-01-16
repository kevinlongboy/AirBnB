'use strict';

// template
// {
//   ownerId: , // Frasier
//   address: '',
//   city: 'Seattle',
//   state: 'WA',
//   country: 'United States of America',
//   lat: 47.620224,
//   lng: -122.340720,
//   name: '',
//   description: '',
//   price: ,
// },

const demoSpots = [
  {
    // id: 1,
    ownerId: 2, // Frasier
    address: '159 S Jackson St #600',
    city: 'Seattle',
    state: 'WA',
    country: 'United States of America',
    lat: 47.620224,
    lng: -122.340720,
    name: 'Queen Anne Condo',
    description: 'Eclectic',
    price: 1000,
  },
  {
    // id: 2,
    ownerId: 3, // Niles
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
    // id: 3,
    ownerId: 4, // Daphne
    address: '2116 4th Ave',
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
    // id: 4,
    ownerId: 5, // Roz
    address: '4106 Stone Way N',
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
    // id: 5,
    ownerId: 6, // Martin
    address: '1541 Grand Ave',
    city: 'Seattle',
    state: 'WA',
    country: 'United States of America',
    lat: 47.614102,
    lng: -122.283928,
    name: 'Madrona House',
    description: 'Classic comfort',
    price: 125
  },
  {
    // id: 6,
    ownerId: 7, // Lilith
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
    // id: 7,
    ownerId: 8, // Gil
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
    // id: 8,
    ownerId: 9, // Noel
    address: '1001 Minor Avenue Seattle',
    city: 'Seattle',
    state: 'WA',
    country: 'United States of America',
    lat: 47.614102,
    lng: -122.283928,
    name: 'Chinatown-Intl. Room',
    description: 'Out of this world',
    price: 100
  },
  {
    // id: 9,
    ownerId: 10, // Bulldog
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
    // id: 10,
    ownerId: 11, // Gertrude
    address: '2371 Franklin Ave E',
    city: 'Seattle',
    state: 'WA',
    country: 'United States of America',
    lat: 47.614102,
    lng: -122.283928,
    name: 'Eastlake Flat',
    description: 'Insistent and opinionated',
    price: 150
  },
  {
    // id: 11,
    ownerId: 12, // Sherry
    address: '2233 1st Avenue',
    city: 'Seattle',
    state: 'WA',
    country: 'United States of America',
    lat: 47.620224,
    lng: -122.340720,
    name: 'Magnolia Townhouse',
    description: 'Brassy and flamboyant',
    price: 125,
  },
  {
    // id: 12,
    ownerId: 13, // Maris
    address: '3267 Evergreen Point Rd',
    city: 'Medina',
    state: 'WA',
    country: 'United States of America',
    lat: 47.620224,
    lng: -122.340720,
    name: 'Roosevelt Estate',
    description: 'Indescribable',
    price: 5000,
  },
  {
    // id: 13,
    ownerId: 14, // Kenny
    address: '1430 2nd Ave., Suite 800',
    city: 'Seattle',
    state: 'WA',
    country: 'United States of America',
    lat: 47.620224,
    lng: -122.340720,
    name: 'Leschi In-Law Unit',
    description: 'Quirky and unique',
    price: 80,
  },
  {
    // id: 14,
    ownerId: 1, // Demo
    address: '255 Lenora St',
    city: 'Seattle',
    state: 'WA',
    country: 'United States of America',
    lat: 47.620224,
    lng: -122.340720,
    name: 'Pike Place',
    description: 'In the heart of the city',
    price: 200,
  },
  {
    // id: 15,
    ownerId: 1, // Demo
    address: '1250 Alki Avenue SW, Unit 3A',
    city: 'Seattle',
    state: 'WA',
    country: 'United States of America',
    lat: 47.620224,
    lng: -122.340720,
    name: 'Downtown Duplex',
    description: 'Close to all the action',
    price: 800,
  },
];

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
