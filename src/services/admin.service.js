const Admin = require('../models/admin.model');

// Thêm admin mới
exports.createAdmin = async (adminData) => {
  try {
    const newAdmin = new Admin(adminData);
    await newAdmin.save();
    return newAdmin;
  } catch (error) {
    throw new Error('Không thể tạo admin');
  }
};

// Lấy danh sách admin
exports.getAdmins = async () => {
  try {
    const admins = await Admin.find();
    return admins;
  } catch (error) {
    throw new Error('Không thể lấy danh sách admin');
  }
};
