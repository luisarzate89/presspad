const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const listingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  address: {
    line1: {
      type: String,
      required: true,
    },
    line2: String,
    city: {
      type: String,
      required: true,
    },
    postcode: {
      type: String,
      required: true,
    },
  },
  description: {
    type: String,
    required: true,
  },
  otherInfo: [String],
  price: {
    type: Number,
    required: true,
  },
  photos: [String],
  availableDates: [{ startDate: Date, endDate: Date }],
});

const Listing = model("listings", listingSchema);

module.exports = Listing;
