const cron = require("node-cron");
const mailTask = require("./mailCron");

const cronJobs = async () => cron.schedule("1 1 3 * * *", async () => {
  await mailTask();
});

module.exports = cronJobs;