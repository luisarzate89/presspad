const cron = require('node-cron');
// const mailTask = require("./mailCron");
const giveBadges = require('./giveBadges');
const sendScheduledReminders = require('./sendScheduledReminders');
const sendScheduledPaymentReminders = require('./sendScheduledPaymentReminders');
const releaseExpiredCouponsValue = require('./releaseExpiredCouponsValue');
const cancelOldBookings = require('./cancelOldBookings');
const completeBookingsAndNotify = require('./completeBookingsAndNotify');

const cronJobs = async Sentry => {
  cron.schedule('1 1 1 * * *', async () => {
    await releaseExpiredCouponsValue(Sentry);
  });

  cron.schedule('0 0 0 * * *', async () => {
    await cancelOldBookings();
  });

  cron.schedule('0 0 0 * * *', async () => {
    await completeBookingsAndNotify();
  });

  cron.schedule('1 1 2 * * *', async () => {
    await sendScheduledReminders(Sentry);
  });

  cron.schedule('1 1 3 * * *', async () => {
    await sendScheduledPaymentReminders(Sentry);
  });

  // cron.schedule("1 1 3 * * *", async () => {
  //   await mailTask();
  // });

  cron.schedule('1 1 4 * * *', async () => {
    await giveBadges(Sentry);
  });
};

module.exports = cronJobs;
