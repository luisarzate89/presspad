const ScheduledEmail = require("./../../models/ScheduledEmail");

const createScheduledEmails = scheduledEmail => ScheduledEmail.create(scheduledEmail);

module.exports = createScheduledEmails;
