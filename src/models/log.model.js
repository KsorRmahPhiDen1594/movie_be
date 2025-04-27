const mongoose = require('mongoose');

// Định nghĩa cấu trúc của mô hình Log
const logSchema = new mongoose.Schema(
  {
    actionType: {
      type: String,
      required: true, // Loại thao tác (Ví dụ: 'create', 'update', 'delete', ...)
    },
    description: {
      type: String,
      required: true, // Mô tả về thao tác đã thực hiện
    },
    user: {
      type: String,
      required: true, // Người thực hiện thao tác
    },
    createdAt: {
      type: Date,
      default: Date.now, // Thời gian thực hiện thao tác (mặc định là thời điểm hiện tại)
    },
  },
  { timestamps: true } // Tự động tạo các trường createdAt và updatedAt
);

// Tạo mô hình Log từ schema
const Log = mongoose.model('Log', logSchema);

module.exports = Log; // Xuất mô hình để có thể sử dụng trong các controller
