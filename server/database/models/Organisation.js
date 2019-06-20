const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const organisationSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
  },
  logo: String,
  credits: Number,
  // this will be further developed further
  plan: String,
  budgetHolder: {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
});

const Organisation = model("organisations", organisationSchema);

module.exports = Organisation;
