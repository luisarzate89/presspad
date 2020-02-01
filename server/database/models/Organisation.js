const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const organisationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    account: {
      type: mongoose.Types.ObjectId,
      ref: 'accounts',
      required: true,
    },
    logo: {
      fileName: String,
      isPrivate: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Organisation = model('organisations', organisationSchema);

module.exports = Organisation;
