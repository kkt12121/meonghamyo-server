const { content } = require('../../models');

module.exports = {
    get: async (req, res) => {          
           const contentInfo = await content.findAll({
               where: { boardCode: 1 }
           })
           res.status(200).json({ data: [{contentInfo}], message: ' sell page ok' })          
       }
  
}