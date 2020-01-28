const WithdrawRequest = require("../../models/WithdrawRequest");
const Account = require("../../models/Account");

const hostRequestToWithdrawMoney = async ({
  amount,
  bankName,
  bankSortCode,
  accountNumber,
  user,
  account: accountId,
}) => {
  const account = await Account.findById(accountId);
  const withdrawRequests = await WithdrawRequest.find({
    account,
    status: "pending",
  });

  const requestedAmount = withdrawRequests
    .filter(request => request && request.status === "pending")
    .reduce((prev, cur) => {
      return prev + cur.amount;
    }, 0);

  if (account.currentBalance - requestedAmount < amount) {
    return Promise.reject(
      new Error("current balance is less than what you have"),
    );
  }
  return WithdrawRequest.create({
    amount,
    bankName,
    bankSortCode,
    accountNumber,
    user,
    account: accountId,
  });
};

module.exports = hostRequestToWithdrawMoney;
