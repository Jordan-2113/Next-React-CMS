'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('metatags', {
      id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      en_title: {
        allowNull: true,
        type: Sequelize.STRING
      },
      tc_title: {
        allowNull: true,
        type: Sequelize.STRING
      },
      sc_title: {
        allowNull: true,
        type: Sequelize.STRING
      },
      en_description: {
        type: Sequelize.STRING
      },
      tc_description: {
        type: Sequelize.STRING
      },
      sc_description: {
        type: Sequelize.STRING
      },
      priority: {
        allowNull: true,
        defaultValue: 0,
        type: Sequelize.BIGINT
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('metatags');
  }
};