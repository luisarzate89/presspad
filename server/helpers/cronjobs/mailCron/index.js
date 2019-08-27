const mailCkecklist = require("./mailChecklist");
const mailHelper = require("../../mailHelper");
const createMessage = require("./createMessage");

// temporary mock of the booking object. This should be removed once a test is up.
const mockBooking = {
  answerList: [ 'Sign the contract', 'tidy up the listing'],
  dueDate: 1,
  booking: {
    id: '5d62753f6fc81f03fc8c4860',
    startDate: "2019-07-26T11:47:11.303Z",
    endDate: "2019-08-10T11:47:11.303Z"
  },                                                          
  host: { email: 'farah.zaqout@gmail.com', name: 'Farah Appele' },     
  intern: { email: 'farah.zaqout.1@gmail.com', name: 'Adam Zaqout' }    
}                                                             

const mailTask = async () => {
  const bookingsTable = await mailCkecklist();
  const bookingsList = Object.values(bookingsTable);
  
  bookingsList.forEach(booking => {
    const message = createMessage(mockBooking)
    // send an email to every booking's host and intern.
    mailHelper(message);
  });
};

module.exports = mailTask;
