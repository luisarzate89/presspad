const ChecklistQuestion = require('../../models/ChecklistQuestion');

module.exports = async () => {
  const checklistQuestions = [
    {
      text: 'Sign the contract',
      isPublic: true,
      for: 'both',
    },
    {
      text: 'tidy up the listing',
      isPublic: true,
      for: 'host',
    },
    {
      text: 'Pack you bags',
      isPublic: true,
      for: 'intern',
    },
  ];

  await ChecklistQuestion.create(checklistQuestions);
};
