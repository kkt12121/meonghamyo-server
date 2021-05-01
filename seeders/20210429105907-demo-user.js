'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{   
      email: "hongildong@gmail.com",
      password: "mine7579",
      name: "홍길동",
      nickname: "홍집사",
      birth: "1992-12-31",
      chatbox: "4살 스피치 같이 산책하실분 구해요 ~~~",
      img: "test.jpg",
      createdAt: new Date(),
      updatedAt: new Date() 
     },
     {   
       email: "kkd000@gmail.com",
       password: "1234",
       name: "김코딩",
       nickname: "코집사",
       birth: "2000-12-31",
       chatbox: "강아지 분양 희망합니다 ~!",
       img: "test2.jpg",
       createdAt: new Date(),
       updatedAt: new Date() 
       }
      ]);

      const users = await queryInterface.sequelize.query(
        `SELECT id from users;`
      );
  
      const userRows = users[0];

      return await queryInterface.bulkInsert('contents', [{
        userId: userRows[0].id,
        boardName: "parcelOutContent",
        title: "스피치 분양합니다 !",
        img: "testContent.jpg",
        contentBody: "분양희망 하시는분은 연락주세요 !",
        hit: 15,
        like: 10,
        createdAt: new Date(),
        updatedAt: new Date() 
       },
       {
        userId: userRows[0].id,
        boardName: "communityContent",
        title: "산책 메이트 구합니다 ~!",
        img: "testContent.jpg",
        contentBody: "산책희망 하시는분은 연락주세요 !",
        hit: 5,
        like: 9,
        createdAt: new Date(),
        updatedAt: new Date() 
       }
       ]);
 
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('contents', null, {});
  }
};
