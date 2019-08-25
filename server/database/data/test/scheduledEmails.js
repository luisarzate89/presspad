
const ScheduledEmail = require("../../models/ScheduledEmail");
const Booking = require("../../models/Booking");

module.exports = async () => {
  const bookings = await Booking.findOne({ status: "confirmed" }).sort({ price: 1 });

  const scheduledEmail = {
    type: "INTERN_REMINDER_7_DAYS",
    data: {
      recipient: "test@gmail.com",
      host: bookings.host,
      booking: bookings._id,
    },
    isSent: false,
    dueDate: Date.now() + 7 * 24 * 60 * 60 * 1000, // after 7 days
  };


  await ScheduledEmail.create(scheduledEmail);
};
