const express = require('express');
const router = express.Router();
const { getLogs, getLogsByAction, getLogsByDateRange } = require('../controllers/logController');

// Route lấy tất cả lịch sử thao tác
router.get('/', getLogs);

// Route lọc lịch sử theo actionType
router.get('/:actionType', getLogsByAction);

// Route lọc lịch sử theo khoảng thời gian
router.post('/date-range', getLogsByDateRange);

module.exports = router;
