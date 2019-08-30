const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const installmentSchema = new Schema({
  booking: {
    type: Schema.Types.ObjectId,
    ref: "bookings",
  },
  intern: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  host: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01,
  },
  dueDate: {
    type: Date,
    dueDate: {
      type: Date,
      required: true,
      validate: {
        validator: value => Date.now() < value,
        message: "due date is in the past",
      },
    },
  },
  transaction: {
    type: Schema.Types.ObjectId,
    ref: "internalTransactions",
  },
}, {
  timestamps: true,
});

const Installment = model("installments", installmentSchema);

module.exports = Installment;
