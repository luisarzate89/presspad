const { findAllQuestions } = require('../../../database/queries/checkList');
const { errorLogger, errorLogDir } = require('../../errorLogger');
/**
 * gets all the answer and compares what is missing from the questions
 * to determine the styling in the message.
 * @param {Array} answerList list of questions that have been answered by the intern, host or both
 * @return {object} returns a table with answered question having a truthy "fulfilled" key
 */
const categorizeAnsweredQuestions = async answerList => {
  const categorizedQuestions = {};
  answerList.forEach(answer => {
    // add the answer to the table with a truthy fulfilled key.
    categorizedQuestions[answer.text] = {
      text: answer.text,
      for: answer.for,
      fulfilled: true,
    };
  });

  try {
    const questionList = await findAllQuestions();
    questionList.forEach(question => {
      // add the answer to the table with a falsy fulfilled key.
      if (!categorizedQuestions[question.text]) {
        categorizedQuestions[question.text] = {
          text: question.text,
          for: question.for,
        };
      }
    });
  } catch (error) {
    return errorLogger(error, errorLogDir, __dirname);
  }
  return categorizedQuestions;
};

/**
 * @param {object} categorizedQuestions all question texts
 * the answered ones are marked with a truthy "fulfilled" key.
 * @returns {string} returns an html string to be injected into the message.
 */

const htmlGenerator = ({ categorizedQuestions, names }) => {
  const internHeader = `<h3 style="color: black; font-size: 20px;">${names.intern} Checklist:</h3>`;
  const hostHeader = `<h3 style="color: black; font-size: 20px;">${names.host} Checklist:</h3>`;
  const openingTag = '<ul>';
  const closingTag = '</ul>';
  let internList = '';
  let hostList = '';

  const answerList = Object.values(categorizedQuestions);
  answerList.forEach(answer => {
    // intern html injection
    if (answer.for === 'intern') {
      if (answer.fulfilled) {
        internList += `<li style="color: green; list-style: none; font-size: 16px; font-weight: 650;"><span>&#10004;</span> ${answer.text}</li>`;
      } else {
        internList += `<li style="color: red; list-style: none; font-size: 16px; font-weight: 650;"><span>&#10005;</span> ${answer.text}</li>`;
      }
      // host html injection
    }
    if (answer.for === 'host') {
      if (answer.fulfilled) {
        hostList += `<li style="color: green; list-style: none; font-size: 16px; font-weight: 650;"><span>&#10004;</span> ${answer.text}</li>`;
      } else {
        hostList += `<li style="color: red; list-style: none; font-size: 16px; font-weight: 650;"><span>&#10005;</span> ${answer.text}</li>`;
      }
    }
    if (answer.for === 'both') {
      if (answer.fulfilled) {
        hostList += `<li style="color: green; list-style: none; font-size: 16px; font-weight: 650;"><span>&#10004;</span> ${answer.text}</li>`;
        internList += `<li style="color: green; list-style: none; font-size: 16px; font-weight: 650;"><span>&#10004;</span> ${answer.text}</li>`;
      } else {
        hostList += `<li style="color: red; list-style: none; font-size: 16px; font-weight: 650;"><span>&#10005;</span> ${answer.text}</li>`;
        internList += `<li style="color: red; list-style: none; font-size: 16px; font-weight: 650;"><span>&#10005;</span> ${answer.text}</li>`;
      }
    }
  });
  const htmlString = `${internHeader}${openingTag}${internList}${closingTag}${hostHeader}${openingTag}${hostList}${closingTag}`;
  return htmlString;
};

module.exports = { categorizeAnsweredQuestions, htmlGenerator };
