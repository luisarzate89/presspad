const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;

const isValidMongoObjectId = (id) => {
  if (ObjectId.isValid(id)) {
    if (ObjectId(id).toString() === id) {
      return true;
    }
    return false;
  }
  return false;
};

module.exports = { isValidMongoObjectId };
