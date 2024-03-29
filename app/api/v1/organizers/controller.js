const { StatusCodes } = require("http-status-codes");

const {
  createOrganizer,
  createUsers,
  getAllUsers,
} = require("../../../service/mongoose/user");

const createCMSOrganizer = async (req, res, next) => {
  try {
    const result = await createOrganizer(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getCMSUsers = async (req, res, next) => {
  try {
    const result = await getAllUsers(req);
    res.status(StatusCodes.OK).json({
      totaUsers: result.length,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const createCMSUser = async (req, res, next) => {
  try {
    const result = await createUsers(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// const getAdmin = async (req, res, next) => {

//  }

module.exports = {
  createCMSOrganizer,
  getCMSUsers,
  createCMSUser,
  // getAdmin
};
