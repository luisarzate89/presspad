const Booking = require('../../models/Booking');

const reset = () => Booking.deleteMany();

const createAll = async ({ users, listings }) => {
  const { internUser, hostUser } = users;
  const { LondonListing } = listings;

  await reset();
  const bookings = [
    // completed
    {
      listing: LondonListing._id,
      intern: internUser,
      host: hostUser,
      startDate: Date.now() - 20 * 24 * 60 * 60 * 1000,
      endDate: Date.now() - 15 * 24 * 60 * 60 * 1000,
      status: 'completed',
      price: 120,
      payedAmount: 120,
      moneyGoTo: 'host',
    },
    // pending
    {
      listing: LondonListing._id,
      intern: internUser,
      host: hostUser,
      startDate: Date.now() + 15 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 20 * 24 * 60 * 60 * 1000,
      status: 'pending',
      price: 120,
      payedAmount: 0,
      moneyGoTo: 'host',
    },
    // confirmed & not paid
    {
      listing: LondonListing._id,
      intern: internUser,
      host: hostUser,
      startDate: Date.now() + 25 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
      status: 'confirmed',
      price: 120,
      payedAmount: 0,
      moneyGoTo: 'presspad',
    },
    // confirmed & paid (first payment)
    {
      listing: LondonListing._id,
      intern: internUser,
      host: hostUser,
      startDate: Date.now() + 31 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 35 * 24 * 60 * 60 * 1000,
      status: 'confirmed',
      price: 100,
      payedAmount: 33.33,
      moneyGoTo: 'presspad',
    },
  ];

  const [
    completedBooking,
    pendingBooking,
    confirmedNotPaid,
    confirmedPaidFirst,
  ] = await Booking.create(bookings);

  return {
    completedBooking,
    pendingBooking,
    confirmedNotPaid,
    confirmedPaidFirst,
  };
};

module.exports = {
  createAll,
  reset,
};
