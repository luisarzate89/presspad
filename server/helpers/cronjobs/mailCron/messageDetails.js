/**
 * 
 * @param {object} options includes details of the message e.g. content, sender, etc.
 * @return {object}
 */
const messageCreator = (options) => {

  const messageDetails = {
    from: options.from,
    to: options.to,
    subject: options.subject, // should have standard subject based on due date
    text: options.text // should have standard text based on due date
  };
  messageDetails.from = options.from
};
