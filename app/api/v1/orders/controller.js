const { getAllOrders } = require("../../../service/mongoose/orders");

const { StatusCodes } = require("http-status-codes");

const index = async (req, res, next) => {
  try {
    const result = await getAllOrders(req);

    res.status(StatusCodes.OK).json({
      // totalData: result.data.length,
      data: { order: result.data, pages: result.pages, total: result.total },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  index,
};
