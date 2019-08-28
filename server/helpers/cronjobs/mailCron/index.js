const mailCkecklist = require("./mailChecklist");
const mailHelper = require("../../mailHelper");
const createMessage = require("./createMessage");
const { categorizeAnsweredQuestions, htmlGenerator } = require("./htmlGenerator")                                                         

const mailTask = async () => {
  try {
    const bookingsTable = await mailCkecklist(); // includes all bookings due in 1, 2 or 3 weeks.
    Object.values(bookingsTable).forEach(async booking => {
      const categorizedQuestions = await categorizeAnsweredQuestions(booking.answerList);
      const html = htmlGenerator(categorizedQuestions)
      const message = createMessage({ ...booking, html });
      console.log("message", message);
      // send an email to every booking's host and intern.
      mailHelper(message);
    });
  } catch(error) {
    console.log(error)
  }
};

module.exports = mailTask;
