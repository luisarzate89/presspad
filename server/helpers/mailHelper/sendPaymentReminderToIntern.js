const { capitalizeName } = require('../general');
const sendMail = require('./index');
const { email, domain } = require('../../config');

/**
 * send email to intern when thier next payment is outstanding
 */
const sendPaymentReminderToIntern = ({
  internName,
  internEmail,
  bookingId,
  paymentNumber,
}) => {
  const bookingURL = `${domain}/booking/${bookingId}`;

  const html = `
  <div style="font-size: 16px; font-weight: 500;">
    <p>Hi <span style="font-weight=700;">${capitalizeName(
      internName,
    )}</span>.</p>

    <p>
      This is a kindly reminder that your ${paymentNumber} payment is due. 
      <a href="${bookingURL}">Pay Now.</a>
    </p>
  </div>
  `;

  const messageDetails = {
    from: email,
    to: internEmail,
    subject: `Your ${paymentNumber} payment is due.`,
    html,
  };

  return sendMail(messageDetails);
};
module.exports = sendPaymentReminderToIntern;
