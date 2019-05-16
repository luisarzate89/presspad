const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const referalCodeSchema = new Schema({
  referalUser: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

const ReferalCode = model('referalCodes', referalCodeSchema);

module.exports = ReferalCode;
