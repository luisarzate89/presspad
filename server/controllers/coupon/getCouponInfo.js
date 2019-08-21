const boom = require("boom");

const { getCouponInfo: getCouponInfoQuery } = require("../../database/queries/coupon");

module.exports = async (req, res, next) => {
  try {
    const { code } = req.query;
    const coupon = await getCouponInfoQuery(code).exec();
    if (!coupon) {
      return next(boom.notFound());
    }
    return res.json({ data: coupon });
  } catch (error) {
    return next(error);
  }
};
