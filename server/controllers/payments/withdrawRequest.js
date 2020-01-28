const mongoose = require("mongoose");
const boom = require("boom");

const {
  hostRequestToWithdrawMoney,
  confirmOrCancelWithdrawRequest: confirmOrCancelWithdrawRequestQuery,
  getWithdrawRequestById,
} = require("../../database/queries/payments");

const confirmOrCancelWithdrawRequest = async (req, res, next) => {
  const { id: withdrawId } = req.params;
  const { type } = req.body;
  const { role } = req.user;

  // Autherizations
  if (role !== "admin")
    return next(boom.forbidden("only admin allow to confirm/cancel withdraw"));
  // validate the types [transfered, canceled]
  if (type !== "transfered" && type !== "canceled")
    return next(boom.badData("bad type value"));

  let session;
  try {
    const { status } = await getWithdrawRequestById(withdrawId);

    if (status !== "pending")
      return next(
        boom.forbidden("this operation only for pending withdraw requests"),
      );

    // start a mongodb session
    session = await mongoose.startSession();
    // start transaction
    session.startTransaction();

    await confirmOrCancelWithdrawRequestQuery(withdrawId, type, session);

    await session.commitTransaction();
    session.endSession();

    return res.sendStatus(200);
  } catch (error) {
    if (session && !session.hasEnded) {
      await session.abortTransaction();
      session.endSession();
    }

    return next(boom.badImplementation(error));
  }
};

const withdrawRequest = async (req, res, next) => {
  const { amount, bankName, bankSortCode, accountNumber } = req.body;
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
