const boom = require("boom");
const { getReviewsGiventToUser } = require("../../database/queries/review");
// const {
//   countCompletedBookingsByUser,
// } = require("./../../database/queries/bookings");

const {
  isValidMongoObjectId,
} = require("./../../helpers/isValidMongoObjectId");

module.exports = async (req, res, next) => {
  try {
    const { to } = req.query;
    if (to && isValidMongoObjectId(to)) {
      // get the taken reviews fot this user

      // const [reviews, completedBookingsCount] = await Promise.all([
      //   getReviewsGiventToUser(to),
      //   countCompletedBookingsByUser(to),
      // ]);

      const [reviews] = await Promise.all([getReviewsGiventToUser(to)]);

      return res.json({ reviews });
    }
    //  get given reviews goes here

    return next(boom.badData(new Error("invalid user id")));
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
