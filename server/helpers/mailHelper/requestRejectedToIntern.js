const { capitalizeName } = require('../general');
const sendMail = require('./index');
const { email } = require('../../config');

/**
 * send email to intern when thier booking get rejected
 * @param {Object} options - required options to send email
 * { host: { name } }, { intern: { name, email } , _id: bookingId},
 */
const requestRejectedToIntern = options => {
  const hostName = capitalizeName(options.host.name);
  const internName = capitalizeName(options.intern.name);

  const html = `
    <p>Hi <span style="font-weight=700;">${internName}</span>.</p>
    <p><span style="font-weight=700;">unfortunately</span>: your booking request with ${hostName} has been rejected.</p>
  `;

  const messageDetails = {
    from: email,
    to: options.intern.email,
    subject: 'You booking request has been rejected',
    html,
  };

  return sendMail(messageDetails);
};
module.exports = requestRejectedToIntern;
