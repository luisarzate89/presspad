const ChecklistAnswer = require('../../models/ChecklistAnswer');

const reset = () => ChecklistAnswer.deleteMany();

const createAll = async ({ users, checklistQuestions, bookings }) => {
  await reset();

  const { internUser, hostUser } = users;
  const { completedBooking } = bookings;

  const checklistAnswers = [
    {
      user: internUser._id,
      question: checklistQuestions[0]._id,
      isChecked: true,
      booking: completedBooking._id,
    },
    {
      user: hostUser._id,
      question: checklistQuestions[1]._id,
      isChecked: true,
      booking: completedBooking._id,
    },
    {
      user: internUser._id,
      question: checklistQuestions[2]._id,
      isChecked: true,
      booking: completedBooking._id,
    },
  ];

  const [firstAnswer, secondAnswer, thirdAnswer] = await ChecklistAnswer.create(
    checklistAnswers,
  );

  return { firstAnswer, secondAnswer, thirdAnswer };
};

module.exports = {
  createAll,
  reset,
};
