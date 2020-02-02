const mongoose = require('mongoose');

const Booking = require('../../models/Booking');

/**
 * get Booking information by bookingId
 * @param {string} id the Booking Id
 * @returns {promise} (use .exec() to make it fully fledge)
 */
module.exports = bookingId =>
  Booking.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(bookingId) } },
    // lookup host name
    {
      $lookup: {
        from: 'users',
        let: { hostId: '$host' },
        pipeline: [
          { $match: { $expr: { $eq: ['$$hostId', '$_id'] } } },
          { $project: { name: 1 } },
        ],
        as: 'host',
      },
    },
    {
      $unwind: {
        path: '$host',
        preserveNullAndEmptyArrays: true,
      },
    },
    // lookup intern name
    {
      $lookup: {
        from: 'users',
        let: { internId: '$intern' },
        pipeline: [
          { $match: { $expr: { $eq: ['$$internId', '$_id'] } } },
          { $project: { name: 1 } },
        ],
        as: 'intern',
      },
    },
    {
      $unwind: {
        path: '$intern',
        preserveNullAndEmptyArrays: true,
      },
    },
    // lookup installments for this booking
    {
      $lookup: {
        from: 'installments',
        let: { bookingId: '$_id' },
        pipeline: [{ $match: { $expr: { $eq: ['$$bookingId', '$booking'] } } }],
        as: 'installments',
      },
    },
    // lookup coupons been used for this booking
    {
      $lookup: {
        from: 'coupons',
        let: { internId: '$intern' },
        pipeline: [{ $match: { $expr: { $eq: ['$$internId', '$intern'] } } }],
        as: 'coupons',
      },
    },
  ]);
