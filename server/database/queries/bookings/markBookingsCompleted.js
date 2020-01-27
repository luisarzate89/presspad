const Booking = require("../../models/Booking");

module.exports = bookingsIds =>
  Booking.updateMany({ _id: { $in: bookingsIds } }, { status: "completed" });
