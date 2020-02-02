const mongoose = require('mongoose');
const Booking = require('../../models/Booking');

const getInternBookingsWithReviews = internId =>
  Booking.aggregate([
    {
      $match: { intern: mongoose.Types.ObjectId(internId) },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'host',
        foreignField: '_id',
        as: 'host',
      },
    },

    {
      $lookup: {
        from: 'reviews',
        let: { bookingId: '$_id', intern: '$intern' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$booking', '$$bookingId'] },
                  { $eq: ['$to', '$$intern'] },
                ],
              },
            },
          },
        ],
        as: 'receivedReview',
      },
    },
    {
      $lookup: {
        from: 'reviews',
        let: { bookingId: '$_id', intern: '$intern' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$booking', '$$bookingId'] },
                  { $eq: ['$from', '$$intern'] },
                ],
              },
            },
          },
        ],
        as: 'leftReview',
      },
    },
    {
      $addFields: {
        host: { $arrayElemAt: ['$host', 0] },
      },
    },
    {
      $project: {
        'host.password': 0,
      },
    },
    {
      $project: {
        host: 1,
        endDate: 1,
        intern: 1,
        leftReview: { $arrayElemAt: ['$leftReview', 0] },
        receivedReview: { $arrayElemAt: ['$receivedReview', 0] },
        price: 1,
        startDate: 1,
        status: 1,
        updatedAt: 1,
        _id: 1,
      },
    },
  ]);

module.exports = getInternBookingsWithReviews;
