const moment = require('moment');

const { capitalizeName } = require('../../general');
const { domain } = require('../../../config');

// creates email main body
const emailBodyToInternAndHost = ({
  name,
  checklistHtmlRows,
  startDate,
  bookingId,
}) => {
  const startDateString = moment(startDate).format('DD MMM YYYY');
  const bookingURL = `${domain}/booking/${bookingId}`;
  const html = `
  <div style="font-size: 16px; font-weight: 500;">
    <p>
      Hello, ${capitalizeName(name)}! 
      <br>
      This is a reminder that your <a href="${bookingURL}">booking</a> is scheduled to start in one week from now, on <span style="font-weight=650;">${startDateString}</span>.
      See below the booking checklist.
      <ul>
        ${checklistHtmlRows.join('\n')}
      </ul>
    </p>


    <p>
      Make sure you've done them 7 days before your booking due date, otherwise the booking maybe got canceled. 
    </p>

    <p>
      <a href="${bookingURL}">view your booking</a>
    </p>
  </div>
  `;
  return html;
};

module.exports = emailBodyToInternAndHost;
