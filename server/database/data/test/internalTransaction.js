const InternalTransaction = require('../../models/InternalTransaction');

const reset = () => InternalTransaction.deleteMany();

const createAll = async ({ accounts, users, bookings, couponDiscountRate }) => {
  const { internUser, organisationUser } = users;
  const { hostAccount, internAccount, organisationAccount } = accounts;
  const { completedBooking } = bookings;

  await reset();

  const internalTransactions = [
    // completedBooking installment
    {
      user: internUser._id,
      from: internAccount._id,
      to: hostAccount._id,
      amount:
        completedBooking.price -
        (completedBooking.price * (100 - couponDiscountRate)) / 100, // 60
      type: 'installment',
    },
    // from organsisation to host
    {
      user: organisationUser._id,
      // this is the account for the org not the user
      from: organisationAccount._id,
      to: hostAccount._id,
      amount: (completedBooking.price * couponDiscountRate) / 100, // 60
      type: 'couponTransaction',
    },
    // confirmedPaidFirst
    {
      user: internUser._id,
      from: internAccount._id,
      to: hostAccount._id,
      amount: 3333,
      type: 'installment',
    },
  ];
  const [
    internalTransactionsCompletedIntern,
    internalTransactionsCompletedCoupon,
    internalTransactionsConfirmedPaidFirst,
  ] = await InternalTransaction.create(internalTransactions);

  return {
    internalTransactionsCompletedIntern,
    internalTransactionsCompletedCoupon,
    internalTransactionsConfirmedPaidFirst,
  };
};

module.exports = {
  createAll,
  reset,
};
