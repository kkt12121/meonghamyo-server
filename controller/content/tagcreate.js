const { tag } = require('../../models');
const { tagContent } = require('../../models');

module.exports = {
    post: async (req, res) => {

       const { tagName } = req.body
       // 이미 존재하는 태그인지 확인
       const tagCheck = await tag.findOne({
          where: {tagName: tagName}
       })
       
       if(!req.session.userId) {
         return res.status(401).json({ message: 'Please login' })
       } else {
        // 존재하는 태그가 아니라면 태그를 create한다  
        if(!tagCheck) { 
          tag
           .create({                       
               tagName: tagName               
           })
           .then((data) => {
              //  console.log(data)
               res.status(201).send({ data: [{
                    tagName: data.dataValues.tagName
               }]})
               req.params.tagId = data.dataValues.id // 현재 tag의 id를 params의 저장시킨다               
               // console.log(req.params)
               // 다대다 관계를 위해 현재 컨텐트의 id와 새로만든 tag의 id를
               // tagContent에 추가시켜 create한다
               if(req.params.id) {
                tagContent
                .create({
                  contentId: req.params.id,
                  tagId: req.params.tagId                    
                })               
                 .catch((err) => {
                     res.status(500).send('err');
                  });             
                 }
               })    
         } else {
              // 이미 만들어진 태그면 기존의 태그의 id를 넣어준다
              res.status(200).send({ data: [{ tagCheck }] })  
              tagContent
              .create({
                contentId: req.params.id,
                tagId: tagCheck.id                    
              })               
               .catch((err) => {
                   res.status(500).send('err');
            });  
         }    
      } 
   }
}