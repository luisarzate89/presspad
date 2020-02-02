const {
  getOutstandingReminders,
} = require('./../../database/queries/ScheduledEmail');
const addLinksIntoQuestion = require('./../../helpers/addLinksIntoQuestion');
const {
  toHostAndIntern,
  toAdmin,
} = require('../../helpers/mailHelper/checklistReminders/');

const sendOutstandingReminders = () =>
  new Promise(async (resolve, reject) => {
    const sentEmailsIds = [];

    try {
      const emails = await getOutstandingReminders();
      const emailsList = [];

      if (!emails.length) {
        // nothing to send!
        return resolve();
      }

      emails.forEach(email => {
        const {
          intern,
          host,
          hostChecklist = [],
          internChecklist = [],
          type,
          booking,
          _id,
        } = email;

        const hostEmail = host.email;
        const internEmail = intern.email;

        if (type === 'BOOKING_REMINDER_1_WEEK') {
          emailsList.push(
            toAdmin({
              hostChecklist,
              internChecklist,
              hostEmail,
              internEmail,
              startDate: booking.startDate,
              bookingId: booking._id,
              hostName: host.name,
              hostId: host._id,
              internName: intern.name,
              internId: intern._id,
            }),
          );
        }

        // embed social links into question
        [...hostChecklist, ...internChecklist].forEach(question =>
          addLinksIntoQuestion(question),
        );

        if (hostChecklist && hostChecklist.length) {
          emailsList.push(
            toHostAndIntern({
              recipientEmail: hostEmail,
              checklist: hostChecklist,
              hostEmail,
              internEmail,
              name: host.name,
              startDate: booking.startDate,
              bookingId: booking._id,
              type,
            }),
          );
        }

        if (internChecklist && internChecklist.length) {
          emailsList.push(
            toHostAndIntern({
              recipientEmail: internEmail,
              checklist: internChecklist,
              hostEmail,
              internEmail,
              name: intern.name,
              startDate: booking.startDate,
              bookingId: booking._id,
              type,
            }),
          );
        }

        sentEmailsIds.push(_id);
      });
      await Promise.all(emailsList);
      return resolve(sentEmailsIds);
    } catch (error) {
      return reject(error);
    }
  });

module.exports = sendOutstandingReminders;
