'use strict';

const { Op } = require('sequelize');
const bcrypt = require("bcryptjs");

const demoUsers = [
  {
    firstName: 'Frasier',
    lastName: 'Crane',
    userName: 'fcrane',
    hashedPassword: bcrypt.hashSync('password'),
    email: 'fcrane@kacl.com',
  },
  {
    firstName: 'Niles',
    lastName: 'Crane',
    userName: 'ncrane',
    hashedPassword: bcrypt.hashSync('password'),
    email: 'ncrane@me.com',
  },
  {
    firstName: 'Daphne',
    lastName: 'Moon',
    userName: 'dmoon',
    hashedPassword: bcrypt.hashSync('password'),
    email: 'dmoon@manchester.com',
  },
  {
    firstName: 'Roz',
    lastName: 'Doyle',
    userName: 'rdoyle',
    hashedPassword: bcrypt.hashSync('password'),
    email: 'rdoyle@kacl.com',
  },
  {
    firstName: 'Martin',
    lastName: 'Crane',
    userName: 'mcrane',
    hashedPassword: bcrypt.hashSync('password'),
    email: 'mcrane@spd.gov',
  },
  {
    firstName: 'Lilith',
    lastName: 'Sternin',
    userName: 'lsternin',
    hashedPassword: bcrypt.hashSync('password'),
    email: 'lsternin@sternin.com',
  },
  {
    firstName: 'Gil',
    lastName: 'Chesterton',
    userName: 'gchesterton',
    hashedPassword: bcrypt.hashSync('password'),
    email: 'gchesterton@kacl.com',
  },
  {
    firstName: 'Noel',
    lastName: 'Shempsky',
    userName: 'nshempsky',
    hashedPassword: bcrypt.hashSync('password'),
    email: 'nshempsky@kacl.com',
  },
  {
    firstName: 'Bob',
    lastName: 'Briscoe',
    userName: 'bbriscoe',
    hashedPassword: bcrypt.hashSync('password'),
    email: 'bbriscoe@kacl.com',
  },
]

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
    await queryInterface(
      'Users',
      { [Op.or]: demoUsers }
    )
  }
};
