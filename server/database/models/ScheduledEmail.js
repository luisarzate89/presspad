const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const scheduledEmailSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["INTERN_REMINDER_7_DAYS", "INTERN_STAY_APPROVED", "ADMIN_REMINDER"], // to be added
    },
    data: {
      type: Object,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
      validate: {
        validator: value => Date.now() < value,
        message: "due date is in the past",
      },
    },
    isSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const ScheduledEmail = model("scheduledEmails", scheduledEmailSchema);

module.exports = ScheduledEmail;
