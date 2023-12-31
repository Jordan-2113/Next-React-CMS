'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('services', [
      {
        slug: "專科服務",
        en_metaname: "專科服務",
        tc_metaname: "專科服務",
        sc_metaname: "專科服務",
        en_metadesc: "訊智的專科醫療服務涵蓋30多個科室，由香港資深私人執業醫生應診，為患者的健康把關。訊智醫患互聯平臺為整個專科醫療服務過程賦能，患者的診治由相關專科醫師共同負責。患者病歷將會提前傳送到醫生手中，醫生團隊對病歷進行詳細研究，為患者訂制出最優的治療方案。會診結束後，醫生通過醫患互聯平臺提供康復指導，用藥建議，全面跟進後續治療過程，為患者提供一站式高端醫療服務。",
        tc_metadesc: "訊智的專科醫療服務涵蓋30多個科室，由香港資深私人執業醫生應診，為患者的健康把關。訊智醫患互聯平臺為整個專科醫療服務過程賦能，患者的診治由相關專科醫師共同負責。患者病歷將會提前傳送到醫生手中，醫生團隊對病歷進行詳細研究，為患者訂制出最優的治療方案。會診結束後，醫生通過醫患互聯平臺提供康復指導，用藥建議，全面跟進後續治療過程，為患者提供一站式高端醫療服務。",
        sc_metadesc: "訊智的專科醫療服務涵蓋30多個科室，由香港資深私人執業醫生應診，為患者的健康把關。訊智醫患互聯平臺為整個專科醫療服務過程賦能，患者的診治由相關專科醫師共同負責。患者病歷將會提前傳送到醫生手中，醫生團隊對病歷進行詳細研究，為患者訂制出最優的治療方案。會診結束後，醫生通過醫患互聯平臺提供康復指導，用藥建議，全面跟進後續治療過程，為患者提供一站式高端醫療服務。",
        en_title: "專科服務",
        tc_title: "專科服務",
        sc_title: "專科服務",
        en_content: "訊智的專科醫療服務涵蓋30多個科室，由香港資深私人執業醫生應診，為患者的健康把關。訊智醫患互聯平臺為整個專科醫療服務過程賦能，患者的診治由相關專科醫師共同負責。患者病歷將會提前傳送到醫生手中，醫生團隊對病歷進行詳細研究，為患者訂制出最優的治療方案。會診結束後，醫生通過醫患互聯平臺提供康復指導，用藥建議，全面跟進後續治療過程，為患者提供一站式高端醫療服務。",
        tc_content: "訊智的專科醫療服務涵蓋30多個科室，由香港資深私人執業醫生應診，為患者的健康把關。訊智醫患互聯平臺為整個專科醫療服務過程賦能，患者的診治由相關專科醫師共同負責。患者病歷將會提前傳送到醫生手中，醫生團隊對病歷進行詳細研究，為患者訂制出最優的治療方案。會診結束後，醫生通過醫患互聯平臺提供康復指導，用藥建議，全面跟進後續治療過程，為患者提供一站式高端醫療服務。",
        sc_content: "訊智的專科醫療服務涵蓋30多個科室，由香港資深私人執業醫生應診，為患者的健康把關。訊智醫患互聯平臺為整個專科醫療服務過程賦能，患者的診治由相關專科醫師共同負責。患者病歷將會提前傳送到醫生手中，醫生團隊對病歷進行詳細研究，為患者訂制出最優的治療方案。會診結束後，醫生通過醫患互聯平臺提供康復指導，用藥建議，全面跟進後續治療過程，為患者提供一站式高端醫療服務。",
        alttext: "專科服務",
        picture: "/images/service-placeholder-1.png",
        priority: 50,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        slug: "疫苗服務",
        en_metaname: "疫苗服務",
        tc_metaname: "疫苗服務",
        sc_metaname: "疫苗服務",
        en_metadesc: "訊智提供覆蓋各個年齡段的多種疫苗注射服務。在訊智醫患互聯平臺上，由家庭醫生説明客戶通過年齡、家族病史及生活習慣等個人因素正確選擇合適的疫苗注射項目。客戶可以通過醫患互聯平臺進行預約，注射結束後有電子版疫苗牌照作為注射證明，同時由相關醫生跟進提供相關建議，以應對疫苗注射後的不良反應情況。",
        tc_metadesc: "訊智提供覆蓋各個年齡段的多種疫苗注射服務。在訊智醫患互聯平臺上，由家庭醫生説明客戶通過年齡、家族病史及生活習慣等個人因素正確選擇合適的疫苗注射項目。客戶可以通過醫患互聯平臺進行預約，注射結束後有電子版疫苗牌照作為注射證明，同時由相關醫生跟進提供相關建議，以應對疫苗注射後的不良反應情況。",
        sc_metadesc: "訊智提供覆蓋各個年齡段的多種疫苗注射服務。在訊智醫患互聯平臺上，由家庭醫生説明客戶通過年齡、家族病史及生活習慣等個人因素正確選擇合適的疫苗注射項目。客戶可以通過醫患互聯平臺進行預約，注射結束後有電子版疫苗牌照作為注射證明，同時由相關醫生跟進提供相關建議，以應對疫苗注射後的不良反應情況。",
        en_title: "疫苗服務",
        tc_title: "疫苗服務",
        sc_title: "疫苗服務",
        en_content: "訊智提供覆蓋各個年齡段的多種疫苗注射服務。在訊智醫患互聯平臺上，由家庭醫生説明客戶通過年齡、家族病史及生活習慣等個人因素正確選擇合適的疫苗注射項目。客戶可以通過醫患互聯平臺進行預約，注射結束後有電子版疫苗牌照作為注射證明，同時由相關醫生跟進提供相關建議，以應對疫苗注射後的不良反應情況。",
        tc_content: "訊智提供覆蓋各個年齡段的多種疫苗注射服務。在訊智醫患互聯平臺上，由家庭醫生説明客戶通過年齡、家族病史及生活習慣等個人因素正確選擇合適的疫苗注射項目。客戶可以通過醫患互聯平臺進行預約，注射結束後有電子版疫苗牌照作為注射證明，同時由相關醫生跟進提供相關建議，以應對疫苗注射後的不良反應情況。",
        sc_content: "訊智提供覆蓋各個年齡段的多種疫苗注射服務。在訊智醫患互聯平臺上，由家庭醫生説明客戶通過年齡、家族病史及生活習慣等個人因素正確選擇合適的疫苗注射項目。客戶可以通過醫患互聯平臺進行預約，注射結束後有電子版疫苗牌照作為注射證明，同時由相關醫生跟進提供相關建議，以應對疫苗注射後的不良反應情況。",
        alttext: "疫苗服務",
        picture: "/images/service-placeholder-2.png",
        priority: 50,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        slug: "體檢服務",
        en_metaname: "體檢服務",
        tc_metaname: "體檢服務",
        sc_metaname: "體檢服務",
        en_metadesc: "訊智在深港兩地設立實體醫療中心，為深港居民提供多種體格檢查和診斷服務。訊智的體檢計畫包括檢查、報告講解、轉介、診斷及治療諮詢建議等服務。體檢者可以選擇將體檢報告上載到醫患互聯平臺，獲得專業家庭醫生有關健康管理的建議，以預防疾病的發生或儘早得出治療方案。",
        tc_metadesc: "訊智在深港兩地設立實體醫療中心，為深港居民提供多種體格檢查和診斷服務。訊智的體檢計畫包括檢查、報告講解、轉介、診斷及治療諮詢建議等服務。體檢者可以選擇將體檢報告上載到醫患互聯平臺，獲得專業家庭醫生有關健康管理的建議，以預防疾病的發生或儘早得出治療方案。",
        sc_metadesc: "訊智在深港兩地設立實體醫療中心，為深港居民提供多種體格檢查和診斷服務。訊智的體檢計畫包括檢查、報告講解、轉介、診斷及治療諮詢建議等服務。體檢者可以選擇將體檢報告上載到醫患互聯平臺，獲得專業家庭醫生有關健康管理的建議，以預防疾病的發生或儘早得出治療方案。",
        en_title: "體檢服務",
        tc_title: "體檢服務",
        sc_title: "體檢服務",
        en_content: "訊智在深港兩地設立實體醫療中心，為深港居民提供多種體格檢查和診斷服務。訊智的體檢計畫包括檢查、報告講解、轉介、診斷及治療諮詢建議等服務。體檢者可以選擇將體檢報告上載到醫患互聯平臺，獲得專業家庭醫生有關健康管理的建議，以預防疾病的發生或儘早得出治療方案。",
        tc_content: "訊智在深港兩地設立實體醫療中心，為深港居民提供多種體格檢查和診斷服務。訊智的體檢計畫包括檢查、報告講解、轉介、診斷及治療諮詢建議等服務。體檢者可以選擇將體檢報告上載到醫患互聯平臺，獲得專業家庭醫生有關健康管理的建議，以預防疾病的發生或儘早得出治療方案。",
        sc_content: "訊智在深港兩地設立實體醫療中心，為深港居民提供多種體格檢查和診斷服務。訊智的體檢計畫包括檢查、報告講解、轉介、診斷及治療諮詢建議等服務。體檢者可以選擇將體檢報告上載到醫患互聯平臺，獲得專業家庭醫生有關健康管理的建議，以預防疾病的發生或儘早得出治療方案。",
        alttext: "體檢服務",
        picture: "/images/service-placeholder-3.png",
        priority: 50,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        slug: "遠端視頻問診服務",
        en_metaname: "遠端視頻問診服務",
        tc_metaname: "遠端視頻問診服務",
        sc_metaname: "遠端視頻問診服務",
        en_metadesc: "訊智遠端視頻問診服務通過醫患互聯平臺進行，為患者提供與香港資深醫師面對面交流問診的機會，讓優質醫療資源突破地域限制。患者可以流覽訊智醫生的基本介紹、每節時限、收費、可供選擇時段等資訊，並上載病歷資訊及報告，經電子支付繳費後確認預約。在遠端視頻問診結束後，醫生會跟進治療過程，並回饋建議。",
        tc_metadesc: "訊智遠端視頻問診服務通過醫患互聯平臺進行，為患者提供與香港資深醫師面對面交流問診的機會，讓優質醫療資源突破地域限制。患者可以流覽訊智醫生的基本介紹、每節時限、收費、可供選擇時段等資訊，並上載病歷資訊及報告，經電子支付繳費後確認預約。在遠端視頻問診結束後，醫生會跟進治療過程，並回饋建議。",
        sc_metadesc: "訊智遠端視頻問診服務通過醫患互聯平臺進行，為患者提供與香港資深醫師面對面交流問診的機會，讓優質醫療資源突破地域限制。患者可以流覽訊智醫生的基本介紹、每節時限、收費、可供選擇時段等資訊，並上載病歷資訊及報告，經電子支付繳費後確認預約。在遠端視頻問診結束後，醫生會跟進治療過程，並回饋建議。",
        en_title: "遠端視頻問診服務",
        tc_title: "遠端視頻問診服務",
        sc_title: "遠端視頻問診服務",
        en_content: "訊智遠端視頻問診服務通過醫患互聯平臺進行，為患者提供與香港資深醫師面對面交流問診的機會，讓優質醫療資源突破地域限制。患者可以流覽訊智醫生的基本介紹、每節時限、收費、可供選擇時段等資訊，並上載病歷資訊及報告，經電子支付繳費後確認預約。在遠端視頻問診結束後，醫生會跟進治療過程，並回饋建議。",
        tc_content: "訊智遠端視頻問診服務通過醫患互聯平臺進行，為患者提供與香港資深醫師面對面交流問診的機會，讓優質醫療資源突破地域限制。患者可以流覽訊智醫生的基本介紹、每節時限、收費、可供選擇時段等資訊，並上載病歷資訊及報告，經電子支付繳費後確認預約。在遠端視頻問診結束後，醫生會跟進治療過程，並回饋建議。",
        sc_content: "訊智遠端視頻問診服務通過醫患互聯平臺進行，為患者提供與香港資深醫師面對面交流問診的機會，讓優質醫療資源突破地域限制。患者可以流覽訊智醫生的基本介紹、每節時限、收費、可供選擇時段等資訊，並上載病歷資訊及報告，經電子支付繳費後確認預約。在遠端視頻問診結束後，醫生會跟進治療過程，並回饋建議。",
        alttext: "遠端視頻問診服務",
        picture: "/images/service-placeholder-1.png",
        priority: 50,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        slug: "新冠肺炎檢測服務",
        en_metaname: "新冠肺炎檢測服務",
        tc_metaname: "新冠肺炎檢測服務",
        sc_metaname: "新冠肺炎檢測服務",
        en_metadesc: "在新型冠狀病毒 (COVID-19) 持續擴散下，訊智關注居民的健康狀況，積極投入到新冠肺炎的預防和控制工作中，提供新冠肺炎檢測服務（深喉唾液化驗) (已包括測試及化驗報告)，以應疫情的最新發展，降低社區傳播風險。",
        tc_metadesc: "在新型冠狀病毒 (COVID-19) 持續擴散下，訊智關注居民的健康狀況，積極投入到新冠肺炎的預防和控制工作中，提供新冠肺炎檢測服務（深喉唾液化驗) (已包括測試及化驗報告)，以應疫情的最新發展，降低社區傳播風險。",
        sc_metadesc: "在新型冠狀病毒 (COVID-19) 持續擴散下，訊智關注居民的健康狀況，積極投入到新冠肺炎的預防和控制工作中，提供新冠肺炎檢測服務（深喉唾液化驗) (已包括測試及化驗報告)，以應疫情的最新發展，降低社區傳播風險。",
        en_title: "新冠肺炎檢測服務",
        tc_title: "新冠肺炎檢測服務",
        sc_title: "新冠肺炎檢測服務",
        en_content: "在新型冠狀病毒 (COVID-19) 持續擴散下，訊智關注居民的健康狀況，積極投入到新冠肺炎的預防和控制工作中，提供新冠肺炎檢測服務（深喉唾液化驗) (已包括測試及化驗報告)，以應疫情的最新發展，降低社區傳播風險。",
        tc_content: "在新型冠狀病毒 (COVID-19) 持續擴散下，訊智關注居民的健康狀況，積極投入到新冠肺炎的預防和控制工作中，提供新冠肺炎檢測服務（深喉唾液化驗) (已包括測試及化驗報告)，以應疫情的最新發展，降低社區傳播風險。",
        sc_content: "在新型冠狀病毒 (COVID-19) 持續擴散下，訊智關注居民的健康狀況，積極投入到新冠肺炎的預防和控制工作中，提供新冠肺炎檢測服務（深喉唾液化驗) (已包括測試及化驗報告)，以應疫情的最新發展，降低社區傳播風險。",
        alttext: "新冠肺炎檢測服務",
        picture: "/images/service-placeholder-2.png",
        priority: 50,
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('services', null, {});
  }
};
