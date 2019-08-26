const cron = require("node-cron");
const mailTask = require("./mailCron");

const cronJobs = async () => {
  return cron.schedule("1 1 3 * * *", async () => {
    await mailTask();
    console.log("hello, cron")
  });
};

module.exports = cronJobs;
