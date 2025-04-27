const jwt = require('jsonwebtoken');

// Tạo token JWT
exports.generateToken = (user) => {
  const payload = {
    id: user._id,
    role: user.role
  };
  
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

// Xác minh token JWT
exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};
