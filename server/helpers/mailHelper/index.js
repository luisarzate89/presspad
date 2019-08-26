const transporter = require("./transporter");

const gmailTransporter = transporter("gmail");

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

const sendMail = (options) => new Promise((resolve, reject) => {
  gmailTransporter.sendMail(options, (err, res) => {
    if (err) return reject(err);
    return resolve(res);
  });
});

module.exports = sendMail;