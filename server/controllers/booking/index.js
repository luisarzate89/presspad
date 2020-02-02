const newBookingRequest = require('./newBookingRequest');
const getUserBookings = require('./getUserBookings');
const viewBooking = require('./viewBooking');
const acceptBooking = require('./acceptBooking');
const rejectBooking = require('./rejectBooking');

module.exports = {
  newBookingRequest,
  getUserBookings,
  viewBooking,
  acceptBooking,
  rejectBooking,
};
