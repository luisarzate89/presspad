const boom = require("boom");
const { getReviewsGiventToUser } = require("../../database/queries/review");

const {
  isValidMongoObjectId,
} = require("./../../helpers/isValidMongoObjectId");

module.exports = async (req, res, next) => {
  try {
    const { to } = req.query;
    if (to && isValidMongoObjectId(to)) {
      // get the taken reviews fot this user
      const reviews = await getReviewsGiventToUser(to);
      return res.json(reviews);
    }

    //  get given reviews here
    return next(boom.badData(new Error("invalid user id")));
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
