'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('doctors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      picture: {
        allowNull: false,
        type: Sequelize.STRING
      },
      en_name: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      tc_name: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      sc_name: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      en_title: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      tc_title: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      sc_title: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      en_description: {
        allowNull: false,
        type: Sequelize.TEXT('long')
      },
      tc_description: {
        allowNull: false,
        type: Sequelize.TEXT('long')
      },
      sc_description: {
        allowNull: false,
        type: Sequelize.TEXT('long')
      },
      en_dialect: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tc_dialect: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sc_dialect: {
        allowNull: false,
        type: Sequelize.STRING
      },
      en_clinic: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tc_clinic: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sc_clinic: {
        allowNull: false,
        type: Sequelize.STRING
      },
      visible: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('doctors');
  }
};