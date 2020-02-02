const Review = require('../../models/Review');

const findReviewByBooking = bookingId => Review.find({ booking: bookingId });

module.exports = findReviewByBooking;
