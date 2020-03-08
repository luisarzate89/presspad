const mongoose = require('mongoose');

const testConnection = require('../../testConnection');
const devConnection = require('../../dbConnection');
const resetDB = require('../resetDB');

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
const installment = require('./installments');
const scheduledEmail = require('./scheduledEmails');
const checklistQuestion = require('./checklistQuestions');
const withdrawRequest = require('./withdrawRequests');
const checklistAnswer = require('./checklistAnswers');

const couponDiscountRate = 50;

let connect = devConnection;

if (process.env.NODE_ENV === 'test') {
  connect = testConnection;
}
const buildData = options =>
  connect(options).then(async ({ connection, mongoServer }) => {
    await createEmptyCollection();
    if (process.env.NODE_ENV !== 'test') {
      await resetDB();
    }

    const accounts = await account.createAll();

    const organisations = await organisation.createAll({ accounts });

    const users = await user.createAll({
      accounts,
      organisations,
    });

    const profiles = await profile.createAll({ users });

    const listings = await listing.createAll({ users });

    const bookings = await booking.createAll({
      users,
      listings,
    });

    const reviews = await review.createAll({ bookings });

    const notifications = await notification.createAll({ users, bookings });

    const internalTransactions = await internalTransaction.createAll({
      accounts,
      users,
      bookings,
      couponDiscountRate,
    });

    const coupons = await coupon.createAll({
      users,
      accounts,
      organisations,
      bookings,
      couponDiscountRate,
      internalTransactions,
    });

    const scheduledEmails = await scheduledEmail.createAll({ users });

    const checklistQuestions = await checklistQuestion.createAll();

    const checklistAnswers = await checklistAnswer.createAll({
      checklistQuestions,
      users,
      bookings,
    });

    const externalTransactions = await externalTransaction.createAll({
      users,
      accounts,
    });

    const installments = await installment.createAll({
      internalTransactions,
      bookings,
      users,
    });

    const withdrawRequests = await withdrawRequest.createAll({
      users,
      accounts,
    });
    return {
      connection,
      mongoServer,
      accounts,
      organisations,
      users,
      profiles,
      listings,
      bookings,
      reviews,
      notifications,
      internalTransactions,
      coupons,
      scheduledEmails,
      checklistAnswers,
      checklistQuestions,
      externalTransactions,
      installments,
      withdrawRequests,
    };
  });

if (process.env.NODE_ENV !== 'test') {
  buildData().then(() => {
    // eslint-disable-next-line no-console
    console.log('Done!: DB has been built successfully');
    // close the connection after build
    mongoose.disconnect();
  });
}

module.exports = buildData;
