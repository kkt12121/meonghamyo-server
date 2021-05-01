const { content } = require('../../models');

module.exports = {
    get: async (req, res) => {
        // boardName이 parcelOutContent에 해당하는 content만 불러온다                
           const contentInfo = await content.findAll({
               where: { boardName: "parcelOutContent" }
           })
           res.status(200).json({ data: [{contentInfo}], message: ' sell page ok' })          
       }  
}