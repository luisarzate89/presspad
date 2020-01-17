const { ScheduledEmail } = require("./../../database/models");

const markScheduledEmailsAsSent = profileIds => ScheduledEmail.updateMany(
  { _id: { $in: profileIds } },
  { isSent: true },
);

module.exports = markScheduledEmailsAsSent;
