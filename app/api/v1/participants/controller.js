const {
  getAllEvents,
  getOneEvent,
  signinParticipant,
  signupParticipant,
  activateParticipant,
  getAllOrders,
  checkoutOrder,
  getAllPaymentByOrganizer,
  forgotPassword,
  setNewPassword,
  checkOtp,
} = require("../../../service/mongoose/participants");

const { StatusCodes } = require("http-status-codes");

// event
const getAllLandingPage = async (req, res, next) => {
  try {
    const result = await getAllEvents(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getDetailLandingPage = async (req, res, next) => {
  try {
    const result = await getOneEvent(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// participant
const signup = async (req, res, next) => {
  try {
    const result = await signupParticipant(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const activeParticipant = async (req, res, next) => {
  try {
    const result = await activateParticipant(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const result = await signinParticipant(req);

    res.status(StatusCodes.OK).json({
      data: { token: result },
    });
  } catch (err) {
    next(err);
  }
};

const lupaPassword = async (req, res, next) => {
  try {
    const result = await forgotPassword(req)

    res.status(StatusCodes.ACCEPTED).json({
      data: result
    })
  } catch (error) {
    next(error);
  }
}

const confirmLupaPassword = async (req, res, next) => {
  try {
    const result = await setNewPassword(req)

    res.status(StatusCodes.ACCEPTED).json({
      // data: result,
      status: 'confirmed change password'
    })
  } catch (error) {
    next(error);
  }
}

const checkingOtp = async (req, res, next) => {
  try {
    const token = await checkOtp(req)

    res.status(StatusCodes.ACCEPTED).json({
      data: token
    })
  } catch (error) {
    next(error);
  }
}


// payment order
const getDashboard = async (req, res, next) => {
  try {
    const result = await getAllOrders(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};


const getAllPayment = async (req, res, next) => {
  try {
    const result = await getAllPaymentByOrganizer(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const checkout = async (req, res, next) => {
  try {
    const result = await checkoutOrder(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  getAllLandingPage,
  getDetailLandingPage,
  signin,
  signup,
  activeParticipant,
  getDashboard,
  getAllPayment,
  checkout,
  lupaPassword,
  confirmLupaPassword,
  checkingOtp
};
