const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const scheduledEmailSchema = new Schema(
  {
    type: {
      type: String,
      enum: [
        // used
        "BOOKING_REMINDER_1_WEEK",
        "BOOKING_REMINDER_2_WEEKS",
        "BOOKING_REMINDER_3_WEEKS",
        // not used
        "INTERN_STAY_APPROVED",
        "ADMIN_REMINDER",
      ],
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
