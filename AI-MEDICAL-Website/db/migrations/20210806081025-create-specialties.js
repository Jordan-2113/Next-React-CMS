'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('specialties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      en_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tc_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sc_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      icon: {
        type: Sequelize.STRING
      },
      priority: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.BIGINT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('specialties');
  }
};