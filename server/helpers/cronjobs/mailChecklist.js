/**
 * find all bookings within required date
 */

 /**
  * start from checklist answers
  * populate with bookings
  * if date is valid:
  * create an object inside the query to return a list of objects from the get go
  * the object.intern, object.host are ids
  * the object.checklist is the checklist
  * send one mail thread that includes the intern and the host with the checklist
  * >>> should the mail be sent inside the query?
  * >>> Transform it into custom promsie and send mail in the.then()???
  * >>> or just iterate over the list, in each we get the id and shit and then we iterate over the list to 
  * create an html list.
  * >>> probably third option.
  */

const { findAnswersByBookingDate } = require("../../database/queries/checkList/index");

const BookingsList = async () => {
  try {
    const answers = await findAnswersByBookingDate();
    const mailingList = [];

    const mailingObject = {};
    answers.forEach(answer => {
      /**
       * must validate that the answer is for a booking that is within the target date. Not done yet
       */

      mailingObject[answer.booking.id] = {};
      mailingObject[answer.booking.id].booking = answer.booking.id;
      mailingObject[answer.booking.id].host = answer.booking.host.email;
      mailingObject[answer.booking.id].intern = answer.booking.intern.email;
      
      if (mailingObject[answer.booking.id].answerList) {
        mailingObject[answer.booking.id].answerList.push(answer.question.text);
      } else {
        mailingObject[answer.booking.id].answerList = [];
        mailingObject[answer.booking.id].answerList.push(answer.question.text);
      }
      console.log(mailingObject)



    });
  } catch (error) {
    console.log(error)
  }
};

module.exports = BookingsList;
