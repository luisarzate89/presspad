const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const listingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    borough: String,
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
  photos: [String],
  availableDates: [{ _id: false, startDate: Date, endDate: Date }],
});

const Listing = model("listings", listingSchema);

module.exports = Listing;
