const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const { wordLengthValidator } = require("../utils");

const listingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      borough: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        required: true,
      },
      postcode: {
        type: String,
        required: true,
      },
    },
    neighbourhoodDescription: {
      type: String,
      required: false,
      validate: wordLengthValidator(250, "neighbourhoodDescription"),
    },
    otherInfo: {
      type: String,
      required: false,
      validate: wordLengthValidator(250, "otherInfo"),
    },
    accommodationChecklist: [String],
    photos: [
      {
        _id: { type: Schema.ObjectId, auto: true },
        fileName: String,
        isPrivate: {
          type: Boolean,
          default: false,
        },
      },
    ],
    availableDates: [
      {
        _id: { type: Schema.ObjectId, auto: true },
        startDate: Date,
        endDate: Date,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Listing = model("listings", listingSchema);

module.exports = Listing;
