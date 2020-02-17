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
  Organisation,
  Profile,
  Review,
  ScheduledEmail,
  User,
  WithdrawRequest,
} = require('./../models');

const resetDB = async () => {
  try {
    await Account.deleteMany();
    await Booking.deleteMany();
    await ChecklistAnswer.deleteMany();
    await ChecklistQuestion.deleteMany();
    await Coupon.deleteMany();
    await ExternalTransaction.deleteMany();
    await Installment.deleteMany();
    await InternalTransaction.deleteMany();
    await Listing.deleteMany();
    await Notification.deleteMany();
    await Organisation.deleteMany();
    await Profile.deleteMany();
    await Review.deleteMany();
    await ScheduledEmail.deleteMany();
    await User.deleteMany();
    await WithdrawRequest.deleteMany();
  } catch (err) {
    console.log('Error during resting the db, try again', err);
    throw err;
  }
};

module.exports = resetDB;
