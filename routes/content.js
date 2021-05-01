var express = require('express');
var router = express.Router();

const { contentController } = require('../controller');

// * POST /contentcreate
// contentid : 27 && userid : 23
// 1. communitypage에서 모든 글목록을 불러오고
// 2. 글번호가 27번인 글을 클릭
// 3. 화면에 27번 글의 대한 정보가 렌더됨
// 4. 수정 삭제 버튼이 존재
// 5. 2. 과정에서 이미 contentid가 불려진 상태이니 userid가 같으면 삭제
// delete
router.post('/create', contentController.contentcreate.post);

router.get('/:id', contentController.contentinfo.get);

// * DELETE /contentdelete
router.delete('/:id/delete', contentController.contentdelete.delete);

// * PUT /contentupdate
router.put('/:id/update', contentController.contentupdate.put);

// * GET /sellpage
router.get('/parceloutpage', contentController.parceloutpage.get);

// * GET /contentdelete
router.get('/communitypage', contentController.communitypage.get);

module.exports = router;