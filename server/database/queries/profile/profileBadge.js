const User = require('../../models/User');
const Profile = require('../../models/Profile');

/**
 * Get All hosts that deserve a badge
 * If they finished their first hosting successfully
 */
exports.getHostsDeserveBadge = () =>
  User.aggregate([
    // match hosts
    {
      $match: {
        $or: [{ role: 'superhost' }, { role: 'host' }],
      },
    },
    // lookup profile
    {
      $lookup: {
        from: 'profiles',
        let: { user_id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$user', '$$user_id'] },
                  { $eq: ['$badge', false] },
                ],
              },
            },
          },
          // check bookings
          {
            $lookup: {
              from: 'bookings',
              let: { host_id: '$$user_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ['$host', '$$host_id'] },
                        {
                          $eq: [{ $ceil: '$price' }, { $ceil: '$payedAmount' }],
                        },
                        { $gte: [new Date(), '$endDate'] },
                      ],
                    },
                  },
                },
              ],
              as: 'booking',
            },
          },
          {
            $match: {
              $expr: { $gte: [{ $size: '$booking' }, 1] },
            },
          },
        ],
        as: 'profile',
      },
    },
    { $unwind: '$profile' },
  ]);

exports.giveBadge = profileIds =>
  Profile.updateMany({ _id: { $in: profileIds } }, { badge: true });
