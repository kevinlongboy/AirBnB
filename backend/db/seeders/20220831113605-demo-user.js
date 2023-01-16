'use strict';

const bcrypt = require("bcryptjs");

// template
// {
//   // id: 1,
//   firstName: '',
//   lastName: '',
//   username: '',
//   hashedPassword: bcrypt.hashSync('password'),
//   email: '@kacl.com',
// },

const demoUsers = [
  {
    // id: 1,
    firstName: 'Demo',
    lastName: 'User',
    username: 'Demo',
    hashedPassword: bcrypt.hashSync('demoPassword'),
    email: 'demo@email.com',
  },
  {
    // id: 2,
    firstName: 'Frasier',
    lastName: 'Crane',
    username: 'fcrane',
    hashedPassword: bcrypt.hashSync('passwordA'),
    email: 'fcrane@kacl.com',
  },
  {
    // id: 3,
    firstName: 'Niles',
    lastName: 'Crane',
    username: 'ncrane',
    hashedPassword: bcrypt.hashSync('passwordB'),
    email: 'ncrane@me.com',
  },
  {
    // id: 4,
    firstName: 'Daphne',
    lastName: 'Moon',
    username: 'dmoon',
    hashedPassword: bcrypt.hashSync('passwordC'),
    email: 'dmoon@hotmail.co.uk',
  },
  {
    // id: 5,
    firstName: 'Roz',
    lastName: 'Doyle',
    username: 'rdoyle',
    hashedPassword: bcrypt.hashSync('passwordD'),
    email: 'rdoyle@kacl.com',
  },
  {
    // id: 6,
    firstName: 'Martin',
    lastName: 'Crane',
    username: 'mcrane',
    hashedPassword: bcrypt.hashSync('passwordE'),
    email: 'mcrane@spd.gov',
  },
  {
    // id: 7,
    firstName: 'Lilith',
    lastName: 'Sternin',
    username: 'lsternin',
    hashedPassword: bcrypt.hashSync('passwordF'),
    email: 'lsternin@sternin.com',
  },
  {
    // id: 8,
    firstName: 'Gil',
    lastName: 'Chesterton',
    username: 'gchesterton',
    hashedPassword: bcrypt.hashSync('passwordG'),
    email: 'gchesterton@kacl.com',
  },
  {
    // id: 9,
    firstName: 'Noel',
    lastName: 'Shempsky',
    username: 'nshempsky',
    hashedPassword: bcrypt.hashSync('passwordH'),
    email: 'nshempsky@sfi.org',
  },
  {
    // id: 10,
    firstName: 'Bulldog',
    lastName: 'Briscoe',
    username: 'bbriscoe',
    hashedPassword: bcrypt.hashSync('passwordI'),
    email: 'bbriscoe@yahoo.com',
  },
  {
    // id: 11,
    firstName: 'Gertrude',
    lastName: 'Moon',
    username: 'gmoon',
    hashedPassword: bcrypt.hashSync('passwordJ'),
    email: 'gmoon@yahoo.co.uk',
  },
  {
    // id: 12,
    firstName: 'Sherry',
    lastName: 'Dempsey',
    username: 'sdempsey',
    hashedPassword: bcrypt.hashSync('passwordL'),
    email: 'sdempsey@yahoo.com',
  },
  {
    // id: 13,
    firstName: 'Maris',
    lastName: 'Crane',
    username: 'maris', // mcrane === ncrane ?
    hashedPassword: bcrypt.hashSync('passwordM'),
    email: 'mcrane@me.com',
  },
  {
    // id: 14,
    firstName: 'Kenny',
    lastName: 'Daly',
    username: 'kdaly',
    hashedPassword: bcrypt.hashSync('passwordK'),
    email: 'kdaly@kacl.com',
  },
]

let usernames = [];
demoUsers.forEach(user => usernames.push(user.username))

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      demoUsers,
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'Users',
      { username: { [Op.in]: usernames } },
      {}
    )
  }
};
