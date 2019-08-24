const Booking = require("../../models/Booking");

// finds booking by id then populates it with the host and intern
/**
 *
 * @param {string} bookingId
 * @return {Object: Promise} resolves to the booking document,
 * with host and intern documents nested in it.
 */

const getBookingsWithUsers = bookingId => new Promise((resolve, reject) => {
  Booking.findById(bookingId)
    .populate("host", "-password") // populates with the host object, excluding the password
    .populate("intern", "-password") // populates with the host object, excluding the password
    .exec((err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
});

module.exports = getBookingsWithUsers;
