const Coupon = require("../../models/Coupon");

const getCoupons = (query, queryProject) => Coupon.find(query, queryProject);

module.exports = { getCoupons };
