const Coupon = require("../../models/Coupon");

const getCouponInfo = code => Coupon.findOne({ code }, { transactions: 0 });

module.exports = { getCouponInfo };
