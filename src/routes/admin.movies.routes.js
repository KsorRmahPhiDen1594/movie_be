/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Quản lý phim
 */

const express = require('express');
const router = express.Router();
const movieAdminController = require('../controllers/admincontrolles/movieManagement.controller');
const verifyToken = require('../middlewares/verifyToken');
const checkAdminRole = require('../middlewares/role.middleware');

/**
 * @swagger
 * /api/admin/movies:
 *   get:
 *     summary: Lấy danh sách tất cả phim
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Danh sách phim
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     description: Tên phim
 *                   description:
 *                     type: string
 *                     description: Mô tả phim
 *                   genre:
 *                     type: string
 *                     description: Thể loại phim
 *                   releaseDate:
 *                     type: string
 *                     format: date
 *                     description: Ngày phát hành
 *       500:
 *         description: Lỗi khi lấy danh sách phim
 */
router.get('/', movieAdminController.getAllMovies);

// Các route khác...
module.exports = router;
