const mongoose = require('mongoose');

const Booking = require('../../models/Booking');

/**
 * get Booking information by bookingId
 * @param {string} id the Booking Id
 * @returns {promise} (use .exec() to make it fully fledge)
 */
module.exports = (bookingId, userType) =>
  Booking.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(bookingId) } },
    // Listing Info
    {
      $lookup: {
        from: 'listings',
        let: { listing: '$listing' },
        pipeline: [
          { $match: { $expr: { $eq: ['$$listing', '$_id'] } } },
          // Get host profile info
          {
            $lookup: {
              from: 'profiles',
              let: { host: '$user' },
              pipeline: [
                { $match: { $expr: { $eq: ['$$host', '$user'] } } },
                {
                  $lookup: {
                    from: 'users',
                    let: { host: '$$host' },
                    pipeline: [
                      { $match: { $expr: { $eq: ['$$host', '$_id'] } } },
                      { $project: { name: 1, _id: 0 } },
                    ],

                    as: 'user',
                  },
                },
                {
                  $project: { verification: 0, interests: 0 },
                },
                {
                  $addFields: { name: { $arrayElemAt: ['$user.name', 0] } },
                },
              ],
              as: 'userProfile',
            },
          },
          {
            $unwind: {
              path: '$userProfile',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: { address: 1, photos: 1, userProfile: 1 },
          },
        ],
        as: 'listing',
      },
    },
    {
      $unwind: {
        path: '$listing',
        preserveNullAndEmptyArrays: true,
      },
    },
    // Get checklist questions & answeres
    {
      $lookup: {
        from: 'checklistanswers',
        let: {
          bookingId: '$_id',
          userId: userType === 'intern' ? '$intern' : '$host',
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$$bookingId', '$booking'] },
                  { $eq: ['$$userId', '$user'] },
                ],
              },
            },
          },
          // get the question text
          {
            $lookup: {
              from: 'checklistquestions',
              let: { questionId: '$question' },
              pipeline: [
                { $match: { $expr: { $eq: ['$$questionId', '$_id'] } } },
                {
                  $project: {
                    text: 1,
                    containsHostEmail: 1,
                    containsInternEmail: 1,
                    hintText: 1,
                    links: 1,
                    isOptional: 1,
                  },
                },
              ],
              as: 'question',
            },
          },
          {
            $unwind: {
              path: '$question',
              preserveNullAndEmptyArrays: true,
            },
          },
        ],
        as: 'checkList',
      },
    },
    // Get Installments
    {
      $lookup: {
        from: 'installments',
        let: { bookingId: '$_id' },
        pipeline: [{ $match: { $expr: { $eq: ['$$bookingId', '$booking'] } } }],
        as: 'installments',
      },
    },
    // Get intern coupons
    {
      $lookup: {
        from: 'coupons',
        let: { internId: '$intern', bookingId: '$_id' },
        pipeline: [{ $match: { $expr: { $eq: ['$$internId', '$intern'] } } }],
        as: 'coupons',
      },
    },
  ]);
