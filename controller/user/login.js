const { user } = require("../../models");

module.exports = {
  post: async (req, res) => {
    // db에 일치하는 email과 password가 존재하는지 찾는다
    const userInfo = await user.findOne({
      where: { email: req.body.email, password: req.body.password },
    });
    console.log("이게 로그인한 유저 정보야 !!!!!!!", userInfo);
    // userInfo가 없으면 401오류를 메세지와 보낸다
    if (!userInfo) {
      return res.status(401).send({ message: "wrong login request" });
    } else {
      // 존재할경우 session에 userId에 유저의 id를 저장하고 유저 정보를 데이터로 보낸다
      req.session.save(() => {
        console.log("이게 로그인한 유저 id야 !!!!!!!", userInfo.id);
        req.session.userId = userInfo.id;
        res.header("Content-Type", "application/json");
        res.status(200).send({ data: [{ userInfo }], message: "ok" });
      });
    }
  },
};
