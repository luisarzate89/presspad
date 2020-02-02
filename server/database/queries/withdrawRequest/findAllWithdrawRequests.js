const WithdrawRequest = require('../../models/WithdrawRequest');

const findAllWithdrawRequests = () =>
  WithdrawRequest.find()
    .populate({ path: 'user', select: 'name' })
    .exec();

module.exports = findAllWithdrawRequests;
