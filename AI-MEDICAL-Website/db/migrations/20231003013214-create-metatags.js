'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('metatags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      en_title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tc_title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sc_title: {
        allowNull: false,
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
    await queryInterface.dropTable('metatags');
  }
};