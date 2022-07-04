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

const { mypageController } = require("../controller");

// 개발환경
// const upload = multer({
//     dest : 'uploads/'
// });
// req.file.path

// router.post(
//   "/profileupload",
//   upload.single("image"),
//   mypageController.upload.post
// );

// * POST /imageUpload 배포
router.post(
  "/profileupload",
  upload.single("image"),
  mypageController.upload.post
);

router.post("/logout", mypageController.logout.post);

// * DELETE /userdelete
router.delete("/userdelete", mypageController.userdelete.delete);

// * PUT /userupdate
router.put("/userupdate", mypageController.userupdate.put);

// * GET /userinfo
router.get("/userinfo", mypageController.userinfo.get);

// * GET /usercontent
router.get("/usercontent", mypageController.usercontent.get);

// * GET /usercomment
router.get("/usercomment", mypageController.usercomment.get);

module.exports = router;
