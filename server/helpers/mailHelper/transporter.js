const nodeMailer = require("nodemailer");

/**
 * @param {string} service 
 * @return {object} the nodemailer transport object.
 * https://nodemailer.com/transports/sendmail/
 */
const transporter = (service) => nodeMailer.createTransport({
  service: service || "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.MAIL_PASSWORD,
  }
});

module.exports = transporter;