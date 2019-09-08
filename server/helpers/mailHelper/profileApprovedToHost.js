const { capitalizeName } = require("../general");
const sendMail = require("./index");
const { email, domain } = require("../../config");

/**
 * send email to host when their profile get approved from admin
 * @param {Object} options - required options to send email
 * { email, name },
 */
const profileApprovedToHost = (options) => {
  const hostName = capitalizeName(options.name);


  const html = `
    <p>Hi <span style="font-weight=700;">${hostName}</span>.</p>
    <p><span style="font-weight=700;">Congratulations</span>: your profile has been approved</p>
    <p><a href="${domain}/my-profile}">Fill your avialable dates and fill more details about you, to make your profile look as good as it can.<a></p>
  `;

  const messageDetails = {
    from: email,
    to: options.email,
    subject: "Your profile has been approved",
    html,
  };

  return sendMail(messageDetails);
};
module.exports = profileApprovedToHost;
