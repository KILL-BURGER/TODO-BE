const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const authController = require('../controller/auth.controller');

// 회원가입 API
router.post('/', userController.createUser);

// 로그인 API
router.post('/login', userController.loginWithEmail);

// 토큰반환 api
router.get('/me', authController.authenticate, userController.getUser);

module.exports = router;