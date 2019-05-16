const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const transactionSchema = new Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  credits: {
    type: Number,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  // host can either donate or accept => update recipient field accordingly
  activities: {
    type: String,
    enum: ["donated", "accepted"],
  },
});

const Transaction = model("transactions", transactionSchema);

module.exports = Transaction;
