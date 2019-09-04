const WithdrawRequest = require("../../models/WithdrawRequest");
const Account = require("../../models/Account");

const confirmOrCancelWithdrawRequest = async (withdrawId, type, session) => {
  const withdrawRequest = await WithdrawRequest.findByIdAndUpdate(
    withdrawId, { status: type }, { session, new: true, useFindAndModify: false },
  );
  const { account, amount } = withdrawRequest;
  await Account.updateOne(
    { _id: account },
    { $inc: { currentBalance: -1 * amount, withdrawal: amount } },
    { session },
  );
  // Not sure if we should created an external transaction

  return withdrawRequest;
};

module.exports = confirmOrCancelWithdrawRequest;
