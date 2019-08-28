const { findAnswersByBookingDate } = require("../../../database/queries/checkList/index");
const getTargetDate = require("../../dateHelper");

const BookingsList = async () => {
  try {
    const oneWeek = getTargetDate(1);
    const twoWeeks = getTargetDate(2);
    const threeWeeks = getTargetDate(3);

    const answers = await findAnswersByBookingDate(oneWeek, twoWeeks, threeWeeks);
    // const answers = await findAnswersByBookingDate(); // use this for testing until we properly mock the data.
    
    // initial objects to mutate inside the coming loop.
    const mailingObject = {};
    const answerList = []; // this will be inside the mailingObject
    answers.forEach(answer => {
      // specifies times to properly mark each mailing object. Bookings are due in either 1, 2 or 3 weeks. 
      const timeTable = {
        oneWeek: {
          startDate: oneWeek.getTime(),
          endDate: oneWeek.getTime() + 24 * 60 * 59 * 1000
        },
        twoWeeks: {
          startDate: twoWeeks.getTime(),
          endDate: twoWeeks.getTime() + 24 * 60 * 59 * 1000
        },
        threeWeeks: {
          startDate: threeWeeks.getTime(),
          endDate: threeWeeks.getTime() + 24 * 60 * 59 * 1000
        }
      };

      let dueDate; // date to tell which email text to send.

      if (!answer.booking) return;
      /**
       * groups all answers by booking.
       * mailingObject should look like:
       * {
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
       */

      // add a due date (in weeks) to each key of the mailing object.
      if (answer.booking.startDate >= timeTable.oneWeek.startDate 
        && answer.booking.startDate < timeTable.oneWeek.endDate) dueDate = 1 ;
      if (answer.booking.startDate >= timeTable.twoWeeks.startDate 
        && answer.booking.startDate < timeTable.twoWeeks.endDate) dueDate = 2 ;
      if (answer.booking.startDate >= timeTable.threeWeeks.startDate 
        && answer.booking.startDate < timeTable.threeWeeks.endDate) dueDate = 3 ;
      
      // starts populating the mailing object to look like the comment above.
      mailingObject[answer.booking.id] = { answerList, dueDate };

      mailingObject[answer.booking.id].booking = {
        id: answer.booking.id,
        startDate: answer.booking.startDate,
        endDate: answer.booking.endDate,
      };

      mailingObject[answer.booking.id].host = {
        email: answer.booking.host.email,
        name: answer.booking.host.name,
      };

      mailingObject[answer.booking.id].intern = {
        email: answer.booking.intern.email,
        name: answer.booking.host.name,
      };

      mailingObject[answer.booking.id].answerList.push(answer.question.text);
    });
    return mailingObject;
  } catch (error) {
    // remove console.log before final push.
    console.log(error)
    throw(error) // figure this shit out before final push.
  }
};

module.exports = BookingsList;
