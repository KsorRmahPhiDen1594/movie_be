require('dotenv').config();

module.exports = {
  port: parseInt(process.env.PORT, 10) || 5000,          // Port server
  mongoUri: process.env.MONGODB_URI,                     // MongoDB URI
  mongoDbName: process.env.MONGO_DBNAME,                 // Tên database trong MongoDB
  mdbKey: process.env.MOVIEDB_API_KEY                    // API Key cho MovieDB
};
