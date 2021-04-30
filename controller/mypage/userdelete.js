// const session = require('express-session');
const { user } = require('../../models');

module.exports = {
  delete: (req, res) => {
     console.log('session userid:', req.session.userId);
       // session에 들어있는 userId를 user에서 찾아서 없앤다
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
               res.status(400).send({ "message": 'you are currently not logined'});
             } else {
               res.status(200).send({"message": 'You have been safely withdrawn.'});
             }
           });
         })
        .catch((err) => {
           res.status(500).send('err');
         });
  },
};