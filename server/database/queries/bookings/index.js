const moment = require("moment");
const Booking = require(".//../../models/Booking");
const Listing = require("./../../models/Listing");

const createDatesArray = require("../../../helpers/createDatesArray");
const getInternBookingsWithReviews = require("./getInternBookingsWithReviews");
const getNextPendingBooking = require("./getNextPendingBooking");
const getBookingById = require("./getBookingById");
const getBookingWithUsers = require("./getBookingWithUsers");


module.exports.hostAcceptBookingById = ({
  bookingId,
  hostId,
  moneyGoTo,
}) => Booking.findOneAndUpdate(
  //  filter
  { _id: bookingId, host: hostId },
  // update date
  {
    status: "confirmed",
    moneyGoTo,
  }, {
    new: true,
  },
);

module.exports.hostRejectBookingById = ({
  bookingId,
  hostId,
}) => Booking.findOneAndUpdate(
  //  filter
  { _id: bookingId, host: hostId },
  // update date
  {
    status: "canceled",
    canceledBy: hostId,
  }, {
    new: true,
  },
);


module.exports.getNextPendingBooking = getNextPendingBooking;
// get all bookings of user
module.exports.getUserBookings = async (intern) => {
  const bookings = await Booking.find({ intern });
  const userBookingDates = bookings.reduce((acc, cur) => {
    const dates = createDatesArray(cur.startDate, cur.endDate);
    acc.push(dates);
    return acc.toString().split(",");
  }, []);
  return userBookingDates;
};

// 1)
// gets all user bookings and checks if new booking request dates are included
module.exports.checkOtherBookingExists = async (userId, start, end) => {
  const userBookingDates = await this.getUserBookings(userId);

  const bookingRequestDates = createDatesArray(start, end);
  // check if any of the current booking request dates is included in users bookings
  const bookingDateFound = bookingRequestDates.some(date => userBookingDates.includes(date));
  return bookingDateFound ? { bookingExists: true } : { bookingExists: false };
};

// 2)
// checks if current booking overlaps with listing unavailability
module.exports.checkIfListingAvailable = async (listingId, bs, be) => {
  const listing = await Listing.findOne({ _id: listingId });

  // get all dates when listing is available
  const listingAvDates = listing.availableDates.reduce((acc, cur) => {
    const dates = createDatesArray(cur.startDate, cur.endDate);
    acc.push(dates);
    return acc.toString().split(",");
  }, []);

  // get all dates of current booking request
  const bookingRequestDates = createDatesArray(bs, be);

  // if any date of booking request is not in listing availability => error
  const listingFullyAvailable = bookingRequestDates.every(date => listingAvDates.includes(date));

  return listingFullyAvailable ? { listingUnavailable: false } : { listingUnavailable: true };
};

// 2)
// creates new booking
module.exports.createNewBooking = async (data) => {
  const newBooking = await Booking.create(data);
  return newBooking;
};

// 3)
// updates listing
module.exports.updateListingAvailability = async (listingId, bs, be) => {
  const listing = await Listing.findOne({ _id: listingId });
  const listingAvDates = listing.availableDates.reduce((acc, cur) => {
    // listing available dates
    const ls = cur.startDate;
    const le = cur.endDate;

    // check which object needs to be updated
    const isBetween = moment(bs).isBetween(ls, le);
    const isSameStart = moment(bs).isSame(ls, "day");
    const isSameEnd = moment(be).isSame(le, "day");
    const dates = { startDate: 0, endDate: 0 };

    if (isBetween || isSameStart) {
      // if booking has same lenght than availability => no days left
      if (isSameStart && isSameEnd) {
        return [];
      }
      // if booking starts on same day but booking endDate is before listing availab.
      //  -> store rest avail.
      if (isSameStart && moment(be).isBefore(le, "day")) {
        dates.startDate = moment(be)
          .add(1, "day")
          .format("YYYY-MM-DD");
        dates.endDate = moment(le).format("YYYY-MM-DD");
        acc.push(dates);
      }
      // if booking startDate is after listing startDate and booking endDate
      //  is same as listing endDate -> store beginning avail
      if (moment(bs).isAfter(ls, "day") && isSameEnd) {
        dates.startDate = moment(ls).format("YYYY-MM-DD");
        dates.endDate = moment(bs)
          .subtract(1, "day")
          .format("YYYY-MM-DD");
        acc.push(dates);
      }
      // if booking startDate is after listing startDate and booking endDate
      // is before listing endDate -> store avail. before and after booking
      if (moment(bs).isAfter(ls, "day") && moment(be).isBefore(le, "day")) {
        const dates1 = { startDate: 0, endDate: 0 };
        const dates2 = { startDate: 0, endDate: 0 };

        dates1.startDate = moment(ls).format("YYYY-MM-DD");
        dates1.endDate = moment(bs)
          .subtract(1, "day")
          .format("YYYY-MM-DD");
        acc.push(dates1);
        dates2.startDate = moment(be)
          .add(1, "day")
          .format("YYYY-MM-DD");
        dates2.endDate = moment(le).format("YYYY-MM-DD");
        acc.push(dates2);
      }
    } else {
      // return the other availability objects
      dates.startDate = moment(ls).format("YYYY-MM-DD");
      dates.endDate = moment(le).format("YYYY-MM-DD");
      acc.push(dates);
    }

    return acc;
  }, []);

  const update = await Listing.updateOne(
    { _id: listing._id },
    { $set: { availableDates: listingAvDates } },
  );

  return update;
};

module.exports.getInternBookingsWithReviews = getInternBookingsWithReviews;
module.exports.getBookingById = getBookingById;
module.exports.getBookingWithUsers = getBookingWithUsers;
