const Movie = require('../../models/movie.model');
const paginate = require('../../algorithms/pagination');
const search = require('../../algorithms/search');
const sortData = require('../../algorithms/sorting'); 

// Tạo một phim mới
exports.createMovie = async (req, res) => {
  const { title, description, genre, releaseDate, rating } = req.body;

  try {
    const newMovie = new Movie({
      title,
      description,
      genre,
      releaseDate,
      rating,
    });

    await newMovie.save();
    res.status(201).json({
      message: 'Phim đã được tạo thành công!',
      data: newMovie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau!' });
  }
};

// Lấy danh sách tất cả phim với phân trang, tìm kiếm và sắp xếp
exports.getMovies = async (req, res) => {
  try {
    // Lấy các query từ client (tìm kiếm, phân trang, sắp xếp)
    const { keyword, page = 1, limit = 5, sortBy = 'releaseDate', sortOrder = 'asc' } = req.query;

    // Tìm kiếm phim theo từ khóa
    const movies = await Movie.find();
    const searchResult = search(movies, keyword || '', ['title', 'genre']); // Tìm kiếm theo title và genre

    // Sắp xếp phim
    const sortedMovies = sortData(searchResult, sortBy, sortOrder);

    // Phân trang phim
    const paginatedMovies = paginate(sortedMovies, parseInt(page), parseInt(limit));

    res.status(200).json({
      message: 'Danh sách phim',
      data: paginatedMovies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau!' });
  }
};

// Lấy thông tin chi tiết phim theo ID
exports.getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: 'Phim không tồn tại!' });
    }
    res.status(200).json({
      message: 'Chi tiết phim',
      data: movie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau!' });
  }
};

// Cập nhật thông tin phim
exports.updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, description, genre, releaseDate, rating } = req.body;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { title, description, genre, releaseDate, rating },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: 'Phim không tồn tại!' });
    }

    res.status(200).json({
      message: 'Cập nhật phim thành công!',
      data: updatedMovie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau!' });
  }
};

// Xóa phim
exports.deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Phim không tồn tại!' });
    }

    res.status(200).json({
      message: 'Phim đã được xóa thành công!',
      data: deletedMovie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau!' });
  }
};
