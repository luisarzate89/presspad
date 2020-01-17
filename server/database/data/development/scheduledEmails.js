
const ScheduledEmail = require("../../models/ScheduledEmail");
const Booking = require("../../models/Booking");

module.exports = async () => {
  const bookings = await Booking.find();

  const scheduledEmails = [
    {
      type: "BOOKING_REMINDER_1_WEEK",
      data: {
        recipient: "test@gmail.com",
        host: bookings[0].host,
        booking: bookings[0]._id,
      },
      isSent: false,
      dueDate: Date.now() + 7 * 24 * 60 * 60 * 1000, // after 7 days
    },
  ];

  await ScheduledEmail.create(scheduledEmails);
};
