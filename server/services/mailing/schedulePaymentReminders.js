const moment = require("moment");
const mongoose = require("mongoose");
const { createScheduledEmails } = require("../../database/queries/ScheduledEmail");


const schedulePaymentReminders = ({
  startDate, endDate, bookingId, internId, session,
}) => new Promise(
  async (resolve, reject) => {
    try {
      const reminders = [];

      const currnetDate = moment();
      const stayIntervalInMS = (moment(endDate).valueOf() - moment(startDate).valueOf()) / 2;
      const stayMidWayDate = moment((stayIntervalInMS) + moment(startDate).valueOf());
      const before2WeeksOfStayMidWayDate = stayMidWayDate.subtract(2, "weeks");
      const before2WeeksOfStayEndDate = moment(endDate).subtract(2, "weeks");

      // checks
      if (moment(startDate).isSameOrAfter(moment(endDate))) {
        return reject(new Error("start date must be before end date"));
      }

      const data = {
        bookingId: mongoose.Types.ObjectId(bookingId),
        internId: mongoose.Types.ObjectId(internId),
      };

      reminders.push({
        type: "SECOND_PAYMENT_REMINDER",
        dueDate: moment.max(before2WeeksOfStayMidWayDate, currnetDate.endOf("day")),
        data,
      }, {
        type: "THIRD_PAYMENT_REMINDER",
        dueDate: moment.max(before2WeeksOfStayEndDate, currnetDate.endOf("day")),
        data,
      });
      await createScheduledEmails(reminders, session);
      return resolve();
    } catch (error) {
      return reject(error);
    }
  },
);

module.exports = schedulePaymentReminders;
