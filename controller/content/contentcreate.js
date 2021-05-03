const { content } = require('../../models');
// const { tag } = require('../../models');
// const { tagContent } = require('../../models');
// const { post } = require('./tagcreate') 

module.exports = {
    post: async (req, res) => {
    
      const { title, contentBody, boardName, img } = req.body   
      // 로그인을 해야 content를 작성할수 있으므로
      // session정보 확인을 통해 로그인 유무를 확인한다 
      // 로그인 상태가 아니라면 로그인 하라고 메세지를 보낸다 
       if(!req.session.userId) {
         return res.status(401).json({ message: 'Please login' })
       } else {
           // 로그인 상태라면 content를 create한다
           console.log(req.params)     
           content
           .create({
               title: title,
               userId: req.session.userId,
               boardName: boardName,
               contentBody: contentBody,
               img: img
           })
           .then((data) => {
              res.status(201).send({ data: [{             
                      userId: req.session.userId,
                      title: data.dataValues.title,
                      boardName: data.dataValues.boardName,
                      contentBody: data.dataValues.contentBody,
                      img: data.dataValues.img
                   }]})                                     
              req.params.id = data.dataValues.id
            //  if(req.params.id) {   
            //   tagContent
            //       .create({
            //         contentId: req.params.id,                    
            //       })
            //   }                   
           })
           .catch((err) => {
            return res.status(500).send('err');
          });   
         
        }
     }
}