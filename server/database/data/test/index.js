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

const buildTestData = () => new Promise((resolve, reject) => {
  dbConnection()
    .then(async () => {
      await resetDb();
      await organisations();
      await orgCodes();
      await users();
      await referrals();
      await profiles();
      await listings();
      await bookings();
      await reviews();
      await notifications();
      await transactions();
    })
    .then(resolve)
    .catch(reject);
});

module.exports = buildTestData;
