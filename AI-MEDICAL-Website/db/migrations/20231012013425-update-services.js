'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('services', 'alttext', {
      type: Sequelize.STRING,
      after: 'picture',
      allowNull: false,
    });
    await queryInterface.addColumn('services', 'slug', {
      type: Sequelize.STRING(1000),
      after: 'alttext',
      allowNull: false,
    });
    await queryInterface.addColumn('services', 'en_metaname', {
      type: Sequelize.STRING(1000),
      after: 'slug',
      allowNull: false,
    });
    await queryInterface.addColumn('services', 'tc_metaname', {
      type: Sequelize.STRING(1000),
      after: 'en_metaname',
      allowNull: false,
    });
    await queryInterface.addColumn('services', 'sc_metaname', {
      type: Sequelize.STRING(1000),
      after: 'tc_metaname',
      allowNull: false,
    });
    await queryInterface.addColumn('services', 'en_metadesc', {
      type: Sequelize.STRING(1000),
      after: 'sc_metaname',
      allowNull: false,
    });
    await queryInterface.addColumn('services', 'tc_metadesc', {
      type: Sequelize.STRING(1000),
      after: 'en_metadesc',
      allowNull: false,
    });
    await queryInterface.addColumn('services', 'sc_metadesc', {
      type: Sequelize.STRING(1000),
      after: 'tc_metadesc',
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('services', 'alttext');
    await queryInterface.removeColumn('services', 'slug');
    await queryInterface.removeColumn('services', 'en_metaname');
    await queryInterface.removeColumn('services', 'tc_metaname');
    await queryInterface.removeColumn('services', 'sc_metaname');
    await queryInterface.removeColumn('services', 'en_metadesc');
    await queryInterface.removeColumn('services', 'tc_metadesc');
    await queryInterface.removeColumn('services', 'sc_metadesc');
  }
};
