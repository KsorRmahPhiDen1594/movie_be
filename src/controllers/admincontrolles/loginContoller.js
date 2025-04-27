const Admin = require("../../models/admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Kiểm tra có admin nào với email này không
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // 2. So sánh password
    const isMatch = await bcrypt.compare(password, existingAdmin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 3. Tạo JWT token
    const payload = {
      id: existingAdmin._id,
      role: "admin",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // 4. Gửi response về client
    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: existingAdmin._id,
        name: existingAdmin.name,
        email: existingAdmin.email,
      },
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const createLog = async (req, res) => {
    try {
      const { action, adminId } = req.body; // Lấy thông tin hành động và admin thực hiện
  
      // Kiểm tra xem thông tin có đầy đủ không
      if (!action || !adminId) {
        return res.status(400).json({ message: "Action and Admin ID are required" });
      }
  
      // Tạo đối tượng log mới
      const newLog = new Log({
        action,
        adminId,
        createdAt: new Date(),
      });
  
      // Lưu log vào cơ sở dữ liệu
      await newLog.save();
  
      res.status(201).json({ message: "Log created successfully", log: newLog });
    } catch (error) {
      res.status(500).json({ message: "Error creating log", error });
    }
  };
  
  module.exports = {
    getLogs,
    createLog
  };
  

module.exports = {
  loginAdmin,
  createLog,
};
