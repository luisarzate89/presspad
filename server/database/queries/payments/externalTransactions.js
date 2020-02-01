const mongoose = require('mongoose');

const ExternalTransaction = require('../../models/ExternalTransaction');
const Account = require('../../models/Account');
const User = require('../../models/User');

/**
 * Create an external transaction, Must be done inside a database transaction session
 * @param {string} userId
 * @param {string} accountId
 * @param {number} amount
 * @param {Object} stripeInfo
 * @param {string} type "widthraw" or "deposite"
 * @param {session} session Transaction session
 */
const createExternalTransaction = async (
  userId,
  accountId,
  amount,
  stripeInfo,
  type,
  session,
) => {
  const { account: pressPadAccountId } = await User.findOne({
    role: 'admin',
  }).session(session);

  const externaltransaction = ExternalTransaction.create(
    [
      {
        user: userId,
        account: accountId,
        amount,
        stripeInfo,
        type,
      },
    ],
    { session },
  );

  let bulkWriteArray;

  if (type === 'deposite') {
    bulkWriteArray = [
      // update user account
      {
        updateOne: {
          filter: { _id: mongoose.Types.ObjectId(accountId) },
          update: {
            $inc: { currentBalance: amount, income: amount },
          },
        },
      },
      // update presspad account
      {
        updateOne: {
          filter: { _id: mongoose.Types.ObjectId(pressPadAccountId) },
          update: {
            $inc: { currentBalance: amount, income: amount },
          },
        },
      },
    ];
  } else if (type === 'withdraw') {
    // check if the account has enough money
    const userAccount = await Account.findById(accountId).session(session);
    if (userAccount.currentBalance - amount < 0) {
      throw new Error("Account doesn't have sufficent balance");
    }

    bulkWriteArray = [
      // update user account
      {
        updateOne: {
          filter: { _id: mongoose.Types.ObjectId(accountId) },
          update: {
            $inc: { currentBalance: -1 * amount, withdrawal: amount },
          },
        },
      },
    ];
  } else {
    throw new Error('type must be deposite or withdraw');
  }

  const updatedAccounts = Account.bulkWrite(bulkWriteArray, { session });

  const [exTransaction] = await Promise.all([
    externaltransaction,
    updatedAccounts,
  ]);

  return exTransaction[0];
};

module.exports = { createExternalTransaction };
