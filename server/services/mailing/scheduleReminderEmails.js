const moment = require('moment');
const mongoose = require('mongoose');

const {
  createScheduledEmails,
} = require('../../database/queries/ScheduledEmail');

/**
 * schedule 3 emails reminders
 * one, two, and three weeks before the start date of stay
 *
 * @param {Object} data
 * @property {String} data.bookingId booking id
 * @property {Date} data.startDate booking start date
 * @property {String} data.hostId host id
 * @property {String} data.internId intern id
 */

const scheduleReminderEmails = async ({
  bookingId,
  startDate,
  hostId,
  internId,
}) => {
  const reminders = [];

  const currnetDate = moment();
  const beforeOneWeekDate = moment(startDate).subtract(1, 'weeks');
  const beforeTwoWeekDate = moment(startDate).subtract(2, 'weeks');
  const beforeThreeWeekDate = moment(startDate).subtract(3, 'weeks');

  const data = {
    bookingId: mongoose.Types.ObjectId(bookingId),
    hostId: mongoose.Types.ObjectId(hostId),
    internId: mongoose.Types.ObjectId(internId),
  };

  if (currnetDate.isSameOrBefore(beforeOneWeekDate)) {
    reminders.push({
      type: 'BOOKING_REMINDER_1_WEEK',
      dueDate: beforeOneWeekDate,
      data,
    });
  }

  if (currnetDate.isSameOrBefore(beforeTwoWeekDate)) {
    reminders.push({
      type: 'BOOKING_REMINDER_2_WEEKS',
      dueDate: beforeTwoWeekDate,
      data,
    });
  }

  if (currnetDate.isSameOrBefore(beforeThreeWeekDate)) {
    reminders.push({
      type: 'BOOKING_REMINDER_3_WEEKS',
      dueDate: beforeThreeWeekDate,
      data,
    });
  }

  if (reminders.length) {
    await createScheduledEmails(reminders);
  } else if (currnetDate.isSameOrBefore(startDate)) {
    // TODO send email immediately
    // await sendEmailNow()
  } else {
    throw new Error('start date is in the past');
  }
};

module.exports = scheduleReminderEmails;
