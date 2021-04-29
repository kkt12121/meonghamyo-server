'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('users', [{
    email: "hongildong@gmail.com",
    password: "mine7579",
    name: "홍길동",
    nickname: "홍집사",
    birth: "1992-12-31",
    chatbox: "",
    createdAt: new Date(),
    updatedAt: new Date() 
  }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('users', null, {});
  
  }
};
