const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/admincontrolles/userManagement.controller');

const verifyToken = require('../middlewares/verifyToken');
const checkAdmin = require('../middlewares/role.middleware'); // Chỉ cho admin thực hiện

// Middleware: Phải đăng nhập + có quyền admin
router.use(verifyToken);
router.use(checkAdmin);

// 📌 GET: Lấy danh sách tất cả người dùng
router.get('/', getAllUsers);

// 📌 GET: Lấy thông tin 1 người dùng theo ID
router.get('/:id', getUserById);

// 📌 PUT: Cập nhật người dùng theo ID
router.put('/:id', updateUser);

// 📌 DELETE: Xóa người dùng theo ID
router.delete('/:id', deleteUser);

module.exports = router;
