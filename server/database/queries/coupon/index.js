const Coupon = require('../../models/Coupon');

const getCoupons = (query, queryProject) => Coupon.find(query, queryProject);
const getExpiredCoupons = () =>
  Coupon.find({
    $expr: {
      $and: [
        { $lte: ['$endDate', new Date()] },
        { $gt: ['$reservedAmount', '$usedAmount'] },
      ],
    },
  });

// update coupons, and set the reserved amount to be equal the used amount
const returnCouponsUnusedReservedAmount = (ids, session) =>
  Coupon.updateMany(
    { _id: { $in: ids } },
    [{ $set: { reservedAmount: '$usedAmount' } }],
    { session },
  );

module.exports = {
  getCoupons,
  getExpiredCoupons,
  returnCouponsUnusedReservedAmount,
};
