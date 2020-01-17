const sendMail = require("../index");
const { email } = require("../../../config");

const emailBodyToAdmin = require("./emailBodyToAdmin");

const createChecklistArray = require("./createChecklistArray");

const toAdmin = ({
  hostChecklist,
  internChecklist,
  hostEmail,
  internEmail,
  startDate,
  bookingId,
  hostName,
  hostId,
  internName,
  internId,
}) => {
  const subject = "Reminder: Booking starts in one week";


  const hostChecklistHtmlRows = createChecklistArray({
    checklist: hostChecklist,
    hostEmail,
    internEmail,
  });

  const internChecklistHtmlRows = createChecklistArray({
    checklist: internChecklist,
    hostEmail,
    internEmail,
  });


  const html = emailBodyToAdmin({
    hostName,
    hostId,
    internName,
    internId,
    hostChecklist: hostChecklistHtmlRows,
    internChecklist: internChecklistHtmlRows,
    startDate,
    bookingId,
  });

  const messageDetails = {
    from: email,
    to: email,
    subject,
    html,
  };

  return sendMail(messageDetails);
};


module.exports = toAdmin;
