const boom = require("boom");

const { hostRequestToWithdrawMoney } = require("../../database/queries/payments");


const withdrawRequest = async (req, res, next) => {
  const {
    amount, bankName, bankSortCode, bankNumber,
  } = req.body;
  const { role, account, _id } = req.user;

  // check for user role
  if (role !== "host") {
    return next(boom.unauthorized());
  }

  try {
    const results = await hostRequestToWithdrawMoney({
      amount,
      bankName,
      bankSortCode,
      bankNumber,
      user: _id,
      account,
    });
    return res.json(results);
  } catch (error) {
    return next(boom.badImplementation());
  }
};

module.exports = withdrawRequest;
