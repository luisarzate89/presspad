const boom = require("boom");
const { createReview } = require("../../database/queries/reviews");
const { createNotification } = require("../../database/queries/notifications");

const reviewControllers = {};
module.exports = reviewControllers;

reviewControllers.createReview = async (req, res, next) => {
  const {
    to, from, rating, message,
  } = req.body;

  // VALIDATES USER INPUT
  if (!rating) return next(boom.badRequest("Please pick the number of stars"));
  if (!message) return next(boom.badRequest("Please add a review message"));
  try {
    // create a review
    await createReview({
      to, from, rating, message,
    });

    // send a notification to the reviewee
    await createNotification({
      user: to,
      secondParty: from,
      type: "getReview",
    });

    res.json({ success: true });
  } catch (error) {
    next(boom.badImplementation());
  }
};
