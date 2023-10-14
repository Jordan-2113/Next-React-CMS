'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('doctors', 'alttext', {
      type: Sequelize.STRING,
      after: 'priority',
      allowNull: false,
    });
    await queryInterface.addColumn('doctors', 'slug', {
      type: Sequelize.STRING(1000),
      after: 'alttext',
      allowNull: false,
    });
    await queryInterface.addColumn('doctors', 'en_metaname', {
      type: Sequelize.STRING(1000),
      after: 'slug',
      allowNull: false,
    });
    await queryInterface.addColumn('doctors', 'tc_metaname', {
      type: Sequelize.STRING(1000),
      after: 'en_metaname',
      allowNull: false,
    });
    await queryInterface.addColumn('doctors', 'sc_metaname', {
      type: Sequelize.STRING(1000),
      after: 'tc_metaname',
      allowNull: false,
    });
    await queryInterface.addColumn('doctors', 'en_metadesc', {
      type: Sequelize.STRING(1000),
      after: 'sc_metaname',
      allowNull: false,
    });
    await queryInterface.addColumn('doctors', 'tc_metadesc', {
      type: Sequelize.STRING(1000),
      after: 'en_metadesc',
      allowNull: false,
    });
    await queryInterface.addColumn('doctors', 'sc_metadesc', {
      type: Sequelize.STRING(1000),
      after: 'tc_metadesc',
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('doctors', 'alttext');
    await queryInterface.removeColumn('doctors', 'slug');
    await queryInterface.removeColumn('doctors', 'en_metaname');
    await queryInterface.removeColumn('doctors', 'tc_metaname');
    await queryInterface.removeColumn('doctors', 'sc_metaname');
    await queryInterface.removeColumn('doctors', 'en_metadesc');
    await queryInterface.removeColumn('doctors', 'tc_metadesc');
    await queryInterface.removeColumn('doctors', 'sc_metadesc');
  }
};
