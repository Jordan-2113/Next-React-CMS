'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('services', 'alttext', {
      type: Sequelize.STRING,
      after: 'picture',
      allowNull: true,
    });
    await queryInterface.addColumn('services', 'slug', {
      type: Sequelize.STRING(1000),
      after: 'alttext',
      allowNull: true,
    });
    await queryInterface.addColumn('services', 'en_metaname', {
      type: Sequelize.STRING(1000),
      after: 'slug',
      allowNull: true,
    });
    await queryInterface.addColumn('services', 'tc_metaname', {
      type: Sequelize.STRING(1000),
      after: 'en_metaname',
      allowNull: true,
    });
    await queryInterface.addColumn('services', 'sc_metaname', {
      type: Sequelize.STRING(1000),
      after: 'tc_metaname',
      allowNull: true,
    });
    await queryInterface.addColumn('services', 'en_metadesc', {
      type: Sequelize.STRING(1000),
      after: 'sc_metaname',
      allowNull: true,
    });
    await queryInterface.addColumn('services', 'tc_metadesc', {
      type: Sequelize.STRING(1000),
      after: 'en_metadesc',
      allowNull: true,
    });
    await queryInterface.addColumn('services', 'sc_metadesc', {
      type: Sequelize.STRING(1000),
      after: 'tc_metadesc',
      allowNull: true,
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
