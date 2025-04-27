const express = require('express');
const router = express.Router();

const {
  registerAdmin,
  getAllAdmins,
  deleteAdmin,
  updetAdmin,
  getAdminById,
} = require('../controllers/admincontrolles/admin.controller');

const { loginAdmin } = require('../controllers/admincontrolles/loginContoller');

// Middlewares (nếu cần sau này)
const verifyToken = require('../middlewares/verifyToken');
const checkAdminRole = require('../middlewares/role.middleware');

// Route đăng ký và đăng nhập
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Các route yêu cầu xác thực (sau này thêm middleware nếu cần)
router.get('/', getAllAdmins);
router.get('/:id', getAdminById);
router.delete('/:id', deleteAdmin);
router.put('/:id', updetAdmin);

module.exports = router;
