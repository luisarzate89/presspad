const { Types } = require('mongoose');
const Review = require('../../models/Review');

module.exports = userId =>
  Review.aggregate([
    {
      $match: {
        to: Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'from',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
    {
      $lookup: {
        from: 'profiles',
        localField: 'from',
        foreignField: 'user',
        as: 'profile',
      },
    },
    {
      $unwind: '$profile',
    },
    {
      $project: {
        name: '$user.name',
        rate: '$rating',
        jobTitle: '$profile.jobTitle',
        message: '$message',
      },
    },
  ]);
