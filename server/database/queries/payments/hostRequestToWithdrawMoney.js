const WithdrawRequest = require("../../models/WithdrawRequest");

const hostRequestToWithdrawMoney = async ({
  amount,
  bankName,
  bankSortCode,
  bankNumber,
  user,
  account,
}) => WithdrawRequest.create({
  amount,
  bankName,
  bankSortCode,
  bankNumber,
  user,
  account,
});

module.exports = hostRequestToWithdrawMoney;
