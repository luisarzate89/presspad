const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const listingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  address: {
    line1: String,
    line2: String,
    city: String,
    postcode: String,
  },
  description: String,
  otherInfo: [String],
  price: Number,
  photos: [String],
  availableDates: [{ startDate: Date, endDate: Date }],
});

const Listing = model("listings", listingSchema);

module.exports = Listing;
