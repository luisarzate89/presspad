const moment = require('moment');

const { capitalizeName } = require('../../general');
const { domain } = require('../../../config');

const emailBodyToAdmin = ({
  hostName,
  hostId,
  internName,
  internId,
  hostChecklist,
  internChecklist,
  startDate,
  bookingId,
}) => {
  const startDateString = moment(startDate).format('DD MMM YYYY');
  const bookingURL = `${domain}/booking/${bookingId}`;
  const hostURL = `${domain}/host/${hostId}`;
  const internURL = `${domain}/intern/${internId}`;

  const html = `
  <div style="font-size: 16px; font-weight: 500;">
    <p>
      Hello! 
      <br>
      This is a reminder that <a href="${bookingURL}">this booking</a> is scheduled to start in one week from now, on <span style="font-weight=650;">${startDateString}</span>.
      <div style="font-weight: 700;">
        Host: <a href="${hostURL}">${capitalizeName(hostName)}</a>
        <ul>
          ${hostChecklist.join('\n')}
        </ul>
      </div>

      <div style="font-weight: 700;">
        Intern: <a href="${internURL}">${capitalizeName(internName)}</a>
        <ul>
          ${internChecklist.join('\n')}
        </ul>
      </div>
    </p>

    <p>
      <a href="${bookingURL}">view booking page</a>
    </p>
  </div>
  `;
  return html;
};

module.exports = emailBodyToAdmin;
