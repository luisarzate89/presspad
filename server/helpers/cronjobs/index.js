const cron = require("node-cron");
// const mailTask = require("./mailCron");
const giveBadges = require("./giveBadges");
const sendScheduledReminders = require("./sendScheduledReminders");
const releaseExpiredCouponsValue = require("./releaseExpiredCouponsValue");


const cronJobs = async (Sentry) => {
  cron.schedule("1 1 2 * * *", async () => {
    await sendScheduledReminders(Sentry);
  });

  cron.schedule("1 1 1 * * *", async () => {
    await releaseExpiredCouponsValue(Sentry);
  });


  // cron.schedule("1 1 3 * * *", async () => {
  //   await mailTask();
  // });


  cron.schedule("1 1 4 * * *", async () => {
    await giveBadges(Sentry);
  });
};

module.exports = cronJobs;
