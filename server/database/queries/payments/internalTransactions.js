const mongoose = require('mongoose');

const Account = require('../../models/Account');
const InternalTransaction = require('../../models/InternalTransaction');

/**
 * Create an internal transaction, Must be done inside a database transaction session
 * @param {string} userId The user who done the transaction
 * @param {string} fromAccount User account ID
 * @param {string} toAccount
 * @param {number} amount
 * @param {string} type Type of transaction "installment", "donation", "couponTransaction"
 * @param {session} session Transaction session
 */
const createInternalTransaction = async (
  userId,
  fromAccount,
  toAccount,
  amount,
  type,
  session,
) => {
  const internaltransaction = InternalTransaction.create(
    [
      {
        user: userId,
        from: fromAccount,
        to: toAccount,
        amount,
        type,
      },
    ],
    { session },
  );

  let bulkWriteArr;
  if (type === 'installment') {
    // update intern Account "from"
    bulkWriteArr = [
      {
        updateOne: {
          filter: { _id: mongoose.Types.ObjectId(fromAccount) },
          update: {
            $inc: { currentBalance: -1 * amount },
          },
        },
      },
      // update host account "to"
      {
        updateOne: {
          filter: { _id: mongoose.Types.ObjectId(toAccount) },
          update: {
            $inc: { currentBalance: amount, income: amount },
          },
        },
      },
    ];
  } else if (type === 'couponTransaction') {
    // update org account "from"
    // the coupon amount have been already substracted before from the current balance
    // and adde to couponsValue, so we should substract it from couponsValue
    bulkWriteArr = [
      {
        updateOne: {
          filter: { _id: mongoose.Types.ObjectId(fromAccount) },
          update: {
            $inc: { couponsValue: -1 * amount },
          },
        },
      },
      // update host account "to"
      {
        updateOne: {
          filter: { _id: mongoose.Types.ObjectId(toAccount) },
          update: {
            $inc: { currentBalance: amount, income: amount },
          },
        },
      },
    ];
  } else if (type === 'donation') {
    // update host or others account "from"
    bulkWriteArr = [
      {
        updateOne: {
          filter: { _id: mongoose.Types.ObjectId(fromAccount) },
          update: {
            $inc: { currentBalance: -1 * amount, donation: amount },
          },
        },
      },
      // no need to update presspad account since external transaction (source of money) update it
    ];
  } else {
    throw new Error('type must be installment, donation or couponTransaction');
  }

  const updatedAccounts = Account.bulkWrite(bulkWriteArr, { session });

  const [inTransaction] = await Promise.all([
    internaltransaction,
    updatedAccounts,
  ]);

  return inTransaction[0];
};

module.exports = { createInternalTransaction };
