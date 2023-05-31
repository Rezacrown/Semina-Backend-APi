const UserRefreshToken = require("../../api/v1/userRefreshToken/model");
const {
  isTokenValidRefreshToken,
  createJWT,
  createTokenUser,
} = require("../../utils");
const Users = require("../../api/v1/users/model");
const { NotFoundError } = require("../../errors");

const createUserRefreshToken = async (payload) => {
  const result = await UserRefreshToken.create(payload);

  return result;
};

const getUserRefreshToken = async (req) => {
  // ambil refresh token dan email dari front end lewat params
  const { refreshToken, email } = req.params;

    if(!refreshToken) throw new NotFoundError('refresh token not found');
  // cek apakah refresh token ada di db
  const result = await UserRefreshToken.findOne({
    refreshToken,
  });

  if (email !== result.email) throw new BadRequestError("email tidak valid");

  if (!result) throw new NotFoundError(`refreshToken tidak valid `);

  const payload = isTokenValidRefreshToken({ token: result.refreshToken });

  const userCheck = await Users.findOne({ email: payload.email });

  const token = createJWT({ payload: createTokenUser(userCheck) });

  return token;
};

module.exports = {
  createUserRefreshToken,
  getUserRefreshToken,
};
