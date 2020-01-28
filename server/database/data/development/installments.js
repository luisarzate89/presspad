const Installment = require("../../models/Installment");
const Booking = require("../../models/Booking");
const InternalTransaction = require("../../models/InternalTransaction");

module.exports = async () => {
  const bookings = await Booking.find();
  const internalTransaction1 = await InternalTransaction.findOne({ user: bookings[0].intern });
  const internalTransaction2 = await InternalTransaction.findOne({ user: bookings[1].intern });

  const installments = [
    // 3 installments for one booking
    // the total is 300
    {
      booking: bookings[0]._id,
      intern: bookings[0].intern,
      host: bookings[0].host,
      amount: 100,
      dueDate: Date.now() - 5 * 24 * 60 * 60 * 1000,
      transactions: internalTransaction1._id,
    },
    {
      booking: bookings[0]._id,
      intern: bookings[0].intern,
      host: bookings[0].host,
      amount: 100,
      dueDate: Date.now() + 5 * 24 * 60 * 60 * 1000,
    },
    {
      booking: bookings[0]._id,
      intern: bookings[0].intern,
      host: bookings[0].host,
      amount: 100,
      dueDate: Date.now() + 12 * 24 * 60 * 60 * 1000,
    },
    // paying in front
    // total 400
    {
      booking: bookings[1]._id,
      intern: bookings[1].intern,
      host: bookings[1].host,
      amount: 400,
      dueDate: Date.now() + 12 * 24 * 60 * 60 * 1000,
      transactions: internalTransaction2._id,
    },
  ];
  return Installment.create(installments);
};
