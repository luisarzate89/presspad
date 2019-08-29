const mailCkecklist = require("./mailChecklist");
const mailHelper = require("../../mailHelper");
const createMessage = require("./createMessage");
const { categorizeAnsweredQuestions, htmlGenerator } = require("./htmlGenerator")                                                         

const mailTask = async () => {
  try {
    const bookingsTable = await mailCkecklist(); // object that includes all bookings due in 1, 2 or 3 weeks.
    Object.values(bookingsTable).forEach(async booking => {
      if (!booking.dueDate) return; // validates the date of booking.
      // marks fulfilled questions with truthy fulfilled key.
      const categorizedQuestions = await categorizeAnsweredQuestions(booking.answerList);
      const html = htmlGenerator({ 
        categorizedQuestions,
        names: { intern: booking.intern.name, host: booking.host.name }
      });
      const message = createMessage({ ...booking, html });
      console.log(message)
      // sends an email to every booking's host and intern.
      mailHelper(message);
    });
  } catch(error) {
    console.log(error)
  }
};

module.exports = mailTask;
