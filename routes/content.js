var express = require('express');
var router = express.Router();

const { contentController } = require('../controller');

// * POST /contentcreate
router.post('/contentcreate/:id+', contentController.contentcreate.post);

// * DELETE /contentdelete
router.delete('/contentdelete/:id', contentController.contentdelete.delete);

// * PUT /contentupdate
router.put('/contentupdate/:id', contentController.contentupdate.put);

// * GET /sellpage
router.get('/sellpage', contentController.sellpage.get);

// * GET /contentdelete
router.get('/communitypage', contentController.communitypage.get);

module.exports = router;