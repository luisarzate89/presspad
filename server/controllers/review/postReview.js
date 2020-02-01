const boom = require('boom');
const {
  createReview,
  findReviewByBooking,
} = require('../../database/queries/review');
const { registerNotification } = require('../../services/notifications');

module.exports = async (req, res, next) => {
  const { to, rating, message, from } = req.body;

  const { id: booking } = req.params;
  // VALIDATES USER INPUT
  if (!rating) return next(boom.badRequest('Please pick the number of stars'));
  if (!message) return next(boom.badRequest('Please add a review message'));
  try {
    // validates that no review for current booking was created
    const existingReview = await findReviewByBooking(booking);
    if (existingReview.length) {
      return next(
        boom.badRequest('You have already submitted a review for this booking'),
      );
    }

    // create a review
    await createReview({
      to,
      from,
      rating,
      message,
      booking,
    });

    // send a notification to the reviewee
    await registerNotification({
      user: to, // gets the notification
      secondParty: from, // sends the notification
      type: 'getReview',
      booking,
    });

    return res.json({ success: true });
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
