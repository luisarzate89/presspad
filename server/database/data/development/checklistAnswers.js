const ChecklistQuestion = require('../../models/ChecklistQuestion');
const ChecklistAnswers = require('../../models/ChecklistAnswer');
const Booking = require('../../models/Booking');

module.exports = async () => {
  const bookings = await Booking.find();
  const checklistQuestions = await ChecklistQuestion.find();

  const checklistAnswers = [
    {
      user: bookings[0].intern,
      question: checklistQuestions[0]._id,
      isChecked: true,
      booking: bookings[0]._id,
    },
    {
      user: bookings[0].host,
      question: checklistQuestions[1]._id,
      isChecked: true,
      booking: bookings[0]._id,
    },
    {
      user: bookings[0].intern,
      question: checklistQuestions[2]._id,
      isChecked: true,
      booking: bookings[0]._id,
    },
  ];

  await ChecklistAnswers.create(checklistAnswers);
};
