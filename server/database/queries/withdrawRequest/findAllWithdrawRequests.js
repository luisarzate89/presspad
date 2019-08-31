const WithdrawRequest = require("../../models/WithdrawRequest");

const findAllWithdrawRequests = () => WithdrawRequest.find();

module.exports = findAllWithdrawRequests;
