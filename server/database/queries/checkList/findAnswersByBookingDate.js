const CheckListAnswer = require("../../models/ChecklistAnswer");

// temporary import. should be removed.
const checklistQuestions = require("../../data/test/checklistQuestions");
const { promisify } = require("util");

/**
 * finds the answers > populates them with the question (to get the text) and booking
 * > then populates the booking with both intern and host (to get their emails)
 * @param {Date} date the date against which to fetch the checklist and then mail it. 
 */
const findAnswersByBookingDate = async (date) => {
  const answerList = await CheckListAnswer.find()
    .populate({ path: "question", model: "checklistQuestions" })
    .populate({ path: "booking",
      populate: [{ path: "intern" }, { path: "host" }]
    })
    .exec();
  return answerList;
};

module.exports = findAnswersByBookingDate;
