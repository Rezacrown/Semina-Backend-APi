const jwt = require("jsonwebtoken");
const {
  jwtSecret,
  jwtExpiration,
  jwtRefreshTokenExpiration,
  jwtRefreshTokenSecret,
} = require("../config");

// token
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  });
  return token;
};
const isTokenValid = ({ token }) => {
  const result = jwt.verify(token, jwtSecret);
  return result;
};

// refresh token
const createRefreshJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtRefreshTokenSecret, {
    expiresIn: jwtRefreshTokenExpiration,
  });
  return token;
};

const isTokenValidRefreshToken = ({ token }) => {
  return jwt.verify(token, jwtRefreshTokenSecret);
};

module.exports = {
  createJWT,
  isTokenValid,
  createRefreshJWT,
  isTokenValidRefreshToken,
};
