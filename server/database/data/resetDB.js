const Organisation = require("../models/Organisation");
const Referal = require("../models/Referal");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Review = require("../models/Review");
const Listing = require("../models/Listing");
const Booking = require("../models/Booking");
const Notification = require("../models/Notification");
const Transaction = require("../models/Transaction");
const Account = require("../models/Account");
const InternalTransaction = require("../models/InternalTransaction");
const Coupon = require("../models/Coupon");
const ScheduledNotification = require("../models/ScheduledNotification");
const ExternalTransaction = require("../models/ExternalTransaction");
const Installment = require("../models/Installment");

const resetDB = async () => {
  await Organisation.deleteMany();
  await Referal.deleteMany();
  await User.deleteMany();
  await Profile.deleteMany();
  await Review.deleteMany();
  await Listing.deleteMany();
  await Booking.deleteMany();
  await Notification.deleteMany();
  await Transaction.deleteMany();
  await Account.deleteMany();
  await InternalTransaction.deleteMany();
  await Coupon.deleteMany();
  await ScheduledNotification.deleteMany();
  await ExternalTransaction.deleteMany();
  await Installment.deleteMany();
};

module.exports = resetDB;
