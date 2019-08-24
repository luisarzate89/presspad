const mongoose = require("mongoose");

const InternalTransaction = require("../../models/InternalTransaction");
const User = require("../../models/User");
const Account = require("../../models/Account");

const hostDonateToPresspad = async ({
  fromAccount, amount, userId,
}) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const presspadAdmin = await User.findOne({ role: "admin" });
    InternalTransaction.create([{
      from: fromAccount,
      to: presspadAdmin.account,
      amount,
      user: userId,
    }], { session });


    await Account.bulkWrite([
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
    ], { session });
    await session.commitTransaction();
    return session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

module.exports = hostDonateToPresspad;
