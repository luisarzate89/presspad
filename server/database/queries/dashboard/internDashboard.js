const mongoose = require('mongoose');

const User = require('./../../models/User');

/**
 * get intern dashboard information
 * [ intern bookings, notifications and installments ]
 * @param {string} id the Intern Id
 * @returns {promise} not fully fledge
 */
const internDashboard = id =>
  User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    // Intern profile
    {
      $lookup: {
        from: 'profiles',
        let: { intern: '$_id' },
        pipeline: [{ $match: { $expr: { $eq: ['$$intern', '$user'] } } }],
        as: 'profile',
      },
    },
    {
      $unwind: { path: '$profile', preserveNullAndEmptyArrays: true },
    },
    // Intern notification
    {
      $lookup: {
        from: 'notifications',
        let: { intern: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$$intern', '$user'] } } },
          // SecondParty name
          {
            $lookup: {
              from: 'users',
              let: { secondParty: '$secondParty' },
              pipeline: [
                { $match: { $expr: { $eq: ['$$secondParty', '$_id'] } } },
                {
                  $project: { name: 1 },
                },
              ],
              as: 'secondParty',
            },
          },
          {
            $unwind: { path: '$secondParty', preserveNullAndEmptyArrays: true },
          },
        ],
        as: 'notifications',
      },
    },
    // Intern installments
    {
      $lookup: {
        from: 'installments',
        let: { intern: '$_id' },
        pipeline: [{ $match: { $expr: { $eq: ['$$intern', '$intern'] } } }],
        as: 'installments',
      },
    },
    // Intern bookings
    {
      $lookup: {
        from: 'bookings',
        let: { intern: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$$intern', '$intern'] },
                  { $ne: ['$status', 'canceled'] },
                ],
              },
            },
          },
          // host name
          {
            $lookup: {
              from: 'users',
              let: { host: '$host' },
              pipeline: [
                { $match: { $expr: { $eq: ['$$host', '$_id'] } } },
                // host profile
                {
                  $lookup: {
                    from: 'profiles',
                    let: { host: '$_id' },
                    pipeline: [
                      { $match: { $expr: { $eq: ['$$host', '$user'] } } },
                    ],
                    as: 'profile',
                  },
                },
                {
                  $unwind: {
                    path: '$profile',
                    preserveNullAndEmptyArrays: true,
                  },
                },

                {
                  $project: {
                    name: 1,
                    'profile.bio': 1,
                    'profile.jobTitle': 1,
                    'profile.organisation': 1,
                    'profile.profileImage': 1,
                  },
                },
              ],
              as: 'host',
            },
          },
          {
            $unwind: { path: '$host', preserveNullAndEmptyArrays: true },
          },
        ],
        as: 'bookings',
      },
    },
    {
      $project: {
        name: 1,
        'profile.profileImage': 1,
        notifications: 1,
        'installments._id': 1,
        'installments.booking': 1,
        'installments.amount': 1,
        'installments.dueDate': 1,
        'installments.transaction': 1,
        bookings: 1,
      },
    },
  ]);

module.exports = internDashboard;
