const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const { wordLengthValidator } = require("../utils");
const { types } = require("./../constants");

const listingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    address: {
      addressline1: {
        type: String,
        required: true,
      },
      addressline2: {
        type: String,
        required: false,
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
    accommodationChecklist: [
      { type: String, enum: types.accommodationChecklist },
    ],
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
    hometown: {
      type: String,
      validate: wordLengthValidator(10, "hometown"),
      required: false, // required for Intern
    },
  },

  {
    timestamps: true,
  },
);

const Listing = model("listings", listingSchema);

module.exports = Listing;
