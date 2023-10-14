'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('metatags', [
      {
        en_title: "Home",
        tc_title: "首頁",
        sc_title: "首页",
        en_description: "this is 1en_description",
        tc_description: "this is 1tc_description",
        sc_description: "this is 1sc_description",
        priority: 0,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        en_title: "About Us",
        tc_title: "關於我們",
        sc_title: "关于我们",
        en_description: "this is 2en_description",
        tc_description: "this is 2tc_description",
        sc_description: "this is 2sc_description",
        priority: 0,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        en_title: "News",
        tc_title: "消息中心",
        sc_title: "消息中心",
        en_description: "this is 3en_description",
        tc_description: "this is 3tc_description",
        sc_description: "this is 3sc_description",
        priority: 0,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        en_title: "Professional Team",
        tc_title: "醫生團隊",
        sc_title: "医生团队",
        en_description: "this is 4en_description",
        tc_description: "this is 4tc_description",
        sc_description: "this is 4sc_description",
        priority: 0,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        en_title: "APP",
        tc_title: "手機程式",
        sc_title: "手机应用",
        en_description: "this is 5en_description",
        tc_description: "this is 5tc_description",
        sc_description: "this is 5sc_description",
        priority: 0,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        en_title: "Contact Us",
        tc_title: "聯絡我們",
        sc_title: "联系我们",
        en_description: "this is 6en_description",
        tc_description: "this is 6tc_description",
        sc_description: "this is 6sc_description",
        priority: 0,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('metatags', null, {});
  }
};
