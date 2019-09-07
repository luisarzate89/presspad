const boom = require("boom");
const { hostRejectBookingById, getBookingWithUsers } = require("../../database/queries/bookings");
const { createNotification } = require("./../../database/queries/notification");


const requestRejectedToIntern = require("./../../helpers/mailHelper/requestRejectedToIntern");

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
    const notification = {
      private: false,
      user: updatedBookingRequest.intern,
      secondParty: updatedBookingRequest.host,
      type: "stayRejected",
    };

    // get emails data
    const bookingDetails = await getBookingWithUsers(bookingId);


    await Promise.all([
      createNotification(notification),
      requestRejectedToIntern(bookingDetails),
    ]);


    return res.json({});
  } catch (error) {
    return next(boom.badRequest(error));
  }
};

module.exports = rejectBooking;
