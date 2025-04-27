const Log = require('../models/log.model');

// Thêm log mới
exports.createLog = async (actionData) => {
  try {
    const log = new Log(actionData);
    await log.save();
    return log;
  } catch (error) {
    throw new Error('Không thể ghi log');
  }
};

// Lấy tất cả log
exports.getLogs = async (filter, pagination) => {
  try {
    const logs = await Log.find(filter)
      .skip(pagination.skip)
      .limit(pagination.limit)
      .sort({ createdAt: -1 });
    return logs;
  } catch (error) {
    throw new Error('Không thể lấy logs');
  }
};
