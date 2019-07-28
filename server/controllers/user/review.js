const boom = require("boom");
const { createReview } = require("../../database/queries/reviews");

const reviewControllers
module.exports = {}

reviewControllers.gerReview = (req, res, next) => {
  const { to, from, rating, message } = req.body
  try {
    await createReview({ to, from, rating, message })
  } catch(error) {
    next(error)
  }
}