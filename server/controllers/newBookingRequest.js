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
    // const userHasBooking = await checkOtherBookingExists(user, startDate, endDate);

    // if (userHasBooking) {
    //   next(boom.forbidden("user has already a booking request for those dates"));
    // }
    await updateListingAvailability(listing, startDate, endDate).then(result => console.log(result));

    // console.log(userBookings);
    // res.json({ success: true });
  } catch (error) {
    next(boom.badImplementation());
  }
};
