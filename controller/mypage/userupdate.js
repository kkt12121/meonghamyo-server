const { user } = require('../../models');

module.exports = {
  put: (req, res) => {
     const { name, birth, password, nickname, img } = req.body;
     // session에 userId에 해당하는 user를 찾아서 바꿀정보를 update한다
     if(!req.session.userId) {
       return res.status(401).json({ message: 'not authorized' })
     } else {
     // session에 들어있는 userId와 user안에있는 id와 일치하는 유저를 찾아서
     // 그 유저의 데이터중 변경시킬 내용을 업데이트 한다  
      user
       .update(
         {
           name: name,
           birth: birth,
           password: password,
           nickname: nickname,
           img: img
         },
         {
           where: {
             id: req.session.userId,
           },
         },
       ).then((data) => {
          res.status(200).send({ "message": "complete update !" })
       })
        .catch((err) => {
           res.status(500).send('err');
       });
    }   
  },
};