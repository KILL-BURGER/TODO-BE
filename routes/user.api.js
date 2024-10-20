const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

// 회원가입 API
router.post('/', userController.createUser);

// 로그인 API
router.post('/login', userController.loginWithEmail);


module.exports = router;