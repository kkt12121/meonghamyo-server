const { content } = require('../../models');


module.exports = {
    get: async (req, res) => {
        console.log(req.session)
        // boardName이 communityContent에 해당하는 content만 불러온다      
        const contentInfo = await content.findAll({
            where: { boardName: "communityContent" }
        })
    
        res.status(200).json({ data: [{ contentInfo }], message: ' community page ok' })
  }
}