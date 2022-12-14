'use strict';

const bcrypt = require("bcryptjs");

const demoUsers = [
  {
    firstName: 'Frasier',
    lastName: 'Crane',
    username: 'fcrane',
    hashedPassword: bcrypt.hashSync('passwordA'),
    email: 'fcrane@kacl.com',
  },
  {
    firstName: 'Niles',
    lastName: 'Crane',
    username: 'ncrane',
    hashedPassword: bcrypt.hashSync('passwordB'),
    email: 'ncrane@me.com',
  },
  {
    firstName: 'Daphne',
    lastName: 'Moon',
    username: 'dmoon',
    hashedPassword: bcrypt.hashSync('passwordC'),
    email: 'dmoon@hotmail.co.uk',
  },
  {
    firstName: 'Roz',
    lastName: 'Doyle',
    username: 'rdoyle',
    hashedPassword: bcrypt.hashSync('passwordD'),
    email: 'rdoyle@kacl.com',
  },
  {
    firstName: 'Martin',
    lastName: 'Crane',
    username: 'mcrane',
    hashedPassword: bcrypt.hashSync('passwordE'),
    email: 'mcrane@spd.gov',
  },
  {
    firstName: 'Lilith',
    lastName: 'Sternin',
    username: 'lsternin',
    hashedPassword: bcrypt.hashSync('passwordF'),
    email: 'lsternin@sternin.com',
  },
  {
    firstName: 'Gil',
    lastName: 'Chesterton',
    username: 'gchesterton',
    hashedPassword: bcrypt.hashSync('passwordG'),
    email: 'gchesterton@kacl.com',
  },
  {
    firstName: 'Noel',
    lastName: 'Shempsky',
    username: 'nshempsky',
    hashedPassword: bcrypt.hashSync('passwordH'),
    email: 'nshempsky@sfi.org',
  },
  {
    firstName: 'Bulldog',
    lastName: 'Briscoe',
    username: 'bbriscoe',
    hashedPassword: bcrypt.hashSync('passwordI'),
    email: 'bbriscoe@yahoo.com',
  },
  {
    firstName: 'Gertrude',
    lastName: 'Moon',
    username: 'gmoon',
    hashedPassword: bcrypt.hashSync('passwordJ'),
    email: 'gmoon@yahoo.co.uk',
  },
  {
    firstName: 'Demo',
    lastName: 'User',
    username: 'Demo',
    hashedPassword: bcrypt.hashSync('demoPassword'),
    email: 'demo@email.com',
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
