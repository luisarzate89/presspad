const mongoose = require("mongoose");
const boom = require("boom");

const { hostRequestToWithdrawMoney, confirmOrCancelWithdrawRequest: confirmOrCancelWithdrawRequestQuery } = require("../../database/queries/payments");

const confirmOrCancelWithdrawRequest = async (req, res, next) => {
  const { id: withdrawId } = req.params;
  const { type } = req.body;

  // Autherizations and checks

  // validate the types [transfered, canceled]
  // transfered only once, if type === transfered && status === transfered, do nothing

  let session;
  try {
    // start a mongodb session
    session = await mongoose.startSession();
    // start transaction
    session.startTransaction();

    await confirmOrCancelWithdrawRequestQuery(withdrawId, type, session);

    await session.commitTransaction();
    session.endSession();

    return res.json({ data: true });
  } catch (error) {
    if (session) {
      await session.abortTransaction();
      await session.endSession();
    }
    if (error.statusCode === 402) {
      return next(boom.paymentRequired(error.message));
    }
    return next(boom.badImplementation(error));
  }
};

const withdrawRequest = async (req, res, next) => {
  const {
    amount, bankName, bankSortCode, accountNumber,
  } = req.body;
  const { role, account, _id } = req.user;

  // check for user role
  if (role !== "host" && role !== "superhost") {
    return next(boom.forbidden());
  }

  try {
    const results = await hostRequestToWithdrawMoney({
      amount,
      bankName,
      bankSortCode,
      accountNumber,
      user: _id,
      account,
    });
    return res.json(results);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};

module.exports = { withdrawRequest, confirmOrCancelWithdrawRequest };
