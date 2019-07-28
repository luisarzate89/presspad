const Review = require("../models/Review");

const reviews = {};
module.exports = reviews;

reviews.create = data => Review.create(data);
