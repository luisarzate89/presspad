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
    html: "",
  };
  const startDate = `${options.booking.startDate.toString().substring(0, 15)} at ${options.booking.startDate.toString().substring(16, 25)}`;
  if (options.dueDate === 1) {
    messageDetails.subject = "Reminder: Booking starts in one week";
    messageDetails.html = `<p>Hello, ${options.host.name}, ${options.intern.name}! <br> This is a reminder that your booking is scheduled to start in one week from now, on <span style="font-weight=650;">${startDate}</span>. See below the booking checklist.</p>`;
    messageDetails.html += options.html;
  } else if (options.dueDate === 2) {
    messageDetails.subject = "Reminder: Booking starts in two weeks";
    messageDetails.html = `<p>Hello, ${options.host.name}, ${options.intern.name}! <br> This is a reminder that your booking is scheduled to start in two weeks from now, on <span style="font-weight=650;">${startDate}</span>. See below the booking checklist.</p>`;
    messageDetails.html += options.html;
  } else if (options.dueDate === 3) {
    messageDetails.subject = "Reminder: Booking starts in three weeks";
    messageDetails.html = `<p>Hello, ${options.host.name}, ${options.intern.name}! <br> This is a reminder that your booking is scheduled to start in three weeks from now, on <span style="font-weight=650;">${startDate}</span>. See below the booking checklist.</p>`;
    messageDetails.html += options.html;
  }
  return messageDetails;
};

module.exports = createMessage;
