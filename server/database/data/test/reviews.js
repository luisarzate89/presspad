const Review = require('../../models/Review');

const reset = () => Review.deleteMany();

const createAll = async ({ bookings }) => {
  const { completedBooking } = bookings;

  await reset();
  const reviews = [
    {
      to: completedBooking.intern,
      from: completedBooking.host,
      rating: 4,
      message: 'He was very clever intern, I wish him good luck',
      booking: completedBooking._id,
    },
    {
      to: completedBooking.host,
      from: completedBooking.intern,
      rating: 5,
      message:
        'Staying here was an absolute pleasure. I learned a great deal about how to approach politicians and very much enjoyed the city. We managed to go to a few journalistic events as well and met some amazing people!',
      booking: completedBooking._id,
    },
  ];
  const [fromHostReview, fromInternReview] = await Review.create(reviews);
  return { fromHostReview, fromInternReview };
};

module.exports = {
  createAll,
  reset,
};
