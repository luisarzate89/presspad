const Sentry = require('@sentry/node');

const getCompletedBookings = require('../../../database/queries/bookings/getCompletedBookings');
const markBookingsCompleted = require('../../../database/queries/bookings/markBookingsCompleted');
const { registerNotification } = require('../../../services/notifications');

module.exports = async () => {
  try {
    const completedBookings = await getCompletedBookings();
    if (!completedBookings.length) return;
    const completedBookingsIds = completedBookings.map(booking => booking._id);

    const stayCompletedNotificationsPromiseArray = () =>
      completedBookings.map(booking =>
        registerNotification({
          user: booking.intern,
          secondParty: booking.host,
          type: 'stayCompleted',
          private: false,
          booking: booking._id,
        }),
      );

    const hostGiveReviewNotificationsPromiseArr = () =>
      completedBookings.map(booking =>
        registerNotification({
          user: booking.host,
          secondParty: booking.intern,
          type: 'giveReviewReminder',
          private: true,
          booking: booking._id,
        }),
      );

    const internGiveReviewNotificationsPromiseArr = () =>
      completedBookings.map(booking =>
        registerNotification({
          user: booking.intern,
          secondParty: booking.host,
          type: 'giveReviewReminder',
          private: true,
          booking: booking._id,
        }),
      );

    await Promise.all([
      markBookingsCompleted(completedBookingsIds),
      ...stayCompletedNotificationsPromiseArray(),
      ...hostGiveReviewNotificationsPromiseArr(),
      ...internGiveReviewNotificationsPromiseArr(),
    ]);
  } catch (e) {
    Sentry.captureException(e);
  }
};
