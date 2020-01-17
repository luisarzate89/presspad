const { sendOutstandingReminders, markScheduledEmailsAsSent } = require("./../../../services/mailing");

const sendScheduledReminders = async (Sentry) => {
  try {
    const sentEmailsIds = await sendOutstandingReminders();
    await markScheduledEmailsAsSent(sentEmailsIds);
  } catch (error) {
    Sentry.captureException(error);
  }
};

module.exports = sendScheduledReminders;
