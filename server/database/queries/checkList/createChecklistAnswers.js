const ChecklistAnswer = require('../../models/ChecklistAnswer');

const createChecklistAnswers = answers => ChecklistAnswer.create(answers);

module.exports = createChecklistAnswers;
