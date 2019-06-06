const Booking = require("./../models/Booking");

module.exports.createNewBooking = data => Booking.create(data);
