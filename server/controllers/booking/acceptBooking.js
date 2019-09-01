const boom = require("boom");
const { hostAcceptBookingById } = require("../../database/queries/bookings");

const acceptBooking = async (req, res, next) => {
  const { id: bookingId } = req.params;
  const { role, _id: hostId } = req.user;
  const { moneyGoTo } = req.body;
  try {
    // check for role
    if (role !== "host" && role !== "superhost") {
      return next(boom.forbidden());
    }

    await hostAcceptBookingById({ bookingId, hostId, moneyGoTo });
    return res.json({});
  } catch (error) {
    return next(boom.badRequest(error));
  }
};

module.exports = acceptBooking;
