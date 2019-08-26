const nodeMailer = require("nodemailer");

const transporter = (service) => nodeMailer.createTransport({
  service: service || "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.MAIL_PASSWORD,
  }
});

module.exports = transporter;