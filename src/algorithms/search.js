// search.js

/**
 * Hàm tìm kiếm dữ liệu theo từ khóa.
 * @param {Array} data - Dữ liệu cần tìm kiếm.
 * @param {string} keyword - Từ khóa cần tìm kiếm.
 * @param {Array} fields - Các trường cần tìm trong dữ liệu (ví dụ: ['title', 'description']).
 * @returns {Array} - Các phần tử tìm thấy theo từ khóa.
 */
function search(data, keyword, fields = []) {
    const regex = new RegExp(keyword, 'i');  // Tạo regex để tìm kiếm không phân biệt chữ hoa chữ thường.

    return data.filter(item => {
        // Kiểm tra trong mỗi trường nếu có chứa từ khóa
        return fields.some(field => regex.test(item[field]));
    });
}

module.exports = search;
