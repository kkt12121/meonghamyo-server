const { content } = require('../../models');
const { tagContent } = require('../../models');
const { tag } = require('../../models');

module.exports = {
    post: async (req, res) => {
           // 선택된 태그의 tagName을 db에서 찾는다 
           if(req.body.tagName) {
             const tagFind = await tag.findOne({
                 where: { tagName: req.body.tagName }
             })
          
             // 조인 테이블에서 선택된 태그와 같은 필드의 contentId찾기
              const contentIdFind = await tagContent.findAll({
                  where: { tagId: tagFind.id }
              })           
              
              // 태그가 포함된 컨텐트 정보가 담겨져 있음
              const result = await Promise.all(
                contentIdFind.map(el => content.findAll({
                     where: { id: el.contentId },
                     include: [{
                        model: tag,
                        attributes: ["tagName"]
                    }]
                 }))
              )  
              res.status(200).send({ data: [{ result }], message: "tagInfo ok !" })
            } else {
              res.status(401).send({ message: "This tag does not exist !" }) 
           } 
             
    }  
}