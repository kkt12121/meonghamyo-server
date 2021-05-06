const { comment } = require('../../models');

module.exports = {
  put: (req, res) => {
     const { commentBody, } = req.body;
     // 로그인 상태라면 유저가 작성한 글인지 확인하고
     // 댓글이 해당 content의 댓글인지 확인후
     // 수정할 댓글을 params의 저장되어있는 commentId로 찾아서
     // update시킨다     
      if(!req.session.userId) {
        return res.status(401).json({ message: 'Please login' })
      } else {    
       comment
        .update(
          {           
            commentBody: commentBody          
          },
          {
            where: {
              id: req.params.commentId,                
              userId: req.session.userId,
              contentId: req.params.id
            },
          },
        ).then((data) => {
           res.status(200).send({ "message": "comment update successful !" })
        })
         .catch((err) => {
            res.status(500).send('err');
        });
     }    
  },
};