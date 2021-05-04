// const { user } = require('../../models');

module.exports = {
    post: async (req, res) => {
       // session에 정보가 있으면 그session에 정보를 없앤다.
       // console.log(req.session)        
       if(req.session) {
           req.session.destroy()
           res.status(200).send({ message: "successfully logout!" })
       } else {
           // session에 정보가 없으면 로그인 상태가 아니라는 메세지를 보낸다
           return res.status(400).send({ message: "you're currently not logined" })
       }
  }
}