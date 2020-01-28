const moment = require("moment");
const CheckListAnswer = require("../../models/ChecklistAnswer");

/**
 * finds the answers > populates them with the question (to get the text) and booking
 * > then populates the booking with both intern and host (to get their emails)
 * @param {Date} oneWeek the date against which to fetch the checklist and then mail it.
 * @param {Date} twoWeeks the date against which to fetch the checklist and then mail it.
 * @param {Date} threeWeeks the date against which to fetch the checklist and then mail it.
 * @return {Array} returns the result of a mongoose find query.
 */

const findAnswersByBookingDate = async (oneWeek, twoWeeks, threeWeeks) => {
  const endOfOneWeek = moment(oneWeek).endOf("day").toISOString();
  const endOfTwoWeeks = moment(twoWeeks).endOf("day").toISOString();
  const endOfThreeWeeks = moment(threeWeeks).endOf("day").toISOString();

  /**
   * allows for the prams to be optional.
   * This should never be the case except for testing out changes.
   */

  if (!oneWeek && !twoWeeks && !threeWeeks) {
    const answerList = await CheckListAnswer.find()
      .populate({ path: "question", model: "checklistQuestions" })
      .populate({
        path: "booking",
        populate: [{ path: "intern" }, { path: "host" }], // deep populate on two keys.
      })
      .exec();
    return answerList;
  }

  const answerList = await CheckListAnswer.find()
    .populate({ path: "question", model: "checklistQuestions" })
    .populate({
      path: "booking",
      match: {
        $or: [
          { startDate: { $gte: oneWeek, $lte: endOfOneWeek } },
          { startDate: { $gte: twoWeeks, $lte: endOfTwoWeeks } },
          { startDate: { $gte: threeWeeks, $lte: endOfThreeWeeks } },
        ],
      },
      populate: [{ path: "intern" }, { path: "host" }], // deep populate on two keys.
    })
    .exec();
  return answerList;
};

module.exports = findAnswersByBookingDate;
