const moment = require('moment');

const sendMail = require('./index');
const { capitalizeName } = require('../general');
const { email, domain } = require('./../../config');
/**
 * send email to amdin a host accept a request
 * @param {Object} options - required options to send email
 * { host: { name } }, { intern: { name, email } },
 */
const requestAcceptedToAdmin = options => {
  const hostName = capitalizeName(options.host.name);
  const internName = capitalizeName(options.intern.name);

  const html = `
    <p>Hi</p>
    <p>
      <span style="font-weight=700;">
        <a href="${domain}/hosts/${options.host._id}">${hostName}</a>
      </span>
      has approved 
      <span style="font-weight=700;">
        <a href="${domain}/interns/${options.intern._id}">${internName}</a>
      </span>
      's request      
    </p>
    <p>
      Booking Details:
    </p>
    <ul>
      <li>Start date: ${moment(options.startDate).format('DD MMM YYYY')}</li>
      <li>End date: ${moment(options.endDate).format('DD MMM YYYY')}</li>
      <li>Price: £${(Math.round(options.price * 100) / 100).toFixed(2)}</li>
      <li>To be paid to: ${
        options.moneyGoTo === 'presspad' ? 'Presspad' : 'The host'
      }</li>
    <ul>
  `;

  const messageDetails = {
    from: email,
    to: email,
    subject: `${hostName} has accepted ${internName}'s booking request.`,
    html,
  };

  return sendMail(messageDetails);
};
module.exports = requestAcceptedToAdmin;
