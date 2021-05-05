const { user } = require('../../models');

module.exports = {
    post: async (req, res) => {
    // email: hongildong@gmail.com
    // password: mine7579   
    
    // 일치하는 email이 있는지 확인
    const userInfoCheck = await user.findOne({
        where: { email: req.body.email }
    })
    
    // 일치하는 email이 있다면 그 유저의 password만 넘겨준다
    if(userInfoCheck) {
        const { password } = userInfoCheck
        res.status(200).send({ data: [{password}], message: "ok" })
    } else {
        // 없다면 오류 메세지를 보낸다 
        return res.status(400).send({ message: "Please check again" })
    }
    
  }
}