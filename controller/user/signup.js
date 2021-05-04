const { user } = require('../../models');

module.exports = {
    post : async (req, res) => {
    // email: hongildong@gmail.com
    // password: mine7579       
    
    const { email, password, name, nickname, birth } = req.body
    
    // 하나의 로직이라고 작성하지 않았다면 422오류와 메세지 전송
    if(!email || !password || !name || !nickname || !birth) {
       return res.status(422).send({ message: "insufficient parameters supplied" })
    }
    
    // 이미 존재하는 email인지 확인
    const checkEmail = await user.findOne({
        where: { email: email }
    })
    // 이미 존재하는 nickname인지확인
    const checkNickname = await user.findOne({
        where: { nickname: nickname }
    })
    
    // 존재한다면 409오류와 메세지 전송
    if(checkEmail) {
        return res.status(409).send({ message: "This email exists" })
    }
    
    // 존재한다면 409오류와 메세지 전송
    if(checkNickname) {
        return res.status(409).send({ message: "This is a nickname that exists" })
    }
    
    // email 과 nickname이 모두 존재하지 않는다면 새로운 user생성  
    if(!checkEmail && !checkNickname) {
        user
        .create({
            email: email,
            password: password,
            name: name,
            nickname: nickname,
            birth: birth
        })
        .then((data) => {
            // console.log(data)
            res.status(201).send({data: [{
                id: data.dataValues.id,
                email: data.dataValues.email,
                password: data.dataValues.password,
                name: data.dataValues.name,
                nickname: data.dataValues.nickname,
                birth: data.dataValues.birth,
            }]})  
        })
        .catch((err) => {
            res.status(500).send('err');
          });
    } 
  }
}