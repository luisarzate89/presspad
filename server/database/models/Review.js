const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const reviewSchema = new Schema(
  {
    to: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Review = model("reviews", reviewSchema);

module.exports = Review;
