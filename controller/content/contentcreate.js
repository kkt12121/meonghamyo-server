const { content } = require('../../models');

module.exports = {
    post: async (req, res) => {
    
      const { title, contentBody, boardName, img } = req.body   
      // 로그인을 해야 content를 작성할수 있으므로
      // session정보 확인을 통해 로그인 유무를 확인한다 
      // 로그인 상태가 아니라면 로그인 하라고 메세지를 보낸다 
       if(!req.session.userId) {
         res.status(401).json({ message: 'Please login' })
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
              //  console.log(data)
               res.status(201).send({ data: [{
                  id: req.session.id,
                  userId: req.session.userId,
                  title: data.dataValues.title,
                  boardName: data.dataValues.boardName,
                  contentBody: data.dataValues.contentBody,
                  img: data.dataValues.img
               }]})               
                req.session.contentId = data.dataValues.id
                // console.log(req.params)                              
           })
           .catch((err) => {
            res.status(500).send('err');
          });
       }
  }
}