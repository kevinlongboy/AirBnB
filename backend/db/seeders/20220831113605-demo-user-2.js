'use strict';

const bcrypt = require("bcryptjs");
const Op = Sequelize.Op;

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
    email: 'dmoon@manchester.com',
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
    email: 'nshempsky@kacl.com',
  },
  {
    firstName: 'Bob',
    lastName: 'Briscoe',
    username: 'bbriscoe',
    hashedPassword: bcrypt.hashSync('passwordI'),
    email: 'bbriscoe@kacl.com',
  },
]

let usernames = [];
demoUsers.forEach(user => usernames.push(user.username))

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
      'Users',
      demoUsers
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
      'Users',
      { username: { [Op.in]: usernames } }
    )
  }
};
