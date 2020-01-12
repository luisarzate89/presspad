const { links: configLinks } = require("../config");

/**
 * Injects the links from the env variables into the question object
 * updates the referanced question object
 *
 * @param {Object} questions  question to embed the links into the questions
 *
 * @returns undefined
 */

const addLinksIntoQuestion = (question) => {
  if (question && question.links && question.links.length) {
    const { links } = question;
    links.forEach((link, i) => {
      // fb | whatsapp | calendly
      const { linkType } = link;
      const url = configLinks[linkType];
      // update the referance object (questions)
      links[i].url = url;
    });
  }
};

module.exports = addLinksIntoQuestion;
