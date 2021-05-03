'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tags', [{                        
      tagName: "산책",      
     },
     {                   
      tagName: "강아지",      
     },
     {                   
      tagName: "고양이",      
     }            
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tags', null, {});
  }
};
