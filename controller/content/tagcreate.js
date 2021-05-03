const { tag } = require('../../models');
const { tagContent } = require('../../models');

module.exports = {
    post: async (req, res) => {
       const { tagName } = req.body

       const tagCheck = await tag.findOne({
          where: {tagName: tagName}
       })

       if(!req.session.userId) {
         return res.status(401).json({ message: 'Please login' })
       } else {
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
               req.params.tagId = data.dataValues.id // 현재 comment의 고유id를 req.params의 저장시킨다               
               console.log(req.params)                  
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