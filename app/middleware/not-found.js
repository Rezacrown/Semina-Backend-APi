const { StatusCodes } = require("http-status-codes");

const notFound = (req, res) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .send({ msg: "Route tidak ada" });
};

module.exports = notFound;
