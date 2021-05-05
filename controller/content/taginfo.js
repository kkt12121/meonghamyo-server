const { content } = require('../../models');
const { tagContent } = require('../../models');
const { tag } = require('../../models');

module.exports = {
    get: async (req, res) => {
           //  console.log("quert.tag찾기: ",req.params)
           
           if(req.params.tag) {
             const tagFind = await tag.findOne({
                 where: { tagName: req.params.tag }
             })
             //  console.log("---------------------------------------------")
             //  console.log("tagFind찾기: ",tagFind)
             // 조인 테이블에서 선택된 태그와 같은 필드의 contentId찾기
              const contentIdFind = await tagContent.findAll({
                  where: { tagId: tagFind.id }
              })
              //  console.log("---------------------------------------------")
              //  console.log("ontentIdFind찾기: ",contentIdFind[0].contentId)
              
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
            //   console.log(result)
              res.status(200).send({ data: [{ result }], message: "tagInfo ok !" })
            } else {
              res.status(401).send({ message: "This tag does not exist !" }) 
           } 
             
    }  
}