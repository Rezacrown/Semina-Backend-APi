const jwt = require("jsonwebtoken");
const {
  jwtSecret,
  jwtExpiration,
  jwtRefreshTokenExpiration,
  jwtRefreshTokenSecret,
} = require("../config");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  });
  return token;
};

// const createRefreshJWT = ({ payload }) => {
//   const token = jwt.sign(payload, jwtRefreshTokenSecret, {
//     expiresIn: jwtRefreshTokenExpiration,
//   });
//   return token;
// };

const isTokenValid = ({ token }) => {
  const result = jwt.verify(token, jwtSecret);
  return result
}

// const isTokenValidRefreshToken = ({ token }) =>
//   jwt.verify(token, jwtRefreshTokenSecret);

module.exports = {
  createJWT,
  isTokenValid,
  // isTokenValidRefreshToken,
  // createRefreshJWT,
};
