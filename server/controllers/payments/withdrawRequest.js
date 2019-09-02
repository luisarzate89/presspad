const boom = require("boom");

const { hostRequestToWithdrawMoney } = require("../../database/queries/payments");


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
    return next(boom.badImplementation());
  }
};

module.exports = withdrawRequest;
