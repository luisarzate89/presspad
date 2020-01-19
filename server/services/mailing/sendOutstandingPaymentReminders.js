const { getOutstandingPaymentReminders } = require("./../../database/queries/ScheduledEmail");
const sendPaymentReminderToIntern = require("../../helpers/mailHelper/sendPaymentReminderToIntern");

const sendOutstandingPaymentReminders = async () => new Promise(
  async (resolve, reject) => {
    try {
      const emails = await getOutstandingPaymentReminders();
      if (!emails.length) {
        // nothing to send!
        return resolve();
      }

      const promises = [];
      const sentEmailsIds = [];

      emails.forEach((email) => {
        const {
          intern, type, booking, _id,
        } = email;
        let paymentNumber;
        switch (type) {
        case "SECOND_PAYMENT_REMINDER":
          paymentNumber = "second";
          break;

        case "THIRD_PAYMENT_REMINDER":
          paymentNumber = "third";
          break;

        default:
          break;
        }

        promises.push(
          sendPaymentReminderToIntern({
            internName: intern.name,
            internEmail: intern.email,
            bookingId: booking._id,
            paymentNumber,
          }),
        );

        sentEmailsIds.push(_id);
      });

      await Promise.all(promises);
      return resolve(sentEmailsIds);
    } catch (error) {
      return reject(error);
    }
  },
);

module.exports = sendOutstandingPaymentReminders;
