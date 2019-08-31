const { findAllWithdrawRequests } = require("../../database/queries/withdrawRequest");
const boom = require("boom");

const findWithdrawRequests = async (req, res, next) => {
  try {
    // only admin is allowed to view all withdrawal requests on presspad.
    if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    const withdrawRequests = await findAllWithdrawRequests();
    return res.json(withdrawRequests);
  } catch (error) {
    console.log(error); // for debugging only. Remove before final push.
    next(boom.badImplementation(error));
  };
};

module.exports = findWithdrawRequests;
