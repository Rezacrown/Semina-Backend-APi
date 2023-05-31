const dotenv = require('dotenv')

dotenv.config()


module.exports = {
  url_mongodb: process.env.URL_MONGODB_DEV,
  jwtSecret: process.env.JWT_TOKEN_SECRET,
  jwtExpiration: process.env.JWT__TOKEN_EXPIRE,
  gmail: process.env.GMAIL,
  password: process.env.PASSWORD,
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  jwtRefreshTokenExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRE,
};