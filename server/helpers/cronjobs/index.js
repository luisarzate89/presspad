const cron = require("node-cron");
const mailTask = require("./mailCron");

const cronJobs = async () => {
  await mailTask();
  return cron.schedule("1 1 3 * * *", async () => {
  });
};

module.exports = cronJobs;
