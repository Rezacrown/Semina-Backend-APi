const dotenv = require('dotenv')

dotenv.config()


module.exports = {
  url_mongodb: process.env.URL_MONGODB_DEV,
};