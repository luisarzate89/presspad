const boom = require("boom");
const { hostAcceptBookingById, getBookingWithUsers } = require("../../database/queries/bookings");
const { createNotification } = require("./../../database/queries/notification");
const requestAcceptedToIntern = require("./../../helpers/mailHelper/requestAcceptedToIntern");
const requestAcceptedToAdmin = require("./../../helpers/mailHelper/requestAcceptedToAdmin");

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

    const notification = {
      private: false,
      user: updatedBookingRequest.intern,
      secondParty: updatedBookingRequest.host,
      type: "stayApproved",
    };

    // get emails data
    const bookingDetails = await getBookingWithUsers(bookingId);


    let promiseArray = [
      // create a notification for intern
      createNotification(notification),
    ];

    if (process.env.NODE_ENV === "production") {
      promiseArray = [...promiseArray, // send email to intern
        requestAcceptedToIntern(bookingDetails),
        // send email to admin
        requestAcceptedToAdmin(bookingDetails),
      ];
    }
    await Promise.all(promiseArray);

    return res.json({});
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};

module.exports = acceptBooking;
