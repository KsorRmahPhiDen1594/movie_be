const express = require('express');
const router = express.Router();

// Controller
const authController = require('../controllers/movie/auth.controller');

// Đăng ký người dùng
router.post('/register', authController.register);

// Đăng nhập người dùng
router.post('/login', authController.login);

// Xuất khẩu các route
module.exports = router;
