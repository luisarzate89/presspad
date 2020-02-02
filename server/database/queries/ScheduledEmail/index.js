const createScheduledEmails = require('./createScheduledEmails');
const getOutstandingReminders = require('./getOutstandingReminders');
const getOutstandingPaymentReminders = require('./getOutstandingPaymentReminders');
const markScheduledEmailsAsSent = require('./markScheduledEmailsAsSent');

module.exports = {
  createScheduledEmails,
  getOutstandingReminders,
  getOutstandingPaymentReminders,
  markScheduledEmailsAsSent,
};
