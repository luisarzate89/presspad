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
      amount: 6000,
      dueDate: Date.now() - 20 * 24 * 60 * 60 * 1000,
      transaction: internalTransactionsCompletedIntern._id,
    },
    // for the confimed booking and paid first insatallment
    {
      booking: confirmedPaidFirst._id,
      intern: internUser._id,
      host: hostUser._id,
      amount: 3333,
      dueDate: Date.now() + 20 * 24 * 60 * 60 * 1000,
      transaction: internalTransactionsConfirmedPaidFirst._id,
    },
    {
      booking: confirmedPaidFirst._id,
      intern: internUser._id,
      host: hostUser._id,
      amount: 3333,
      dueDate: Date.now() + 26 * 24 * 60 * 60 * 1000,
    },
    {
      booking: confirmedPaidFirst._id,
      intern: internUser._id,
      host: hostUser._id,
      amount: 3334,
      dueDate: Date.now() + 29 * 24 * 60 * 60 * 1000,
    },
  ];
  const [
    upfrontPayment,
    firstPaidPayment,
    secondUnpaidPayment,
    thirdUnpaidPayment,
  ] = await Installment.create(installments);

  return {
    upfrontPayment,
    firstPaidPayment,
    secondUnpaidPayment,
    thirdUnpaidPayment,
  };
};

module.exports = {
  createAll,
  reset,
};
