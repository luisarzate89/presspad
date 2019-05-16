const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  message: String,
  timestamps: true
});

const Review = model('reviews', reviewSchema);

module.exports = Review;
