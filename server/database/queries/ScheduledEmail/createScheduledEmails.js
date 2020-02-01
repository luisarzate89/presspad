const ScheduledEmail = require('./../../models/ScheduledEmail');

const createScheduledEmails = (scheduledEmail, session) =>
  ScheduledEmail.create(
    scheduledEmail, // array or element to be created
    { session },
  );

module.exports = createScheduledEmails;
