'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      en_title: {
        allowNull: false,
        type: Sequelize.STRING(500)
      },
      tc_title: {
        allowNull: false,
        type: Sequelize.STRING(500)
      },
      sc_title: {
        allowNull: false,
        type: Sequelize.STRING(500)
      },
      en_content: {
        allowNull: false,
        type: Sequelize.TEXT('long')
      },
      tc_content: {
        allowNull: false,
        type: Sequelize.TEXT('long')
      },
      sc_content: {
        allowNull: false,
        type: Sequelize.TEXT('long')
      },
      picture: {
        allowNull: false,
        type: Sequelize.STRING
      },
      priority: {
        allowNull: false,
        defaultValue: 50,
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
    await queryInterface.dropTable('services');
  }
};