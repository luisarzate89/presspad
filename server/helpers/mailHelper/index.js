const boom = require("boom");
const transporter = require("./transporter");

const mailTransporter = transporter(process.env.MAIL_TRANSPORTER);

/**
 * wraps the nodemailer api into a promise.
 * @param {object} options // object containing the mail content
 * @return {promise}
 *
 * options should look as follows:
 * {
 *  from, to, subject, text, html
 * }
 */

const sendMail = options => new Promise((resolve, reject) => {
  if (!mailTransporter) {
    throw boom.badData("mailHelper error: mailTransporter is not defined. Add the proper env variable");
  }

  if (process.env.NODE_ENV === "production") {
    return resolve();
  }

  mailTransporter.sendMail(options, (err, res) => {
    if (err) return reject(err);
    return resolve(res);
  });
});

module.exports = sendMail;
