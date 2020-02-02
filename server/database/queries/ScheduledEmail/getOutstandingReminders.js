const ScheduledEmail = require('../../models/ScheduledEmail');

// returns the emails that their due date has been passed
const getOutstandingReminders = () =>
  ScheduledEmail.aggregate([
    {
      $match: {
        dueDate: { $lte: new Date() },
        type: {
          $in: [
            'BOOKING_REMINDER_1_WEEK',
            'BOOKING_REMINDER_2_WEEKS',
            'BOOKING_REMINDER_3_WEEKS',
          ],
        },
        isSent: false,
      },
    },
    {
      $lookup: {
        from: 'bookings',
        localField: 'data.bookingId',
        foreignField: '_id',
        as: 'booking',
      },
    },
    { $unwind: '$booking' },
    {
      $lookup: {
        from: 'users',
        localField: 'data.hostId',
        foreignField: '_id',
        as: 'host',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'data.internId',
        foreignField: '_id',
        as: 'intern',
      },
    },
    { $unwind: '$intern' },
    { $unwind: '$host' },
    {
      $project: {
        'intern.password': 0,
        'host.password': 0,
      },
    },
    {
      $lookup: {
        from: 'checklistanswers',
        let: { hostId: '$host._id', bookingId: '$data.bookingId' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$$hostId', '$user'] },
                  { $eq: ['$$bookingId', '$booking'] },
                ],
              },
            },
          },
          {
            $lookup: {
              from: 'checklistquestions',
              localField: 'question',
              foreignField: '_id',
              as: 'question',
            },
          },
          {
            $unwind: '$question',
          },
          { $addFields: { 'question.isChecked': '$isChecked' } },
          { $replaceRoot: { newRoot: '$question' } },
        ],
        as: 'hostChecklist',
      },
    },
    {
      $lookup: {
        from: 'checklistanswers',
        let: { internId: '$intern._id', bookingId: '$data.bookingId' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$$internId', '$user'] },
                  { $eq: ['$$bookingId', '$booking'] },
                ],
              },
            },
          },
          {
            $lookup: {
              from: 'checklistquestions',
              localField: 'question',
              foreignField: '_id',
              as: 'question',
            },
          },
          {
            $unwind: '$question',
          },
          { $addFields: { 'question.isChecked': '$isChecked' } },
          { $replaceRoot: { newRoot: '$question' } },
        ],
        as: 'internChecklist',
      },
    },
  ]);

module.exports = getOutstandingReminders;
