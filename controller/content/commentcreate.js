const { comment } = require('../../models');
const { user } = require('../../models');

module.exports = {
    post: async (req, res) => {    
      const { commentBody } = req.body
      const userName = await user.findOne({
        attributes: ['nickname'],
        where: req.session.userId
      })
      // console.log(userName.nickname)

      // 로그인을 해야 comment를 작성할수 있으므로
      // session정보 확인을 통해 로그인 유무를 확인한다 
      // 로그인 상태가 아니라면 로그인 하라고 메세지를 보낸다 
       if(!req.session.userId) {
         return res.status(401).json({ message: 'Please login' })
       } else {
           comment
           .create({
               userId: req.session.userId, 
               userName: userName.nickname,
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
               req.params.commentId = data.dataValues.id // 현재 comment의 id를 params의 저장시킨다
               console.log(req.params)               
           })
           .catch((err) => {
            res.status(500).send('err');
          });
       }
  }
}