const mongoose = require("mongoose");

const InternalTransaction = require("../../models/InternalTransaction");
const User = require("../../models/User");
const Account = require("../../models/Account");
const WithdrawRequest = require("../../models/WithdrawRequest");

const hostDonateToPresspad = async ({ fromAccount, amount, userId }) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const presspadAdmin = await User.findOne({ role: "admin" }).session(
      session,
    );

    const account = await Account.findById(fromAccount);

    const withdrawRequests = await WithdrawRequest.find({
      account: fromAccount,
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

    await InternalTransaction.create(
      [
        {
          from: fromAccount,
          to: presspadAdmin.account,
          amount,
          user: userId,
          type: "donation",
        },
      ],
      { session },
    );

    await Account.bulkWrite(
      [
        // update host account
        {
          updateOne: {
            filter: { _id: mongoose.Types.ObjectId(fromAccount) },
            update: {
              $inc: {
                currentBalance: -1 * amount,
                donation: amount,
              },
            },
          },
        },
        // update presspad account details
        {
          updateOne: {
            filter: { _id: mongoose.Types.ObjectId(presspadAdmin.account) },
            update: {
              $inc: {
                income: amount,
                currentBalance: amount,
              },
            },
          },
        },
      ],
      { session },
    );

    // check if the donated account didnt deduct more than what it has
    const updatedDonatedAccount = await Account.findById(fromAccount).session(
      session,
    );
    if (updatedDonatedAccount.currentBalance < 0) {
      throw new Error("Can't donate more than what you have");
    }
    await session.commitTransaction();
    return session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

module.exports = hostDonateToPresspad;
