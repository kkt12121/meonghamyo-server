var express = require('express');
var router = express.Router();
var multer = require('multer'); 
const upload = multer({
    dest : 'uploads/'
});
const { contentController } = require('../controller');

router.post('/profileupload',upload.single('image'), contentController.upload.post)

// * POST /contentcreate
router.post('/create', contentController.contentcreate.post);

// * GET /parceloutpage
router.get('/parceloutpage', contentController.parceloutpage.get);

// * GET /communitypage
router.get('/communitypage', contentController.communitypage.get);

// * PUT /contentupdate
router.put('/:id/update', contentController.contentupdate.put);

// * DELETE /contentdelete
router.delete('/:id/delete', contentController.contentdelete.delete);

// * GET /contentinfo
router.get('/:id', contentController.contentinfo.get);

// * POST /commentcreate
router.post('/:id/commentcreate', contentController.commentcreate.post);

// * PUT /commentupdate
router.put('/:id/:commentId/commentupdate', contentController.commentupdate.put);

// * DELETE /commentdelete
router.delete('/:id/:commentId/commentdelete', contentController.commentdelete.delete);

module.exports = router;