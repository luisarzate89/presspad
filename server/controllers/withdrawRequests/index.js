const { findAllWithdrawRequests } = require("../../database/queries/withdrawRequest");
const boom = require("boom");

const findWithdrawRequests = async (req, res, next) => {
  try {
    const withdrawRequests = await findAllWithdrawRequests();
    console.log("withdraw requests", withdrawRequests);
    return res.json(withdrawRequests);
  } catch (error) {
    console.log(error);
    next(boom.badImplementation(error));
  };
};

module.exports = findWithdrawRequests;
