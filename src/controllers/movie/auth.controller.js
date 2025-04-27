const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
const { JWT_SECRET } = process.env;

// Đăng ký người dùng mới
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Kiểm tra nếu người dùng đã tồn tại
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email đã được sử dụng!' });
    }

    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: req.body.role || 'user'  // 👈 thêm dòng này
    });
    

    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();

    res.status(201).json({ message: 'Đăng ký thành công!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau!' });
  }
};

// Đăng nhập người dùng
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kiểm tra nếu người dùng tồn tại
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Tài khoản không tồn tại!' });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu không chính xác!' });
    }

    // Tạo JWT và trả về cho người dùng
    const token = jwt.sign(
      { userId: user._id, role: user.role }, // ✨ Thêm role vào token
      JWT_SECRET,
      { expiresIn: '1h' }
    );    

    res.status(200).json({
      message: 'Đăng nhập thành công!',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau!' });
  }
};
