const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie/movie.controller');

router.post('/movies', movieController.createMovie);  // Tạo phim mới
router.get('/movies', movieController.getMovies);     // Lấy danh sách phim
router.get('/movies/:id', movieController.getMovieById); // Lấy thông tin chi tiết phim theo ID
router.put('/movies/:id', movieController.updateMovie);  // Cập nhật phim
router.delete('/movies/:id', movieController.deleteMovie); // Xóa phim

module.exports = router;
