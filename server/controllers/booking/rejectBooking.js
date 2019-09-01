const boom = require("boom");
const { hostRejectBookingById } = require("../../database/queries/bookings");

const rejectBooking = async (req, res, next) => {
  const { id: bookingId } = req.params;
  const { role, _id: hostId } = req.user;
  try {
    // check for role
    if (role !== "host" && role !== "superhost") {
      return next(boom.forbidden());
    }

    await hostRejectBookingById({ bookingId, hostId });
    return res.json({});
  } catch (error) {
    return next(boom.badRequest(error));
  }
};

module.exports = rejectBooking;
