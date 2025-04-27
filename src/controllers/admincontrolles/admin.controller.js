const { json } = require('express');
const Admin = require('../../models/admin.model');
const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');



// Đăng ký admin mới
const registerAdmin = async (req, res) => {
  try{
    const { username, password } = req.body;
    const existingAdmin = await Admin.findOne({ username});
    if (existingAdmin) return res.status(400).json({ message: "Admin already exists"})

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin ({ username, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json({message:"Admin registered susscessfully", admin: newAdmin });
  }catch (error){
    res.status(500).json({message: "Error registering admin", error});
  };
};

// Lấy danh sách tất cả admin
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admins", error });
  }
};

// Xóa admin theo ID
const deleteAdmin = async (req, res) => {
  try {
    const {id} = req.params;
    const deleted = await Admin.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({message: "Admin not found"});
    res.status(200).json({message: "Admin deleted successfully"});
  } catch(error){
    res.status(500).json({message: "Error deleting admin", error});
  };
};

// sửa thông tin admin
const updetAdmin = async (req, res) => {
  try{
    const {id} =req.params;
    const {username, password} = req.body;

    const updetData = {};
    if (username) updetData.username = username;
    if (password) updetData.password = await bcrypt.hash(password,10);

    const updetAdmin = await Admin.findByIdAndUpdate(id, updetData, {new: true}).select("-password");
    if (!updetAdmin) return res.status(404).json({message: "Admin not found"});

    res.status(200).json({message: "Admin updated successfully", admin: updetAdmin});
  }catch(error){
    res.status(500).json({message: "Error updating admin", error});
  };
}

// Láy thông tin 1 admin theo ID 
const getAdminById = async (req, res) => {
  try{
    const {id} = req.params;
    const admin = await Admin.findById(id).select("-password");
    if(!admin) return res.status(404).json({message: "Admin not found"});

    res.status(200).json(admin);
  }catch(error){
    res.status(500).json({message: "Error fetching admin", error});
  }
};


module.exports = {
  registerAdmin,
  getAllAdmins,
  deleteAdmin,
  updetAdmin,
  getAdminById,
}