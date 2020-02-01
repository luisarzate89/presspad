const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const checklistQuestionSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    for: {
      type: String,
      enum: ['host', 'intern', 'both'],
    },
    // hint section with it's options
    hintText: String,
    containsHostEmail: {
      type: Boolean,
      default: false,
    },
    containsInternEmail: {
      type: Boolean,
      default: false,
    },
    links: [
      {
        label: String,
        linkType: String, // to get the link value from .env
      },
    ],
    isOptional: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const ChecklistQuestion = model('checklistQuestions', checklistQuestionSchema);

module.exports = ChecklistQuestion;
