const { content } = require('../../models');
const { tag } = require('../../models');
const { tagContent } = require('../../models');

module.exports = {
    post: async (req, res) => {

        const { title, contentBody, boardName, img, tagName } = req.body      
        // 글작성을 하기위해 먼저 로그인 유무를 확인한다
        // 로그인 상태가 아니라면 로그인을 하라는 메세지를 보낸다
        if(!req.session.userId) {
            return res.status(401).json({ message: 'Please login' })
          } else {
             // 로그인 상태면 먼저 content를 create한다
             const contentCreate = await content.create({
                title: title,
                userId: req.session.userId,
                boardName: boardName,
                contentBody: contentBody,
                img: img
             })
             // 만들어진 content의 id값을 paramas에 저장시킨다
             req.params.id = contentCreate.id
             // 태그를 추가시킬건지를 확인한다             
             if(tagName) {
                 // 태그를 추가시킨다하면 배열로 들어오는 tagName을 Promise.all을사용하고
                 // map함수를 돌려서 이미 db에 저장된 tag면 저장된 정보를 보내고
                 // 없는 tag면 새로 만들어서 만들어진 정보를 보낸다
                 const result = await Promise.all(
                    tagName.map(name => tag.findOrCreate({
                        where: { tagName: name }
                    }))
                 )
                 // 2차원 배열인 result를 1차원으로 풀어준다
                 const tags = result.map(r => r[0])
                 
                 tags.map(name => req.params.tagId = name.id)
               
                 // 다대다 테이블 create
                 const tagIdCheck2 = await Promise.all(
                    tags.map(name => tagContent.create({
                       contentId: contentCreate.id,
                       tagId: name.id
                    }))         
                  )
                  
                 res.status(201).send({ data: [{
                    id: req.params.id,             
                    userId: req.session.userId,
                    title: req.body.title,
                    boardName: req.body.boardName,
                    contentBody: req.body.contentBody,
                    img: req.body.img,
                    tagName: req.body.tagName,
                   }]})
                // res.status(201).send(tags)
             } else {
                 // 태그를 추가시키지 않는다면 태그를뺀 나머지 정보를 보내준다 
                 res.status(201).send({ data: [{
                    id: req.params.id,             
                    userId: req.session.userId,
                    title: req.body.title,
                    boardName: req.body.boardName,
                    contentBody: req.body.contentBody,
                    img: req.body.img,                    
                   }]})
             }
        }      
   }
}