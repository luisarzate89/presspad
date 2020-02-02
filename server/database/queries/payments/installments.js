const mongoose = require('mongoose');

const Installment = require('../../models/Installment');
const Booking = require('../../models/Booking');

/**
 * Insert installments (BE AWARE this modify the installments[Array | Object] reference)
 * at this point no one use the installment reference
 * This should work inside a transaction session
 * @param {Array | Object} installments Array for 3 installmetns | object for upFront
 * @param {string} bookingId
 * @param {string} internId
 * @param {string} hostId
 * @param {session} session Transaction session
 */
const createInstallments = (
  installments,
  bookingId,
  internId,
  hostId,
  session,
) => {
  if (Array.isArray(installments)) {
    // modify the installments
    for (let i = 0; i < installments.length; i += 1) {
      // eslint-disable-next-line no-param-reassign
      installments[i].intern = internId;
      // eslint-disable-next-line no-param-reassign
      installments[i].host = hostId;
      // eslint-disable-next-line no-param-reassign
      installments[i].booking = bookingId;
    }
    return Installment.insertMany(installments, { session });
  }
  // eslint-disable-next-line no-param-reassign
  installments.intern = internId;
  // eslint-disable-next-line no-param-reassign
  installments.host = hostId;
  // eslint-disable-next-line no-param-reassign
  installments.booking = bookingId;

  // used insertMany so we get same response from DB
  return Installment.insertMany([installments], { session });
};

/**
 * Update paid installment by adding transaction Id, This should work inside a transaction session
 * also update payedAmount in the booking collection
 * @param {string} installmentId
 * @param {string} transactionId
 * @param {string} bookingId
 * @param {number} amount amount that used in this transaction
 * @param {session} session
 */
const updatePaidInstallment = async (
  installmentId,
  transactionId,
  bookingId,
  amount,
  session,
) => {
  const installment = Installment.updateOne(
    { _id: installmentId },
    { transaction: transactionId },
    { session },
  );
  const booking = Booking.updateOne(
    { _id: mongoose.Types.ObjectId(bookingId) },
    { $inc: { payedAmount: amount } },
    { session },
  );

  const [updatedInstallment] = await Promise.all([installment, booking]);
  return updatedInstallment;
};

module.exports = { createInstallments, updatePaidInstallment };
