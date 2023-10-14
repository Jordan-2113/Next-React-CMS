'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('specialties', 'en_description', {
      type: Sequelize.STRING(1000),
      after: 'icon'
    });
    await queryInterface.addColumn('specialties', 'tc_description', {
      type: Sequelize.STRING(1000),
      after: 'en_description'
    });
    await queryInterface.addColumn('specialties', 'sc_description', {
      type: Sequelize.STRING(1000),
      after: 'tc_description'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('specialties', 'en_description');
    await queryInterface.removeColumn('specialties', 'tc_description');
    await queryInterface.removeColumn('specialties', 'sc_description');
  }
};
