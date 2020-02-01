const mongoose = require('mongoose');

const dbConnection = require('../../dbConnection');
const resetDb = require('./../resetDB');

const organisations = require('./organisations');
const orgCodes = require('./orgCodes');
const users = require('./users');
const referrals = require('./referrals');
const profiles = require('./profiles');
const listings = require('./listings');
const bookings = require('./bookings');
const reviews = require('./reviews');
const notifications = require('./notifications');
const transactions = require('./transactions');
const accounts = require('./accounts');
const internalTransaction = require('./internalTransaction');
const coupons = require('./coupons');
const scheduledNotifications = require('./scheduledNotifications');
const externalTransactions = require('./externalTransactions');
const installments = require('./installments');
const scheduledEmails = require('./scheduledEmails');
const checklistQuestions = require('./checklistQuestions');
const checklistAnswers = require('./checklistAnswers');
const withdrawRequests = require('./withdrawRequests');

const buildDevData = () =>
  new Promise((resolve, reject) => {
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
        await checklistQuestions();
        await checklistAnswers();
        await withdrawRequests();
      })
      .then(resolve)
      .catch(reject);
  });

buildDevData().then(() => {
  // eslint-disable-next-line no-console
  console.log('Done!: Dev DB has been built successfully');
  // close the connection after build
  mongoose.disconnect();
});
