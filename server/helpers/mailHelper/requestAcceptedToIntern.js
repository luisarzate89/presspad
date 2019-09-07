const { capitalizeName } = require("../general");
const sendMail = require("./index");
const { email, domain } = require("./../../config");

/**
 * send email to intern when thier booking request get accepted
 * @param {Object} options - required options to send email
 * { host: { name } }, { intern: { name, email } , _id: bookingId},
 */
const requestAcceptedToIntern = (options) => {
  const hostName = capitalizeName(options.host.name);
  const internName = capitalizeName(options.intern.name);


  const html = `
    <p>Hi <span style="font-weight=700;">${internName}</span>.</p>
    <p><span style="font-weight=700;">Congratulations</span>: your booking request with ${hostName} has been accepted.</p>
    <p><a href="${domain}/booking/${options._id}">Select your payment method to confirme your booking<a></p>
  `;

  const messageDetails = {
    from: email,
    to: options.intern.email,
    subject: `${hostName} has accepted your request to stay.`,
    html,
  };

  return sendMail(messageDetails);
};
module.exports = requestAcceptedToIntern;
