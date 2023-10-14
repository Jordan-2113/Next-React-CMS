'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('banners', [
      {
        banner_path: "https://via.placeholder.com/1920x900",
        priority: 20,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        banner_path: "https://via.placeholder.com/1920x900",
        priority: 20,
        link: "https://google.com",
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('banners', null, {});
  }
};
