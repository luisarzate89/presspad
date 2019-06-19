const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const notificationSchema = new Schema({
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
    enum: ["message", "stayRequest", "stayRejected", "stayApproved", "stayCompleted", "completeProfileRemind", "receivedCredits"],
    required: true,
  },
  // flag to store if the user saw this or not
  new: {
    type: Boolean,
    required: true,
    default: true,
  },
  // organsiasations can see some of the notifications for it's interns
  // if private then organisations cannot see this eg. "completeProfileRemind" type
  private: {
    type: Boolean,
    required: true,
    default: true,
  },
  // flag to store if the organisation saw this or not
  newForOrg: {
    type: Boolean,
    required: true,
    default: true,
  },
}, { timestamps: true });

const Notification = model("notifications", notificationSchema);

module.exports = Notification;
