const { ScheduledEmail } = require("../../models");

const markScheduledEmailsAsSent = emailIds =>
  ScheduledEmail.updateMany({ _id: { $in: emailIds } }, { isSent: true });

module.exports = markScheduledEmailsAsSent;
