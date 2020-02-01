/**
 * Creates answers array for the intern and the host
 * @param {Array} questions array of question to create answers for them
 * @param {Object} host host info
 * @param {Object} intern intern info
 * @param {String} bookingId booking id
 *
 * @returns {Array} answers Array
 */

const createBookingChecklistQandA = ({
  questions,
  host,
  intern,
  bookingId,
}) => {
  const answers = [];

  questions.forEach(question => {
    const users = [];
    switch (question.for) {
      case 'intern':
        users.push(intern);
        break;
      case 'host':
        users.push(host);
        break;
      case 'both':
        users.push(host, intern);
        break;
      default:
        break;
    }

    users.forEach(user => {
      const answer = {
        user: user._id,
        question: question._id,
        isChecked: false,
        booking: bookingId,
      };
      if (question.containsHostEmail) {
        answer.hostEmail = host.email;
      }
      if (question.containsInternEmail) {
        answer.internEmail = intern.email;
      }

      answers.push(answer);
    });
  });
  return answers;
};

module.exports = createBookingChecklistQandA;
