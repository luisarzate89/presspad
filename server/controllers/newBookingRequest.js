const boom = require("boom");
const {
  checkOtherBookingExists,
  createNewBooking,
  updateListingAvailability,
} = require("../database/queries/bookings");

module.exports = async (req, res, next) => {
  const {
    listing, user, startDate, endDate, payment,
  } = req.body;

  try {
    const userHasBooking = await checkOtherBookingExists(user, startDate, endDate);

    if (userHasBooking.bookingExists) {
      next(boom.forbidden("user has already a booking request for those dates"));
    }
    const data = {
      listing,
      user,
      startDate,
      endDate,
      payment,
    };
    createNewBooking(data);

    updateListingAvailability(listing, startDate, endDate);

    res.json({ success: true });
  } catch (error) {
    next(boom.badImplementation());
  }
};
