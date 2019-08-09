const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const ScheduledNotificationSchema = new Schema({
  // the user who should get the notification
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  // the user who sent the message/ request to stay/ reject the host etc...
  secondParty: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  // Notification type
  type: {
    type: String,
    enum: [
      "message",
      "stayRequest",
      "stayRejected",
      "stayApproved",
      "stayCompleted",
      "completeProfileRemind",
      "receivedCredits",
      "getReview",
      "giveReview",
    ],
    required: true,
  },
  // organsiasations can see some of the notifications for it's interns
  // if private then organisations cannot see this eg. "completeProfileRemind" type
  private: {
    type: Boolean,
    required: true,
    default: false,
  },
  dueDate: {
    type: Date,
    required: true,
    validate: {
      validator: value => Date.now() < value,
      message: "due date is in the past",
    },
  },
},
{ timestamps: true });

const ScheduledNotification = model("scheduledNotifications", ScheduledNotificationSchema);

module.exports = ScheduledNotification;
