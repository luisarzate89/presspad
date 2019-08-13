const boom = require("boom");
const { createReview } = require("../../database/queries/review");
const { createNotification } = require("../../database/queries/notification");

const reviewControllers = {};
module.exports = reviewControllers;

reviewControllers.createReview = async (req, res, next) => {
  const { to, rating, message } = req.body;
  const { id: from } = req.params;
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
      user: to, // gets the notification
      secondParty: from, // sends the notification
      type: "getReview",
    });
    return res.json({ success: true });
  } catch (error) {
    return next(boom.badImplementation());
  }
};
