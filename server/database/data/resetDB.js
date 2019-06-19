const Organisation = require("../models/Organisation");
const Referal = require("../models/Referal");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Review = require("../models/Review");
const Listing = require("../models/Listing");
const Booking = require("../models/Booking");
const Notification = require("../models/Notification");

const resetDB = async () => {
  await Organisation.deleteMany();
  await Referal.deleteMany();
  await User.deleteMany();
  await Profile.deleteMany();
  await Review.deleteMany();
  await Listing.deleteMany();
  await Booking.deleteMany();
  await Notification.deleteMany();
};

module.exports = resetDB;
