const ScheduledEmail = require('../../models/ScheduledEmail');

const reset = () => ScheduledEmail.deleteMany();

const createAll = async ({ users }) => {
  const { hostUser, internUser } = users;

  const scheduledEmails = {
    type: 'BOOKING_REMINDER_1_WEEK',
    data: {
      recipient: 'test@gmail.com',
      host: hostUser._id,
      booking: internUser._id,
    },
    isSent: false,
    dueDate: Date.now() + 7 * 24 * 60 * 60 * 1000, // after 7 days
  };

  const bookingReminder1 = await ScheduledEmail.create(scheduledEmails);
  return { bookingReminder1 };
};

module.exports = {
  createAll,
  reset,
};
