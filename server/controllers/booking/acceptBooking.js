const boom = require("boom");
const { hostAcceptBookingById, getBookingWithUsers } = require("../../database/queries/bookings");
const { createNotification } = require("./../../database/queries/notification");
const requestAcceptedToIntern = require("./../../helpers/mailHelper/requestAcceptedToIntern");

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
    // to inform intern that thier request get accepted
    await createNotification({
      private: false,
      user: updatedBookingRequest.intern,
      secondParty: updatedBookingRequest.host,
      type: "stayApproved",
    });

    // get emails data
    const bookingDetails = await getBookingWithUsers(bookingId);
    // send email to intern
    await requestAcceptedToIntern(bookingDetails);

    return res.json({});
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};

module.exports = acceptBooking;
