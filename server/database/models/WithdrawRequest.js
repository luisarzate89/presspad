const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const withdrawRequestSchema = new Schema({
  // the user who made the request
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  // the account that money will be withdrawed from
  account: {
    type: Schema.Types.ObjectId,
    ref: "accounts",
    required: true,
  },
  // money value
  amount: {
    type: Number,
    required: true,
    min: 0.01,
  },
  bankName: {
    type: String,
    trim: true,
    required: true,
  },
  bankSortCode: {
    type: String,
    trim: true,
    required: true,
  },
  bankNumber: {
    type: String,
    trim: true,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "transfered", "rejected", "canceled"],
  },
  // the date when the money has transfered
  transfereDate: {
    type: Date,
  },
}, {
  timestamps: true,
});

const WithdrawRequest = model("withdrawRequests", withdrawRequestSchema);

module.exports = WithdrawRequest;
