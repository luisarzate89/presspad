const mailCkecklist = require("./mailChecklist");
const mailHelper = require("../../mailHelper");

const mailTask = async () => {
  const bookingsTable = await mailCkecklist();
  const bookingsList = Object.values(bookingsTable);
  
  bookingsList.forEach(booking => {
    // send an email to every booking's host and intern.
    mailHelper({
      from: "farah.zaqout@gmail.com",
      to: ["farah.zaqout@gmail.com", "farah.zaqout.1@gmail.com"],
      subject: "A n n o y!   V e r y",
      text: `Hello ${booking.host.name}, ${booking.intern.name}!`,
      html: "<h1>Hello, M r . R e e s</h1>"
    });
  });
};

module.exports = mailTask;
