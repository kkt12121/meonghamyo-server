const { user } = require('../../models');

module.exports = {
    post: async (req, res) => {
    // email: hongildong@gmail.com
    // password: mine7579   
    
    // 일치하는 name과 birth가 있는지 확인
    const userInfoCheck = await user.findOne({
        where: { name: req.body.name, birth: req.body.birth }
    })
    
    // 모두 일치하는 유저정보가 있으면 email정보만 넘겨준다
    if(userInfoCheck) {
        const { email } = userInfoCheck
        res.status(200).send({ data: [{email}], message: "ok" })
    } else {
        // 없으면 오류 메세지를 보낸다
        return res.status(400).send({ message: "Please check again" })
    }
    
  }
}