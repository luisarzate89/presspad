const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const organisationSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true
  }
});

const Organisation = model('organisations', organisationSchema);

module.exports = Organisation;
