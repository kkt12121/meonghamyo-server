var multer = require('multer'); 
var express = require('express');
var router = express.Router();

const { userController } = require('../controller');

// * POST /login
router.post('/login', userController.login.post);

// * POST /signup
router.post('/signup', userController.signup.post);

// * POST /findpassword
router.post('/findpassword', userController.findpassword.post);

// * POST /findemail
router.post('/findemail', userController.findemail.post);

module.exports = router;