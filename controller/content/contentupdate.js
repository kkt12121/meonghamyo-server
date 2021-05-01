const { content } = require('../../models');

module.exports = {
  put: (req, res) => {
     const { title, boardCode, contentBody, img } = req.body;
     // session에 userId에 해당하는 user를 찾아서 바꿀정보를 update한다
      content
       .update(
         {
           title: title,
           boardCode: boardCode,
           contentBody: contentBody,
           img: img
         },
         {
           where: {
             contentId: req.session.userId,
             id: req.params.id
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