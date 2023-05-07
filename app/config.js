const dotenv = require('dotenv')

dotenv.config()


module.exports = {
  url_mongodb: process.env.URL_MONGODB_DEV,
  jwtExpiration: "24h",
  jwtSecret: "12345",
  gmail: process.env.GMAIL,
  password: process.env.PASSWORD,
};