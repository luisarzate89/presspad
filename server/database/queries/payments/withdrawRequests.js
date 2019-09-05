const WithdrawRequest = require("../../models/WithdrawRequest");
const Account = require("../../models/Account");

/**
 * Confirm or Cancel withdraw request,
 * must be in mongodb session
 * @param {string} withdrawId
 * @param {string} type [transfered, canceled]
 * @param {import session from mongoose} session
 */
const confirmOrCancelWithdrawRequest = async (withdrawId, type, session) => {
  const withdrawRequest = await WithdrawRequest.findByIdAndUpdate(
    withdrawId, { status: type }, { session, new: true, useFindAndModify: false },
  );
  if (type === "transfered") {
    const { account, amount } = withdrawRequest;
    await Account.updateOne(
      { _id: account },
      { $inc: { currentBalance: -1 * amount, withdrawal: amount } },
      { session },
    );
  }

  return withdrawRequest;
};

const getWithdrawRequestById = id => WithdrawRequest.findById(id).exec();

module.exports = { confirmOrCancelWithdrawRequest, getWithdrawRequestById };
