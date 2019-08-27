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
      console.log(oneWeek.getTime());
      if (!answer.booking) return;
      /**
       * groups all answers by booking.
       * mailingObject should look like:
       *  {
       *    "booking.id": {
       *      booking: {
       *        id: "booking.id",
       *        startDate: "booking.startDate",
       *        endDate: "booking.endDate"  
        *     },
       *      host: "host email",  this one will need the name as well!
       *      intern: "intern email",
       *      answerList: [array of answer texts]
       *    }
       *  }
       */                                        

      mailingObject[answer.booking.id] = { answerList }; // mailingObject: { "booking.id": { answerList: [] } }
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
