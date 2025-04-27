// pagination.js

/**
 * Hàm phân trang cho dữ liệu
 * @param {Array} data - Dữ liệu cần phân trang.
 * @param {number} page - Số trang hiện tại.
 * @param {number} limit - Số lượng item hiển thị trên mỗi trang.
 * @returns {Object} - Dữ liệu phân trang bao gồm các item của trang hiện tại và tổng số trang.
 */
function paginate(data, page = 1, limit = 10) {
    const startIndex = (page - 1) * limit;  // Tính chỉ số bắt đầu của trang
    const endIndex = page * limit;  // Tính chỉ số kết thúc của trang

    // Lọc dữ liệu cho trang hiện tại
    const paginatedData = data.slice(startIndex, endIndex);

    // Tính tổng số trang
    const totalPages = Math.ceil(data.length / limit);

    return {
        data: paginatedData,
        totalPages,
        currentPage: page,
        totalItems: data.length,
    };
}

module.exports = paginate;
