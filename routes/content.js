var express = require("express");
var router = express.Router();
var multer = require("multer");
// 배포
const path = require("path");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});

const { contentController } = require("../controller");

// 배포환경
// const upload = multer({
//     dest : 'uploads/'
// });

// router.post('/profileupload',upload.single('image'), contentController.upload.post)

router.post(
  "/profileupload",
  upload.single("image"),
  contentController.upload.post
);

// * POST /contentcreate
router.post("/create", contentController.contentcreate.post);

// * GET /parceloutpage
router.get("/parceloutpage", contentController.parceloutpage.get);

// * GET /communitypage
router.get("/communitypage", contentController.communitypage.get);

// * PUT /contentupdate
router.put("/:id/update", contentController.contentupdate.put);

// * DELETE /contentdelete
router.delete("/:id/delete", contentController.contentdelete.delete);

// * POST /taginfo
router.post("/taginfo", contentController.taginfo.post);

// * GET /contentinfo
router.get("/:id", contentController.contentinfo.get);

// * POST /commentcreate
router.post("/:id/commentcreate", contentController.commentcreate.post);

// * PUT /commentupdate
router.put(
  "/:id/:commentId/commentupdate",
  contentController.commentupdate.put
);

// * DELETE /commentdelete
router.delete(
  "/:id/:commentId/commentdelete",
  contentController.commentdelete.delete
);

module.exports = router;
