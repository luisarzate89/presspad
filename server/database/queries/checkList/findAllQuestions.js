const ChecklistQuestion = require('../../models/ChecklistQuestion');

const findAllQuestions = () => ChecklistQuestion.find();

module.exports = findAllQuestions;
