const boom = require("boom");
const { hostAcceptBookingById } = require("../../database/queries/bookings");
const { createNotification } = require("./../../database/queries/notification");

const acceptBooking = async (req, res, next) => {
  const { id: bookingId } = req.params;
  const { role, _id: hostId } = req.user;
  const { moneyGoTo } = req.body;
  try {
    // check for role
    if (role !== "host" && role !== "superhost") {
      return next(boom.forbidden());
    }

    const updatedBookingRequest = await hostAcceptBookingById({ bookingId, hostId, moneyGoTo });

    // create a notification for intern
    // to inform him that his/her request accepted
    await createNotification({
      private: false,
      user: updatedBookingRequest.intern,
      secondParty: updatedBookingRequest.host,
      type: "stayApproved",
    });

    return res.json({});
  } catch (error) {
    return next(boom.badRequest(error));
  }
};

module.exports = acceptBooking;
