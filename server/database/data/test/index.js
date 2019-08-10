const dbConnection = require("../../dbConnection");
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

const buildTestData = () => new Promise((resolve, reject) => {
  dbConnection()
    .then(async () => {
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
    })
    .then(resolve)
    .catch(reject);
});

module.exports = buildTestData;
