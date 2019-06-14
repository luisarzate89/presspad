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
module.exports.updateListingAvailability = async (listing, bs, be) => {
  const findListing = await Listing.findOne({ _id: listing });

  const listingAvDates = findListing.availableDates.reduce((acc, cur) => {
    // listing available dates
    const ls = cur.startDate;
    const le = cur.endDate;

    // check which object needs to be updated
    const isBetween = moment(bs).isBetween(ls, le);
    const isSameStart = moment(bs).isSame(ls, "day");
    const isSameEnd = moment(be).isSame(le, "day");
    let dates = { start: 0, end: 0 };

    if (isBetween || isSameStart) {
      // if booking has same lenght than availability => no days left
      if (isSameStart && isSameEnd) {
        dates = {};
        acc.push(dates);
      }
      // if booking starts on same day but booking end is before listing availab. -> store rest avail.
      if (isSameStart && moment(be).isBefore(le, "day")) {
        dates.start = moment(be)
          .add(1, "day")
          .format("YYYY-MM-DD");
        dates.end = moment(le).format("YYYY-MM-DD");
        acc.push(dates);
      }
      // if booking start is after listing start and booking end is same as listing end -> store beginning avail
      if (moment(bs).isAfter(ls, "day") && isSameEnd) {
        dates.start = moment(ls).format("YYYY-MM-DD");
        dates.end = moment(bs)
          .subtract(1, "day")
          .format("YYYY-MM-DD");
        acc.push(dates);
      }
      // if booking start is after listing start and booking end is before listing end -> store avail. before and after booking
      if (moment(bs).isAfter(ls, "day") && moment(be).isBefore(le, "day")) {
        const dates1 = { start: 0, end: 0 };
        const dates2 = { start: 0, end: 0 };

        dates1.start = moment(ls).format("YYYY-MM-DD");
        dates1.end = moment(bs)
          .subtract(1, "day")
          .format("YYYY-MM-DD");
        acc.push(dates1);
        dates2.start = moment(be)
          .add(1, "day")
          .format("YYYY-MM-DD");
        dates2.end = moment(le).format("YYYY-MM-DD");
        acc.push(dates2);
      }
    }
    // return other objects
    dates.start = moment(ls).format("YYYY-MM-DD");
    dates.end = moment(le).format("YYYY-MM-DD");
    acc.push(dates);

    return acc;
  }, []);

  // us moment isBetween

  return listingAvDates;
};
