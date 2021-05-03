
var express = require('express');
var router = express.Router();
var multer = require('multer'); 
const upload = multer({
    dest : 'uploads/'
});
// req.file.path

const { mypageController } = require('../controller');

router.post('/profileupload',upload.single('image'), mypageController.upload.post)


router.post('/logout', mypageController.logout.post);

// * DELETE /userdelete
router.delete('/userdelete', mypageController.userdelete.delete);

// * PUT /userupdate
router.put('/userupdate', mypageController.userupdate.put);

// * GET /userinfo
router.get('/userinfo', mypageController.userinfo.get);

// * GET /usercontent
router.get('/usercontent', mypageController.usercontent.get);

// * GET /usercomment
router.get('/usercomment', mypageController.usercomment.get);

module.exports = router;