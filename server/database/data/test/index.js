const dbConnection = require("../../dbConnection");
const resetDb = require("./../resetDB");

const organisations = require("../development/organisations");
const users = require("../development/users");
const referrals = require("../development/referrals");
const profiles = require("../development/profiles");
const listings = require("../development/listings");
const bookings = require("../development/bookings");
const reviews = require("../development/reviews");

const buildTestData = () => new Promise((resolve, reject) => {
  dbConnection()
    .then(async () => {
      await resetDb();
      await organisations();
      await users();
      await referrals();
      await profiles();
      await listings();
      await bookings();
      await reviews();
    })
    .then(resolve)
    .catch(reject);
});

module.exports = buildTestData;
