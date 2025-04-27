const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database.config');
const corsOptions = require('./config/corsOptions');
const adminMovieRoutes = require('./routes/admin.movies.routes');
const authRoutes = require('./routes/auth.routes');  // Đảm bảo bạn đã yêu cầu đúng file auth.routes.js
const verifyToken = require('./middlewares/verifyToken');
const checkAdminRole = require('./middlewares/role.middleware');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Load các biến môi trường từ file .env
dotenv.config();

// Khởi tạo ứng dụng Express
const app = express();

// Middleware
app.use(cors(corsOptions)); // Sử dụng cors với các cài đặt
app.use(cookieParser()); // Để xử lý cookie
app.use(morgan('dev')); // Log các request
app.use(express.json()); // Để xử lý dữ liệu dạng JSON
app.use(express.urlencoded({ extended: true })); // Để xử lý dữ liệu dạng form

// Kết nối MongoDB
connectDB();

// Tạo cấu hình Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Phiên bản OpenAPI
    info: {
      title: 'Film API',
      version: '1.0.0',
      description: 'API để quản lý phim',
    },
  },
  apis: ['./routes/*.js'], // Đường dẫn tới các route của bạn để Swagger có thể tự động tạo tài liệu API
};

// Tạo swagger specification
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Định nghĩa các route Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Đây là URL truy cập Swagger UI

// Định nghĩa các route
app.use('/api/admin/movies', adminMovieRoutes); // Route cho quản lý phim
app.use('/api/auth', authRoutes); // Route cho đăng ký và đăng nhập người dùng

// Route gốc
app.get('/', (req, res) => {
  res.send('Hello from Film API with MongoDB');
});

// Bắt lỗi server
app.use((req, res) => {
  res.status(404).json({ message: 'Không tìm thấy route này' });
});

// Lắng nghe yêu cầu đến từ client
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
