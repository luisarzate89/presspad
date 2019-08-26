const transporter = require("./transporter");

const gmailTransporter = transporter("gmail");

/**
 * 
 */

const sendMail = (options) => new Promise((resolve, reject) => {
  transporter.sendMail(options, (err, res) => {
    if (err) return reject(err);
    return resolve(res);
  });
});

module.exports = sendMail;