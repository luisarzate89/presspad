const Booking = require("./../models/Booking");
const User = require("./../models/User");

// 1)
// checks if user has a booking
// gets all user bookings
// checks against new booking request

module.exports.getUserBookings = async (userId) => {
  const bookings = await Booking.find({ user: userId });
  const bookingDates = bookings.reduce((acc, cur) => {
    const dates = { startDate: cur.startDate, endDate: cur.endDate };
    acc.push(dates);
    return acc;
  }, []);
  return bookingDates;
};

// 2)
// creates new booking
module.exports.createNewBooking = data => Booking.create(data);

// 3)
// updates listing
