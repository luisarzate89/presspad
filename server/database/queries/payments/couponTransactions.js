const mongoose = require('mongoose');

const User = require('../../models/User');
const Coupon = require('../../models/Coupon');
const Booking = require('../../models/Booking');

/**
 * Update couponTransaction "Coupon.transactions",
 * Must be done inside a database transaction session
 * @param {string} userId Intern who used the coupon
 * @param {string} couponId
 * @param {string} transactionId
 * @param {string} bookingId
 * @param {string} usedDays
 * @param {number} amount
 * @param {session} session Transaction session
 */
const updateCouponTransaction = async (
  userId,
  couponId,
  transactionId,
  bookingId,
  usedDays,
  amount,
  session,
) => {
  const updatedCoupon = await Coupon.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(couponId) },
    {
      $inc: {
        usedDays,
        usedAmount: amount,
      },
      $push: {
        transactions: {
          usedDays,
          booking: bookingId,
          transaction: transactionId,
          amount,
        },
      },
      intern: userId,
    },
    {
      session,
      new: true,
      runValidators: true,
    },
  );

  await Promise.all([
    Booking.updateOne(
      { _id: mongoose.Types.ObjectId(bookingId) },
      { $inc: { payedAmount: amount } },
      { session },
    ),
    User.updateOne(
      { _id: mongoose.Types.ObjectId(userId) },
      { organisation: updatedCoupon.organisation },
      { session },
    ),
  ]);

  return updatedCoupon;
};

module.exports = { updateCouponTransaction };
