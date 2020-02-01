const Review = require('../../models/Review');

const createReview = data => Review.create(data);

module.exports = createReview;
