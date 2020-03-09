const newBookingRequest = require('./newBookingRequest');
const getUserBookings = require('./getUserBookings');
const viewBooking = require('./viewBooking');
const acceptBooking = require('./acceptBooking');
const rejectBooking = require('./rejectBooking');
const getBookingsWithUsers = require('./getBookingsWithUsers');

module.exports = {
  newBookingRequest,
  getUserBookings,
  viewBooking,
  acceptBooking,
  rejectBooking,
  getBookingsWithUsers,
};
