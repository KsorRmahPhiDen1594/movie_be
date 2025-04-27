const User = require('../models/user.model');
const Movie = require('../models/movie.model');
const Log = require('../models/log.model');

// Thống kê tổng quan cho admin
exports.getDashboardStats = async () => {
  try {
    // Số lượng người dùng
    const userCount = await User.countDocuments();

    // Số lượng phim
    const movieCount = await Movie.countDocuments();

    // Số lượng log (lịch sử thao tác của admin)
    const logCount = await Log.countDocuments();

    // Thống kê các phim đang hoạt động (hoặc phim đã được ẩn)
    const activeMoviesCount = await Movie.countDocuments({ isActive: true });
    const inactiveMoviesCount = await Movie.countDocuments({ isActive: false });

    // Gói các thông tin thống kê lại
    return {
      userCount,
      movieCount,
      logCount,
      activeMoviesCount,
      inactiveMoviesCount
    };
  } catch (error) {
    throw new Error('Không thể lấy thống kê dashboard');
  }
};
