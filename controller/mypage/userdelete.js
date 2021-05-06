const { user } = require('../../models');

module.exports = {
  delete: (req, res) => {
       // session안에 userId가 존재하는 확인한다
       // 존재 하지않으면 로그인 상태가 아니기에 오류메세지를 보낸다
       if(!req.session.userId) {
         return res.status(401).json({ message: 'not authorized' })
       } else {
         // session에 들어있는 userId와 user안에있는 id와 일치하는 유저를 찾아서
         // 그 유저의 데이터를 없앤다
         user
         .destroy({
           where: {
             id: req.session.userId,
           },
         })
         .then(() => {
           //session 정보도 지워줘야함.
           req.session.destroy((err) => {
             if (err) {
               return res.status(400).send({ "message": 'you are currently not logined'});
             } else {
               res.status(200).send({"message": 'You have been safely withdrawn.'});
             }
           });
         })
        .catch((err) => {
           res.status(500).send('err');
         });
     }       
  },
};