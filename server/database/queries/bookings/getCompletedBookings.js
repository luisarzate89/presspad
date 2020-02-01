const Booking = require('../../models/Booking');

module.exports = () =>
  Booking.find({
    $expr: {
      $and: [
        {
          $lt: ['$endDate', new Date()],
        },
        {
          $eq: ['$status', 'confirmed'],
        },
      ],
    },
  });
