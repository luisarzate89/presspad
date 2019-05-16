const mongoose = require("mongoose");

const dbConnection = require("../../dbConnection");
const resetDb = require("./../resetDB");

const organisations = require("./organisations");
const users = require("./users");
const referrals = require("./referrals");
const profiles = require("./profiles");

const buildDevData = () => new Promise((resolve, reject) => {
  dbConnection()
    .then(async () => {
      await resetDb();
      await organisations();
      await users();
      await referrals();
      await profiles();
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
