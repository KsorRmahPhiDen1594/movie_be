const Joi = require('joi');

// Validate dữ liệu khi thêm hoặc sửa phim
const movieValidationSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'Tên phim phải là một chuỗi.',
      'string.min': 'Tên phim phải có ít nhất 3 ký tự.',
      'string.max': 'Tên phim không được vượt quá 100 ký tự.',
      'any.required': 'Tên phim là bắt buộc.'
    }),
  
  description: Joi.string()
    .min(10)
    .max(500)
    .optional()
    .messages({
      'string.base': 'Mô tả phải là một chuỗi.',
      'string.min': 'Mô tả phải có ít nhất 10 ký tự.',
      'string.max': 'Mô tả không được vượt quá 500 ký tự.'
    }),

  genre: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'Thể loại phải là một chuỗi.',
      'string.min': 'Thể loại phải có ít nhất 3 ký tự.',
      'string.max': 'Thể loại không được vượt quá 50 ký tự.',
      'any.required': 'Thể loại là bắt buộc.'
    }),

  releaseDate: Joi.date()
    .required()
    .messages({
      'date.base': 'Ngày phát hành phải là một ngày hợp lệ.',
      'any.required': 'Ngày phát hành là bắt buộc.'
    }),

  isActive: Joi.boolean()
    .optional()
    .messages({
      'boolean.base': 'Trạng thái hoạt động phải là true hoặc false.'
    }),

  poster: Joi.string()
    .uri()
    .optional()
    .messages({
      'string.base': 'Poster phải là một chuỗi.',
      'string.uri': 'Poster phải là một URL hợp lệ.'
    }),

  duration: Joi.number()
    .min(1)
    .optional()
    .messages({
      'number.base': 'Thời lượng phải là một số.',
      'number.min': 'Thời lượng phải lớn hơn 0.'
    })
});

// Validate dữ liệu thêm hoặc sửa phim
const validateMovie = (data) => {
  const { error } = movieValidationSchema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

module.exports = {
  validateMovie
};
