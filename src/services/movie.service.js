const Movie = require('../models/movie.model');

// Thêm phim mới
exports.createMovie = async (movieData) => {
  try {
    const newMovie = new Movie(movieData);
    await newMovie.save();
    return newMovie;
  } catch (error) {
    throw new Error('Không thể thêm phim');
  }
};

// Lấy danh sách phim
exports.getMovies = async (filter, pagination) => {
  try {
    const movies = await Movie.find(filter)
      .skip(pagination.skip)
      .limit(pagination.limit);
    return movies;
  } catch (error) {
    throw new Error('Không thể lấy danh sách phim');
  }
};

// Cập nhật thông tin phim
exports.updateMovie = async (movieId, movieData) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, movieData, { new: true });
    return updatedMovie;
  } catch (error) {
    throw new Error('Không thể cập nhật phim');
  }
};

// Xóa phim
exports.deleteMovie = async (movieId) => {
  try {
    await Movie.findByIdAndDelete(movieId);
  } catch (error) {
    throw new Error('Không thể xóa phim');
  }
};
