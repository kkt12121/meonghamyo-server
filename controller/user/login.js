const { user } = require('../../models');

module.exports = {
    post: async (req, res) => {
    // email: hongildong@gmail.com
    // password: mine7579   
    // console.log(req.body)
    // db에 일치하는 email과 password가 존재하는지 찾는다
    const userInfo = await user.findOne({
        where: { email: req.body.email, password: req.body.password }
    })
    
    // userInfo가 없으면 401오류를 메세지와 보낸다
    if(!userInfo) {
        res.status(401).send({ message: "wrong login request" })
    } else {
        // 존재할경우 session에 userId에 유저의 id를 저장하고 유저 정보를 데이터로 보낸다
        req.session.save(() => {
            req.session.userId = userInfo.id
            res.status(200).send({ data: [{userInfo}], message: 'ok' })
            // console.log(req.session)
        })       
    }
  }
}