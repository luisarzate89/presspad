const boom = require("boom");

const {
  hostAcceptBookingById,
  getBookingWithUsers,
} = require("../../database/queries/bookings");
const { registerNotification } = require("../../services/notifications");
const requestAcceptedToIntern = require("./../../helpers/mailHelper/requestAcceptedToIntern");
const requestAcceptedToAdmin = require("./../../helpers/mailHelper/requestAcceptedToAdmin");
const { scheduleReminderEmails } = require("./../../services/mailing");
const {
  findAllQuestions,
  createChecklistAnswers,
} = require("./../../database/queries/checkList");

const createBookingChecklistAnswers = require("../../helpers/createBookingChecklistAnswers");

const acceptBooking = async (req, res, next) => {
  const { id: bookingId } = req.params;
  const { role, _id: hostId } = req.user;
  const { moneyGoTo } = req.body;
  try {
    // check for role
    if (role !== "host" && role !== "superhost") {
      return next(boom.forbidden());
    }

    const updatedBookingRequest = await hostAcceptBookingById({
      bookingId,
      hostId,
      moneyGoTo,
    });

    const notification = {
      private: false,
      user: updatedBookingRequest.intern,
      secondParty: updatedBookingRequest.host,
      type: "stayApproved",
      booking: bookingId,
    };

    // get emails data
    const bookingDetails = await getBookingWithUsers(bookingId);

    const allQuestions = await findAllQuestions();

    // create answers checklist for this booking
    const answers = createBookingChecklistAnswers({
      questions: allQuestions,
      host: bookingDetails.host,
      intern: bookingDetails.intern,
      bookingId,
    });

    let promiseArray = [
      // create a notification for intern
      registerNotification(notification),
      scheduleReminderEmails({
        bookingId,
        startDate: updatedBookingRequest.startDate,
        hostId: updatedBookingRequest.host._id,
        internId: updatedBookingRequest.intern._id,
      }),
      // store the answers
      createChecklistAnswers(answers),
    ];

    if (process.env.NODE_ENV === "production") {
      promiseArray = [
        ...promiseArray, // send email to intern
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
