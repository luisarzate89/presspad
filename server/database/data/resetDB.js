const Organisation = require('../models/Organisation');
const ReferalCode = require('../models/ReferalCode');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Review = require('../models/Review');
const Listing = require('../models/Listing');
const Booking = require('../models/Booking');

const resetDB = async () => {
  await Organisation.deleteMany();
  await ReferalCode.deleteMany();
  await User.deleteMany();
  await Profile.deleteMany();
  await Review.deleteMany();
  await Listing.deleteMany();
  await Booking.deleteMany();
};

module.exports = resetDB;
