const { content } = require('../../models');
const { user } = require('../../models');
const { tag } = require('../../models');

module.exports = {
    get: async (req, res) => {
        // boardName이 parcelOutContent에 해당하는 content만 불러온다
        // contentInfo 안에 작성한 유저의 닉네임을 포함시킨다       
           const contentInfo = await content.findAll({               
                where: {
                    boardName: "parcelOutContent"
                },
                include: [{
                    model: user,                  
                    attributes: ['nickname'],
                },
                {
                    model: tag,
                    attributes: ['tagName'],      
               }]            
           })
           res.status(200).json({ data: [{contentInfo}], message: ' sell page ok' })          
       }  
}