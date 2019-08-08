const User = require("../../models/User");
const Organisation = require("../../models/Organisation");
const Booking = require("../../models/Booking");
const InternalTransaction = require("../../models/InternalTransaction");
const Coupon = require("../../models/Coupon");

module.exports = async () => {
  const organisations = await Organisation.find();
  const interns = await User.find({ role: "intern" });
  const organisationsAdmins = await User.find({ role: "organisation" });
  const booking = await Booking.findOne({ intern: interns[0]._id });
  const internalTransaction = await InternalTransaction.findOne(
    { user: organisationsAdmins[0]._id },
  );

  const coupons = [
    {
      organisation: organisations[0]._id,
      organisationAccount: organisations[0].account,
      intern: interns[0]._id,
      internName: interns[0].name,
      createdBy: organisationsAdmins[0]._id,
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
      organisation: organisations[0]._id,
      organisationAccount: organisations[0].account,
      internName: "User didn't register yet",
      createdBy: organisationsAdmins[0]._id,
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
