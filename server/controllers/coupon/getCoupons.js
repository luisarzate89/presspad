const boom = require("boom");

const { getCoupons: getCouponsQuery } = require("../../database/queries/coupon");

module.exports = async (req, res, next) => {
  try {
    const { role: userRole } = req.user;
    const { query } = req; // should be validated within a validate middlware
    let queryProject;

    if (userRole === "intern") {
      if (!query.code) {
        return next(boom.badData("bad query parameters"));
      }
      queryProject = {
        code: 1, days: 1, usedDays: 1, discountRate: 1, startDate: 1, endDate: 1,
      };
    }
    const coupon = await getCouponsQuery(query, queryProject).exec();
    if (!coupon[0]) {
      return next(boom.notFound());
    }
    return res.json({ data: coupon });
  } catch (error) {
    return next(error);
  }
};
