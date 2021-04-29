const { user } = require('../../models');

module.exports = {
    post: async (req, res) => {
    // email: hongildong@gmail.com
    // password: mine7579   
    
    // 일치하는 email과 birth가 있는지 확인
    const userInfoCheck = await user.findOne({
        where: { email: req.body.email }
    })

    if(userInfoCheck) {
        const { password } = userInfoCheck
        res.status(200).send({ data: password, message: "ok" })
    } else {
        res.status(400).send({ message: "Please check again" })
    }
    
}
}