const WithdrawRequest = require("../../models/WithdrawRequest");
const Account = require("../../models/Account");

const hostRequestToWithdrawMoney = async ({
  amount,
  bankName,
  bankSortCode,
  bankNumber,
  user,
  account: accountId,
}) => {
  const account = await Account.findById(accountId);
  if (account.currentBalance < amount) {
    return Promise.reject(new Error("current balance is less than what you have"));
  }
  return WithdrawRequest.create({
    amount,
    bankName,
    bankSortCode,
    bankNumber,
    user,
    account: accountId,
  });
};

module.exports = hostRequestToWithdrawMoney;
