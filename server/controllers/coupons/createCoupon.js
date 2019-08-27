const boom = require("boom");
const Moment = require("moment");
const { extendMoment } = require("moment-range");

const moment = extendMoment(Moment);

const { createCoupon: createCouponQuery } = require("../../database/queries/payments");
const { calculatePrice } = require("./../../helpers/payments");

const createCoupon = async (req, res, next) => {
  const { user, body } = req;
  const {
    _id: userId,
    role,
    organisation,
    account: organisationAccount,
  } = user;

  const {
    internName,
    discountRate,
    startDate,
    endDate,
    intern,
  } = body;

  const range = moment.range(startDate, endDate);
  const amount = calculatePrice(range);

  const days = range.diff("days");

  // check for user role
  if (role !== "organisation" || !organisation) {
    return next(boom.unauthorized());
  }

  try {
    const results = await createCouponQuery({
      organisationAccount,
      organisation,
      internName,
      createdBy: userId,
      discountRate,
      days,
      startDate,
      endDate,
      amount: amount * discountRate / 100,
      usedDays: 0,
      intern,
    });

    return res.json(results);
  } catch (error) {
    console.log(error);
    return next(boom.badImplementation());
  }
};

module.exports = createCoupon;
