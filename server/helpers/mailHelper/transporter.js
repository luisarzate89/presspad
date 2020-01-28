const nodeMailer = require("nodemailer");
const { email, pass } = require("./../../config");
/**
 * @param {string} service
 * @return {object} the nodemailer transport object.
 * https://nodemailer.com/transports/sendmail/
 */

const transporter = service => nodeMailer.createTransport({
  service: service || "gmail",
  auth: {
    user: email,
    pass,
  },
});

module.exports = transporter;
