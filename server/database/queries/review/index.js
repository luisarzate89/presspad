const createReview = require("./createReview");
const findReviewByBooking = require("./findReviewByBooking");
const getReviewsGiventToUser = require("./getReviewsGiventToUser");

const reviewQueries = {};
module.exports = reviewQueries;

// exports the createReview query
reviewQueries.createReview = createReview;
reviewQueries.findReviewByBooking = findReviewByBooking;
reviewQueries.getReviewsGiventToUser = getReviewsGiventToUser;
