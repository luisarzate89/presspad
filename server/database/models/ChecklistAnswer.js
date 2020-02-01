const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const checklistAnswerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: 'checklistQuestions',
      required: true,
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
    booking: {
      type: Schema.Types.ObjectId,
      ref: 'bookings',
    },
    hostEmail: String,
    internEmail: String,
  },
  {
    timestamps: true,
  },
);

const ChecklistAnswer = model('checklistAnswers', checklistAnswerSchema);

module.exports = ChecklistAnswer;
