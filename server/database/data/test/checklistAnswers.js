const ChecklistQuestion = require("../../models/ChecklistQuestion");
const ChecklistAnswers = require("../../models/ChecklistAnswer");
const Booking = require("../../models/Booking");

module.exports = async () => {
  const bookings = await Booking.findOne({ status: "confirmed" }).sort({ price: 1 });
  const checklistQuestions = await ChecklistQuestion.find().sort({ text: 1 });

  const checklistAnswers = [
    {
      user: bookings.intern,
      question: checklistQuestions[0]._id,
      isChecked: true,
      booking: bookings._id,
    }, {
      user: bookings.host,
      question: checklistQuestions[1]._id,
      isChecked: true,
      booking: bookings._id,
    }, {
      user: bookings.intern,
      question: checklistQuestions[2]._id,
      isChecked: true,
      booking: bookings._id,
    },
  ];

  await ChecklistAnswers.create(checklistAnswers);
};
