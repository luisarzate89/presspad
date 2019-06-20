const mongoose = require("mongoose");

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

const buildDevData = () => new Promise((resolve, reject) => {
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
      await transactions();
    })
    .then(resolve)
    .catch(reject);
});

buildDevData().then(() => {
  // eslint-disable-next-line no-console
  console.log("Done!: Dev DB has been built successfully");
  // close the connection after build
  mongoose.disconnect();
});
