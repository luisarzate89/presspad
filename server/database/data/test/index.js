const mongoose = require('mongoose');

const dbConnection = require('../../dbConnection');
const createEmptyCollection = require('../createEmptyCollection');

const account = require('./accounts');
const organisation = require('./organisations');
const user = require('./users');
const profile = require('./profiles');
const listing = require('./listings');
const booking = require('./bookings');

const review = require('./reviews');
const notification = require('./notifications');
const internalTransaction = require('./internalTransaction');
const coupon = require('./coupons');

const externalTransaction = require('./externalTransactions');
const installments = require('./installments');
const scheduledEmail = require('./scheduledEmails');
const checklistQuestion = require('./checklistQuestions');
const withdrawRequest = require('./withdrawRequests');
const checklistAnswer = require('./checklistAnswers');

const couponDiscountRate = 50;

const buildData = () =>
  new Promise((resolve, reject) => {
    dbConnection()
      .then(async () => {
        await createEmptyCollection();

        const accounts = await account.createAll();

        const organisations = await organisation.createAll({ accounts });

        const users = await user.createAll({
          accounts,
          organisations,
        });

        await profile.createAll({ users });

        const listings = await listing.createAll({ users });

        const bookings = await booking.createAll({
          users,
          listings,
        });

        await review.createAll({ bookings });

        await notification.createAll({ users, bookings });

        const internalTransactions = await internalTransaction.createAll({
          accounts,
          users,
          bookings,
          couponDiscountRate,
        });

        await coupon.createAll({
          users,
          accounts,
          organisations,
          bookings,
          couponDiscountRate,
          internalTransactions,
        });

        await scheduledEmail.createAll({ users });

        const checklistQuestions = await checklistQuestion.createAll();

        await checklistAnswer.createAll({
          checklistQuestions,
          users,
          bookings,
        });

        await externalTransaction.createAll({ users, accounts });

        await installments.createAll({ internalTransactions, bookings, users });

        await withdrawRequest.createAll({ users, accounts });
      })
      .then(resolve)
      .catch(reject);
  });

buildData().then(() => {
  // eslint-disable-next-line no-console
  console.log('Done!: DB has been built successfully');
  // close the connection after build
  mongoose.disconnect();
});
