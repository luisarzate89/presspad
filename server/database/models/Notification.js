const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const notificationSchema = new Schema(
  {
    // the user who should get the notification
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    // the user who sent the message/ request to stay/ reject the host etc...
    secondParty: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    // Notification type
    type: {
      type: String,
      enum: [
        'stayRequest',
        'stayApproved',
        'stayRejected',
        'stayCompleted',
        'giveReviewReminder',
        'getReview',
        'completeProfileRemind',
        // unused
        'message',
        'receivedCredits',
      ],
      required: true,
    },
    // flag to store if the user saw this or not
    seen: {
      type: Boolean,
      required: true,
      default: false,
    },
    // organisations can see some of the notifications for it's interns
    // if private then organisations cannot see this eg. "completeProfileRemind" type
    private: {
      type: Boolean,
      required: true,
      default: false,
    },
    // flag to store if the organisation saw this or not
    seenForOrg: {
      type: Boolean,
      required: true,
      default: false,
    },
    booking: {
      type: Schema.Types.ObjectId,
      ref: 'bookings',
    },
  },
  { timestamps: true },
);

const Notification = model('notifications', notificationSchema);

module.exports = Notification;
