const { content } = require('../../models');
const { comment } = require('../../models');
const { tag } = require('../../models');
const {tagContent} = require('../../models');

module.exports = {
    get: async (req, res) => {       
       
       if(!req.params.id) {
           res.status(400).send({ message: "존재하지 않는 글입니다 !" })
       } else {
           // content정보 불러오기
           const contentInfo = await content.findOne({
            where: { id: req.params.id }
           })
           
           // comment정보 불러오기
           const commentInfo = await comment.findAll({
            where: { contentId: req.params.id }
           })

        // tag 더 생각해보기 
        //    const tagInfo = await tagContents.findAll({
        //        where: { contentId: req.params.id, tagId: d, }
        //    })

           res.status(200).send({ data: [{contentInfo, commentInfo}], message: `${req.params.id}번 게시글 정보입니다 !` })
       }
  }
}