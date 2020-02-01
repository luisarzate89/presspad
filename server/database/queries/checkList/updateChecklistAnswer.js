const ChecklistAnswer = require('../../models/ChecklistAnswer');

const updateChecklistAnswer = ({ id, userId, updateDate }) =>
  ChecklistAnswer.findOneAndUpdate(
    { _id: id, user: userId }, // match
    updateDate, // update
  );

module.exports = updateChecklistAnswer;
