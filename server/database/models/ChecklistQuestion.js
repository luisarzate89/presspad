const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const checklistQuestionSchema = new Schema({
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
    enum: ["host", "intern", "both"],
  },
}, {
  timestamps: true,
});

const ChecklistQuestion = model("checklistQuestions", checklistQuestionSchema);

module.exports = ChecklistQuestion;
