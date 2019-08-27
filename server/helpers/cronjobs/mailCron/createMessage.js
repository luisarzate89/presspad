/**
 * 
 * @param {object} options includes details of the message e.g. content, sender, etc.
 * @return {object}
 */

const createMessage = (options) => {
  const messageDetails = {
    from: process.env.EMAIL, // presspad mail
    to: [options.host.email, options.intern.email], // array of emails (both intern and host)
    subject: "",
    text: "",
  };
  const startDate = `${options.booking.startDate.substring(0, 10)} at ${options.booking.startDate.substring(11, 19)}`;
  if (options.dueDate === 1) {
    messageDetails.subject = "Reminder: Booking starts in one week";
    messageDetails.text = `Hello, ${options.host.name}, ${options.intern.name}! \nThis is a reminder that your booking is scheduled to start in one week from now, on ${startDate}. See below the booking checklist.`;
  } else if (options.dueDate === 2) {
    messageDetails.subject = "Reminder: Booking starts in two weeks";
    messageDetails.text = `Hello, ${options.host.name}, ${options.intern.name}! \nThis is a reminder that your booking is scheduled to start in two weeks from now, on ${startDate}. See below the booking checklist.`;
  } else if (options.dueDate === 3) {
    messageDetails.subject = "Reminder: Booking starts in three weeks";
    messageDetails.text = `Hello, ${options.host.name}, ${options.intern.name}! \nThis is a reminder that your booking is scheduled to start in three weeks from now, on ${startDate}. See below the booking checklist.`;
  }
  return messageDetails;
};

module.exports = createMessage;
