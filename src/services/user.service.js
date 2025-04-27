const User = require('../models/user.model');

// Thêm người dùng mới
exports.createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error('Không thể tạo người dùng');
  }
};

// Lấy thông tin người dùng
exports.getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error('Không thể lấy thông tin người dùng');
  }
};

// Cập nhật thông tin người dùng
exports.updateUser = async (userId, userData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
    return updatedUser;
  } catch (error) {
    throw new Error('Không thể cập nhật thông tin người dùng');
  }
};

// Xóa người dùng
exports.deleteUser = async (userId) => {
  try {
    await User.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error('Không thể xóa người dùng');
  }
};
