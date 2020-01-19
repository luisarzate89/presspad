const { ScheduledEmail } = require("./../index");

const markScheduledEmailsAsSent = emailIds => ScheduledEmail.updateMany(
  { _id: { $in: emailIds } },
  { isSent: true },
);

module.exports = markScheduledEmailsAsSent;
