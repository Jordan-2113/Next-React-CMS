'use strict';

const { Role, SALT_ROUNDS } = require("../../helper");
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        email: 'demo@demo.com',
        password: await bcrypt.hash("P@ssw0rd", SALT_ROUNDS),
        role: Role.admin,
        status: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'lewagon',
        email: 'venusdev2113@gmail.com',
        password: await bcrypt.hash("Hyun@113", SALT_ROUNDS),
        role: Role.admin,
        status: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'bill',
        email: 'bill@kissit.com.hk',
        password: await bcrypt.hash("Bill@113", SALT_ROUNDS),
        role: Role.admin,
        status: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
