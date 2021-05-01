const { content } = require('../../models');

module.exports = {
    get: async (req, res) => {
        console.log(req.session)       
        const contentInfo = await content.findAll({
            where: { boardCode: 2 }
        })
        res.status(200).json({ data: [{contentInfo}], message: ' community page ok' })
  }
}