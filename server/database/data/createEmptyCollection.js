const {
  Account,
  Booking,
  ChecklistAnswer,
  ChecklistQuestion,
  Coupon,
  ExternalTransaction,
  Installment,
  InternalTransaction,
  Listing,
  Notification,
  OrgCodes,
  Organisation,
  Profile,
  Referal,
  Review,
  ScheduledEmail,
  ScheduledNotification,
  Transaction,
  User,
  WithdrawRequest,
} = require("./../models");

const createEmptyCollection = async () => {
  try {
    await Account.createCollection();
    await Booking.createCollection();
    await ChecklistAnswer.createCollection();
    await ChecklistQuestion.createCollection();
    await Coupon.createCollection();
    await ExternalTransaction.createCollection();
    await Installment.createCollection();
    await InternalTransaction.createCollection();
    await Listing.createCollection();
    await Notification.createCollection();
    await OrgCodes.createCollection();
    await Organisation.createCollection();
    await Profile.createCollection();
    await Referal.createCollection();
    await Review.createCollection();
    await ScheduledEmail.createCollection();
    await ScheduledNotification.createCollection();
    await Transaction.createCollection();
    await User.createCollection();
    await WithdrawRequest.createCollection();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log("Error during creating the collections, try again", err);
    throw err;
  }
};

module.exports = createEmptyCollection;
