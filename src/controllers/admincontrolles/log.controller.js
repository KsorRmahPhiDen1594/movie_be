const Log = require('../../models/log.model'); // Import mô hình Log

// Lấy tất cả các lịch sử thao tác
exports.getLogs = async (req, res) => {
  try {
    // Lấy lịch sử thao tác từ cơ sở dữ liệu
    const logs = await Log.find().sort({ createdAt: -1 }); // Sắp xếp theo thời gian giảm dần
    res.status(200).json({
      message: 'Lịch sử thao tác',
      data: logs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau!' });
  }
};

// Lọc lịch sử theo loại thao tác
exports.getLogsByAction = async (req, res) => {
  const { actionType } = req.params;
  try {
    // Lọc lịch sử theo actionType
    const logs = await Log.find({ actionType }).sort({ createdAt: -1 });
    res.status(200).json({
      message: `Lịch sử thao tác của loại: ${actionType}`,
      data: logs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau!' });
  }
};

// Lọc lịch sử theo thời gian
exports.getLogsByDateRange = async (req, res) => {
  const { startDate, endDate } = req.body;
  try {
    // Lọc lịch sử trong khoảng thời gian cho trước
    const logs = await Log.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }).sort({ createdAt: -1 });
    res.status(200).json({
      message: `Lịch sử thao tác từ ${startDate} đến ${endDate}`,
      data: logs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau!' });
  }
};
