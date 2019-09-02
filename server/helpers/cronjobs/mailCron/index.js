const mailCkecklist = require("./mailChecklist");
const mailHelper = require("../../mailHelper");
const createMessage = require("./createMessage");
const { categorizeAnsweredQuestions, htmlGenerator } = require("./htmlGenerator");
const { errorLogger, errorLogDir } = require("../../errorLogger");

const mailTask = async () => {
  try {
    // object that includes all bookings due in 1, 2 or 3 weeks.
    const bookingsTable = await mailCkecklist();
    Object.values(bookingsTable).forEach(async (booking) => {
      if (!booking.dueDate) return; // validates the date of booking.
      // marks fulfilled questions with truthy fulfilled key.
      const categorizedQuestions = await categorizeAnsweredQuestions(booking.answerList);
      const html = htmlGenerator({
        categorizedQuestions,
        names: { intern: booking.intern.name, host: booking.host.name },
      });
      const message = createMessage({ ...booking, html });
      // sends an email to every booking's host and intern.
      await mailHelper(message);
    });
  } catch (error) {
    errorLogger(error, errorLogDir, __dirname);
  }
};

module.exports = mailTask;
