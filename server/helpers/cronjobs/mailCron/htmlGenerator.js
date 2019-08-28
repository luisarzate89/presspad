const { findAllQuestions } = require("../../../database/queries/checkList");

/**
 * gets all the answer and compares what is missing from the questions
 * to determine the styling in the message.
 * @param {Array} answerList list of questions that have been answered by the intern, host or both
 * @return {object} returns a table with answered question having a truthy "fulfilled" key
 */
const categorizeAnsweredQuestions = async (answerList) => {
  const answerTable = {};

  answerList.forEach(answer => {
    answerTable[answer] = {
      text: answer,
      fulfilled: true,
    };
  });
  try {
    const questionList = await findAllQuestions();
    questionList.forEach(question => {
      if (!answerTable[question.text]) answerTable[question.text] = {
        text: question.text,
      };
    });
  } catch (error) {
    console.log(error)
  }
  return answerTable;
};

/**
 * @param {object} answerTable all question texts
 * the answered ones are marked with a truthy "fulfilled" key.
 * @returns {string} returns an html string to be injected into the message.
 */

const htmlGenerator = (answerTable) => {
  const htmlHeader=`<h3 style="color: black; font-size: 20px;">Booking Checklist:</h3>`
  const startingTag = "<ul>";
  const closingTag = "</ul>";
  let list = ""
  
  const answerList = Object.values(answerTable);
  answerList.forEach(answer => {
    if (answer.fulfilled) {
      list+= `<li style="color: green; list-style: none; font-size: 16px; font-weight: 650;"><span>&#10004;</span> ${answer.text}</li>`;
    }
    if (!answer.fulfilled) {
      list += `<li style="color: red; list-style: none; font-size: 16px; font-weight: 650;"><span>&#10005;</span> ${answer.text}</li>`;
    } 
  });
  return `${htmlHeader}${startingTag}${list}${closingTag}`
}

module.exports = { categorizeAnsweredQuestions, htmlGenerator };
