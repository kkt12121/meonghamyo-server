const { content } = require('../../models');

module.exports = {
    get: async (req, res) => {       
        // session에 있는 userId가 없으면 없다는 메세지를 보낸다
       if(!req.session.userId) {
         return res.status(401).json({ message: 'not authorized' })
       } else {
           // session에 있는 userId를 user안에 일치하는 id를찾아서
           // 그 유저가 작성한 모든 content를 보낸다.
           const userContents = await content.findAll({
               where: { userId: req.session.userId }
           })
           res.status(200).json({ data: [{userContents}], message: 'usercontent ok' })
       }
  }
}