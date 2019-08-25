const mongoose = require("mongoose");

const Account = require("../../models/Account");
const Coupon = require("../../models/Coupon");

const updateCouponTransaction = async (
  userId, couponId, transactionId, bookingId, usedDays, session,
) => {
  const updatedCoupon = await Coupon.updateOne(
    { _id: mongoose.Types.ObjectId(couponId) }, {
      $inc: { usedDays },
      $push: {
        transactions: { usedDays, booking: bookingId, transaction: transactionId },
      },
      intern: userId,
    },
    { session },
  );

  await Account.updateOne(
    { _id: mongoose.Types.ObjectId(userId) },
    { organisation: updatedCoupon.organisation },
    { session },
  );

  return updatedCoupon;
};

module.exports = { updateCouponTransaction };
