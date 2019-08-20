const boom = require("boom");

const getBookingWithUsers = require("../../database/queries/bookings/getBookingWithUsers");
const { getProfile } = require("../../database/queries/profile/getProfile");

const bookingsControllers = {};
module.exports = bookingsControllers;

bookingsControllers.getBookingsWithUsers = async (req, res, next) => {
  const { bookingId } = req.params;
  const currentUser = req.user.id;
  try {
    // gets booking by id then populates both host and intern fields with the entire document
    const populatedBooking = await getBookingWithUsers(bookingId);

    // get the profile of the person being reviewed
    const profile = populatedBooking.intern.id === currentUser
      ? await getProfile(populatedBooking.host.id)
      : await getProfile(populatedBooking.intern.id);

    // only send the userId, bio and jobTitle from the profile
    const {
      user, bio, jobTitle, profileImage,
    } = profile;

    return res.json({
      populatedBooking, bio, jobTitle, user, profileImage,
    });
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
