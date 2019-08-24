const boom = require("boom");

const { hostDonateToPresspad } = require("../../database/queries/payments");


const hostDonation = async (req, res, next) => {
  const { amount } = req.body;
  const { role, account, _id } = req.user;

  // check for user role
  if (role !== "host") {
    return next(boom.unauthorized());
  }

  try {
    const results = await hostDonateToPresspad({
      amount,
      userId: _id,
      fromAccount: account,
    });
    return res.json(results);
  } catch (error) {
    return next(boom.badImplementation());
  }
};

module.exports = hostDonation;
