
const ScheduledEmail = require("../../models/ScheduledEmail");
const Booking = require("../../models/Booking");

module.exports = async () => {
  const bookings = await Booking.find();

  const scheduledEmail = {
    type: "INTERN_REMINDER_7_DAYS",
    data: {
      recipient: "test@gmail.com",
      host: bookings[0].host,
      booking: bookings[0]._id,
    },
    isSent: false,
    dueDate: Date.now() + 7 * 24 * 60 * 60 * 1000, // after 7 days
  };


  await ScheduledEmail.create(scheduledEmail);
};
