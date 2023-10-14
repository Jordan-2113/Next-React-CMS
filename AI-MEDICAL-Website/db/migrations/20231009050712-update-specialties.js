'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('specialties', 'alttext', {
      type: Sequelize.STRING,
      after: 'sc_description',
      allowNull: false,
    });
    await queryInterface.addColumn('specialties', 'slug', {
      type: Sequelize.STRING(1000),
      after: 'alttext',
      allowNull: false,
    });
    await queryInterface.addColumn('specialties', 'en_metaname', {
      type: Sequelize.STRING(1000),
      after: 'slug',
      allowNull: false,
    });
    await queryInterface.addColumn('specialties', 'tc_metaname', {
      type: Sequelize.STRING(1000),
      after: 'en_metaname',
      allowNull: false,
    });
    await queryInterface.addColumn('specialties', 'sc_metaname', {
      type: Sequelize.STRING(1000),
      after: 'tc_metaname',
      allowNull: false,
    });
    await queryInterface.addColumn('specialties', 'en_metadesc', {
      type: Sequelize.STRING(1000),
      after: 'sc_metaname',
      allowNull: false,
    });
    await queryInterface.addColumn('specialties', 'tc_metadesc', {
      type: Sequelize.STRING(1000),
      after: 'en_metadesc',
      allowNull: false,
    });
    await queryInterface.addColumn('specialties', 'sc_metadesc', {
      type: Sequelize.STRING(1000),
      after: 'tc_metadesc',
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('specialties', 'alttext');
    await queryInterface.removeColumn('specialties', 'slug');
    await queryInterface.removeColumn('specialties', 'en_metaname');
    await queryInterface.removeColumn('specialties', 'tc_metaname');
    await queryInterface.removeColumn('specialties', 'sc_metaname');
    await queryInterface.removeColumn('specialties', 'en_metadesc');
    await queryInterface.removeColumn('specialties', 'tc_metadesc');
    await queryInterface.removeColumn('specialties', 'sc_metadesc');
  }
};
