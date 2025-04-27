// sorting.js

/**
 * Hàm sắp xếp dữ liệu theo trường cho trước.
 * @param {Array} data - Dữ liệu cần sắp xếp.
 * @param {string} field - Trường cần sắp xếp.
 * @param {string} order - Thứ tự sắp xếp ('asc' cho tăng dần, 'desc' cho giảm dần).
 * @returns {Array} - Dữ liệu đã được sắp xếp.
 */
function sortData(data, field, order = 'asc') {
    return data.sort((a, b) => {
        if (order === 'asc') {
            return a[field] > b[field] ? 1 : -1;
        } else {
            return a[field] < b[field] ? 1 : -1;
        }
    });
}

module.exports = sortData;
