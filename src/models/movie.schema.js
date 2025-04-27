const mongoose = require('mongoose');

const movieDetailsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  cast: {
    type: [String], // Mảng các diễn viên
    required: true
  },
  duration: {
    type: Number, // Thời gian phim tính bằng phút
    required: true
  }
}, { timestamps: true });

const MovieDetails = mongoose.model('MovieDetails', movieDetailsSchema);

module.exports = MovieDetails;
