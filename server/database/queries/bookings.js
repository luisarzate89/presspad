const moment = require("moment");
const Booking = require("./../models/Booking");
const Listing = require("./../models/Listing");

const createDatesArray = require("../../helpers/createDatesArray");

// 1)
// gets all user bookings and checks if new booking request dates are included

module.exports.checkOtherBookingExists = async (userId, start, end) => {
  // get all bookings of user
  const bookings = await Booking.find({ user: userId });

  // create array of booking days
  const bookingDates = bookings.reduce((acc, cur) => {
    const dates = createDatesArray(cur.startDate, cur.endDate);
    acc.push(dates);
    return acc.toString().split(",");
  }, []);

  if (bookingDates.includes(start) || bookingDates.includes(end)) {
    return true;
  }
  return false;
};

// 2)
// creates new booking
module.exports.createNewBooking = data => Booking.create(data);

// 3)
// updates listing
module.exports.updateListingAvailability = async (listing, start, end) => {
  const findListing = await Listing.findOne({ _id: listing });
  // create array of available days
  const avDates = findListing.availableDates.reduce((acc, cur) => {
    const dates = createDatesArray(cur.startDate, cur.endDate);
    acc.push(dates);
    return acc;
  }, []);

  // create array of booking dates
  const bookingDates = createDatesArray(moment(start), moment(end));
  return avDates.filter((date, i) => date[1]);
};
