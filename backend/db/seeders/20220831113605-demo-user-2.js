'use strict';

const { Op } = require('sequelize');
const bcrypt = require("bcryptjs");

const users = [
  {
    firstName: 'Frasier',
    lastName: 'Crane',
    userName: 'fcrane',
    hashedPassword: bcrypt.hashSync('password'),
    email: 'fcrane@seattle.com',
  },
  {
    firstName: 'Niles',
    lastName: 'Crane',
    userName: 'ncrane',
    hashedPassword: bcrypt.hashSync('password'),
    email: 'ncrane@seattle.com',
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
    email: 'rdoyle@seattle.com',
  },
  {
    firstName: 'Martin',
    lastName: 'Crane',
    userName: 'mcrane',
    hashedPassword: bcrypt.hashSync('password'),
    email: 'mcrane@seattle.com',
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
      users
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
      { [Op.or]: users }
    )
  }
};
