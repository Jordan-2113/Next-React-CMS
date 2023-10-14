'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('doctors', 'priority', {
      type: Sequelize.BIGINT,
      after: 'sc_clinic',
      allowNull: false,
      defaultValue: 50,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('doctors', 'priority');
  }
};
