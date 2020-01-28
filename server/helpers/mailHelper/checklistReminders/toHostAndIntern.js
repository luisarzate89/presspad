const sendMail = require("../index");
const { email } = require("../../../config");

const emailBodyToInternAndHost = require("./emailBodyToInternAndHost");
const createChecklistArray = require("./createChecklistArray");


const toHostAndIntern = ({
  recipientEmail,
  checklist,
  hostEmail,
  internEmail,
  name,
  startDate,
  bookingId,
  type,
}) => {
  let subject;
  switch (type) {
  case "BOOKING_REMINDER_2_WEEKS":
    subject = "Reminder: Your booking starts in two weeks";
    break;

  case "BOOKING_REMINDER_3_WEEKS":
    subject = "Reminder: Your booking starts in three weeks";
    break;

  default:
    subject = "Reminder: Your booking starts in one week";
    break;
  }


  const checklistHtmlRows = createChecklistArray({
    checklist,
    hostEmail,
    internEmail,
  });


  const html = emailBodyToInternAndHost({
    name,
    checklistHtmlRows,
    startDate,
    bookingId,
  });

  const messageDetails = {
    from: email,
    to: recipientEmail,
    subject,
    html,
  };

  return sendMail(messageDetails);
};


module.exports = toHostAndIntern;
