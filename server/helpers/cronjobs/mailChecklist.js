/**
 * TODO: find all bookings within required date
 */

 /**
  * start from checklist answers
  * populate with bookings
  * if date is valid:
  * create an object inside the query to return a list of objects from the get go
  * the object.intern, object.host are ids
  * the object.checklist is the checklist
  * send one mail thread that includes the intern and the host with the checklist
  * >>> just iterate over the list, in each we get the id and shit and then we iterate over the list to 
  * create an html list.
  */

const { findAnswersByBookingDate } = require("../../database/queries/checkList/index");

const BookingsList = async () => {
  try {
    const answers = await findAnswersByBookingDate();

    // initial objects to mutate inside the coming loop.
    const answerList = [];
    const mailingObject = {};
    answers.forEach(answer => {
      /**
       * must validate that the answer is for a booking that is within the target date. Not done yet
       */
      
      /**
       * groups all answers by booking.
       * mailingObject should look like:
       *  {
       *    "booking.id": {
       *      booking: {
       *        id: "booking.id",
       *        startDate: "booking.startDate",
       *        endDate: "booking.endDate"  
    *         },
       *      host: "host email",  this one will need the name as well!
       *      intern: "intern email",
       *      answerList: [array of answer texts]
       *    }
       *  }
       */
      mailingObject[answer.booking.id] = { answerList };
      mailingObject[answer.booking.id].booking = {
        id: answer.booking.id,
        startDate: answer.booking.startDate,
        endDate: answer.booking.endDate,
      };
      mailingObject[answer.booking.id].host = answer.booking.host.email;
      mailingObject[answer.booking.id].intern = answer.booking.intern.email;
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
