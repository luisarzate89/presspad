const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;

const isValidMongoObjectId = id =>
  ObjectId.isValid(id) && ObjectId(id).toString() === id;

module.exports = { isValidMongoObjectId };
