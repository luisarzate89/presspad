const createReview = require("./createReview");
const findReviewByBooking = require("./findReviewByBooking");

const reviewQueries = {};
module.exports = reviewQueries;

// exports the createReview query
reviewQueries.createReview = createReview;
reviewQueries.findReviewByBooking = findReviewByBooking;
