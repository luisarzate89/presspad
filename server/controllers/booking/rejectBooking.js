const boom = require("boom");
const { hostRejectBookingById } = require("../../database/queries/bookings");
const { createNotification } = require("./../../database/queries/notification");

const rejectBooking = async (req, res, next) => {
  const { id: bookingId } = req.params;
  const { role, _id: hostId } = req.user;
  try {
    // check for role
    if (role !== "host" && role !== "superhost") {
      return next(boom.forbidden());
    }

    const updatedBookingRequest = await hostRejectBookingById({ bookingId, hostId });

    // create a notification for intern
    // to inform him that his/her request accepted
    await createNotification({
      private: false,
      user: updatedBookingRequest.intern,
      secondParty: updatedBookingRequest.host,
      type: "stayRejected",
    });

    return res.json({});
  } catch (error) {
    return next(boom.badRequest(error));
  }
};

module.exports = rejectBooking;
