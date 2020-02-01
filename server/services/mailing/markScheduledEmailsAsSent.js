const {
  markScheduledEmailsAsSent,
} = require('./../../database/queries/ScheduledEmail');

module.exports = emailIds => markScheduledEmailsAsSent(emailIds);
