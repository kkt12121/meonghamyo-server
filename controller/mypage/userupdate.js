const { user } = require('../../models');

module.exports = {
  put: (req, res) => {
     const { name, birth, password, nickname } = req.body;
     // session에 userId에 해당하는 user를 찾아서 바꿀정보를 update한다
      user
       .update(
         {
           name: name,
           birth: birth,
           password: password,
           nickname: nickname
         },
         {
           where: {
             id: req.session.userId,
           },
         },
       ).then((data) => {
          console.log(data)
          res.status(200).send({ "message": "complete update !" })
       })
        .catch((err) => {
           res.status(500).send('err');
       });
  },
};