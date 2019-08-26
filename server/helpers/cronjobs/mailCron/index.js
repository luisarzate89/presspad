const mailCkecklist = require("./mailChecklist");
const mailHelper = require("../../mailHelper");

const mailTask = async () => {
  const bookingsTable = await mailCkecklist();
  const bookingsList = Object.values(bookingsTable);
  
  bookingsList.forEach(booking => {
    console.log(booking.host, booking.intern);
    mailHelper({
      from: "farah.zaqout@gmail.com",
      to: ["farah.zaqout@gmail.com", "farah.zaqout.1@gmail.com", "f.zaqout7@gmail.com"],
      subject: "Your booking checklist",
      text: `Hello ${booking.host.name}, ${booking.intern.name}!`,
      html: "<h1>yes</h1>"
    })
  })
};

module.exports = mailTask;
