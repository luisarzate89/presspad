const mongoose = require("mongoose");
const dbConnect = require("../../dbConnection");
const resetDb = require("./../resetDB");

const organisations = require("./organisations");
const orgCodes = require("./orgCodes");
const users = require("./users");
const referrals = require("./referrals");
const profiles = require("./profiles");
const listings = require("./listings");
const bookings = require("./bookings");
const reviews = require("./reviews");
const transactions = require("./transactions");
const notifications = require("./notifications");
const accounts = require("./accounts");
const internalTransaction = require("./internalTransaction");
const coupons = require("./coupons");
const scheduledNotifications = require("./scheduledNotifications");
const externalTransactions = require("./externalTransactions");
const installments = require("./installments");
const scheduledEmails = require("./scheduledEmails");
const checklistQuestions = require("./checklistQuestions");
const checklistAnswers = require("./checklistAnswers");
const withdrawRequests = require("./withdrawRequests");


const buildTestData = useAtlas => new Promise((resolve, reject) => {
  dbConnect(useAtlas)
    .then(async () => {
      try {
        await resetDb();
        await accounts();
        await organisations();
        await users();
        await orgCodes();
        await referrals();
        await profiles();
        await listings();
        await bookings();
        await reviews();
        await notifications();
        await transactions();
        await internalTransaction();
        await coupons();
        await scheduledNotifications();
        await externalTransactions();
        await installments();
        await scheduledEmails();
        await checklistQuestions();
        await checklistAnswers();
        await withdrawRequests();
      } catch (err) {
        console.log("err during building the test db, try again", err);
        throw err;
      }
    })
    .then(resolve)
    .catch(reject);
});

if (process.env.NODE_ENV === "build") {
  buildTestData().then(() => {
    // eslint-disable-next-line no-console
    console.log("Done!: Dev DB has been built successfully");
    // close the connection after build
    mongoose.disconnect();
  });
}


module.exports = buildTestData;
