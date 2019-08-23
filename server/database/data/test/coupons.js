const User = require("../../models/User");
const Organisation = require("../../models/Organisation");
const Booking = require("../../models/Booking");
const InternalTransaction = require("../../models/InternalTransaction");
const Coupon = require("../../models/Coupon");

module.exports = async () => {
  const BBC = await Organisation.findOne({ name: "BBC" });
  const intern = await User.findOne({ role: "intern", organisation: BBC._id }).sort({ name: 1 });
  const bbcAdmin1 = await User.findOne({ role: "organisation", organisation: BBC._id }).sort({ name: 1 });
  const booking = await Booking.findOne({ intern: intern._id }).sort({ createdAt: 1 });
  const internalTransaction = await InternalTransaction.findOne(
    { user: bbcAdmin1._id },
  ).sort({ amount: 1 });

  const coupons = [
    {
      organisation: BBC._id,
      organisationAccount: BBC.account,
      intern: intern._id,
      internName: intern.name,
      createdBy: bbcAdmin1._id,
      discountRate: 50,
      days: 10,
      usedDays: 5,
      expirationDate: Date.now() + 25 * 24 * 60 * 60 * 1000, // after 25 days from now
      transactions: [{
        usedDays: 5,
        booking: booking._id,
        transaction: internalTransaction,
      }],
    },
    {
      organisation: BBC._id,
      organisationAccount: BBC.account,
      internName: "User didn't register yet",
      createdBy: bbcAdmin1._id,
      discountRate: 70,
      days: 15,
      usedDays: 0,
      expirationDate: Date.now() + 30 * 24 * 60 * 60 * 1000, // after 30 days from now
      // no transactions yet
      transactions: [],
    },
  ];
  return Coupon.create(coupons);
};
