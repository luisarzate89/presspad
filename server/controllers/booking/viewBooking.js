const { getBookingById } = require("../../database/queries/bookings");

module.exports = async (req, res, next) => {
  const { id: bookingId } = req.params;
  const userType = "intern"; // Todo make it dynamic
  const booking = await getBookingById(bookingId, userType).exec();
  res.json({ data: booking });
};
