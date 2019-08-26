const cron = require("node-cron");
const BookingsList = require("./mailChecklist");

const cronJobs = async () => {  
  console.log("kurwa")
  console.log(await BookingsList());
  return cron.schedule("* * * * * *", () => {
    console.log("hello, cron")
  });
};

module.exports = cronJobs;
