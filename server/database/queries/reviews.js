const Review = require("../models/Review");

const reviews = {};
module.exports = reviews;

reviews.createReview = data => Review.create(data);
