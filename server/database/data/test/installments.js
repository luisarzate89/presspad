const Installment = require('../../models/Installment');

const reset = () => Installment.deleteMany();

const createAll = async ({ bookings, users, internalTransactions }) => {
  const {
    internalTransactionsCompletedIntern,
    internalTransactionsConfirmedPaidFirst,
  } = internalTransactions;
  const { internUser, hostUser } = users;
  await reset();

  const { completedBooking, confirmedPaidFirst } = bookings;

  const installments = [
    // for the completed booking and paid upfront
    {
      booking: completedBooking._id,
      intern: internUser._id,
      host: hostUser._id,
      amount: 60,
      dueDate: Date.now() - 20 * 24 * 60 * 60 * 1000,
      transaction: internalTransactionsCompletedIntern._id,
    },
    // for the confimed booking and paid first insatallment
    {
      booking: confirmedPaidFirst._id,
      intern: internUser._id,
      host: hostUser._id,
      amount: 33.33,
      dueDate: Date.now() + 20 * 24 * 60 * 60 * 1000,
      transaction: internalTransactionsConfirmedPaidFirst._id,
    },
    {
      booking: confirmedPaidFirst._id,
      intern: internUser._id,
      host: hostUser._id,
      amount: 33.33,
      dueDate: Date.now() + 26 * 24 * 60 * 60 * 1000,
    },
    {
      booking: confirmedPaidFirst._id,
      intern: internUser._id,
      host: hostUser._id,
      amount: 33.34,
      dueDate: Date.now() + 29 * 24 * 60 * 60 * 1000,
    },
  ];
  return Installment.create(installments);
};

module.exports = {
  createAll,
  reset,
};
