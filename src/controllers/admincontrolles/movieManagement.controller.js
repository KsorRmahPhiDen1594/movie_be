const Movie = require('../../models/movie.model');

// 📌 Lấy danh sách tất cả phim (có thể bao gồm cả phim ẩn)
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách phim', error });
  }
};

// 📌 Lấy thông tin 1 phim theo ID
const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).json({ message: 'Phim không tồn tại' });
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy phim', error });
  }
};

// 📌 Cập nhật trạng thái hiển thị của phim (ẩn / hiện)
const toggleMovieVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).json({ message: 'Phim không tồn tại' });

    movie.isActive = !movie.isActive;  // Sử dụng isActive thay vì isHidden
    await movie.save();
    res.status(200).json({ message: 'Cập nhật trạng thái thành công', movie });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật trạng thái', error });
  }
};

// 📌 Xóa phim theo ID
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Movie.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Phim không tồn tại' });
    res.status(200).json({ message: 'Xóa phim thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa phim', error });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  toggleMovieVisibility,
  deleteMovie,
};
