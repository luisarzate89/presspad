const Booking = require('../../models/Booking');
const Review = require('../../models/Review');

module.exports = async () => {
  const bookings = await Booking.find();

  const reviews = [
    {
      to: bookings[0].intern,
      from: bookings[0].host,
      rating: 4,
      message: 'My stay was perfect!',
      booking: bookings[0]._id,
    },
    {
      to: bookings[1].intern,
      from: bookings[1].host,
      rating: 5,
      message:
        'Staying here was an absolute pleasure. I learned a great deal about how to approach politicians and very much enjoyed the city. We managed to go to a few journalistic events as well and met some amazing people!',
      booking: bookings[1]._id,
    },
    {
      to: bookings[2].host,
      from: bookings[2].intern,
      rating: 5,
      message: 'It all went very well! We had a great time together.',
      booking: bookings[2]._id,
    },
  ];
  await Review.create(reviews);
};
