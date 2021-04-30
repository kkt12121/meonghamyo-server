'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const users = await queryInterface.sequelize.query(
      `SELECT id from users;`
    );
    const contents = await queryInterface.sequelize.query(
      `SELECT id from contents;`
    )

    const userRows = users[0];
    const contentRows = contents[0];

    await queryInterface.bulkInsert('comments', [{
      userId: userRows[0].id,
      contentId: contentRows[1].id,                      
      commentBody: "강아지 넘 귀엽다 !",      
      createdAt: new Date(),
      updatedAt: new Date() 
     },
     {
      userId: userRows[0].id,
      contentId: contentRows[0].id,                      
      commentBody: "어디로 연락드리면 될까요?",      
      createdAt: new Date(),
      updatedAt: new Date() 
     }      
    ]);

  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comments', null, {});
  }
};
