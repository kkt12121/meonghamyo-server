'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tags', [{                        
      tagName: "산책",
      createdAt: new Date(),
      updatedAt: new Date()       
     },
     {                   
      tagName: "강아지",
      createdAt: new Date(),
      updatedAt: new Date()       
     },
     {                   
      tagName: "고양이",
      createdAt: new Date(),
      updatedAt: new Date()       
     }            
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tags', null, {});
  }
};
