const boom = require('boom');
const {
  findAllWithdrawRequests,
} = require('../../database/queries/withdrawRequest');

const findWithdrawRequests = async (req, res, next) => {
  try {
    // only admin is allowed to view all withdrawal requests on presspad.
    if (req.user.role !== 'admin')
      return next(
        boom.forbidden('Forbidden: Only admin can access this route'),
      );
    const withdrawRequests = await findAllWithdrawRequests();
    return res.json(withdrawRequests);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};

module.exports = findWithdrawRequests;
