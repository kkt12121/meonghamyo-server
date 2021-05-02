const { comment } = require('../../models');

module.exports = {
    post: async (req, res) => {
    
      const { commentBody } = req.body   
      // 로그인을 해야 conmment를 작성할수 있으므로
      // session정보 확인을 통해 로그인 유무를 확인한다 
      // 로그인 상태가 아니라면 로그인 하라고 메세지를 보낸다 
       if(!req.session.userId) {
         res.status(401).json({ message: 'Please login' })
       } else {
           comment
           .create({
               userId: req.session.userId, 
               contentId: req.params.id,            
               commentBody: commentBody               
           })
           .then((data) => {
              //  console.log(data)
               res.status(201).send({ data: [{
                  userId: req.session.userId,
                  contentId: req.params.id,
                  commentBody: data.dataValues.commentBody
               }]})
               req.params.commentId = data.dataValues.id // 현재 comment의 고유id를 req.params의 저장시킨다
               console.log(req.params)               
           })
           .catch((err) => {
            res.status(500).send('err');
          });
       }
  }
}